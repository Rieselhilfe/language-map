import React, { FC, useState, useEffect } from 'react'
import { Source, Layer } from 'react-map-gl'
import { FillPaint } from 'mapbox-gl'
import * as stats from 'simple-statistics'
import { useQuery } from 'react-query'

import { useMapToolsState } from 'components/context'
import { CensusQueryID } from 'components/spatial/types'
import { tableEndpoints } from '../spatial/config'

import * as utils from './utils'
import * as Types from './types'

export const CensusLayer: FC<Types.CensusLayerProps> = (props) => {
  const { sourceLayer, config, map, beforeId } = props
  const { layers, source } = config
  const censusUnit = config.source.id as CensusQueryID
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const field = useMapToolsState().censusActiveFields[censusUnit]
  const visible = field !== undefined && field !== ''
  const { data, error, isFetching } = useQuery(
    `${censusUnit}-table`,
    () => utils.asyncAwaitFetch(tableEndpoints[censusUnit]),
    {
      enabled: true,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  ) as Types.SheetsRawResponse
  const [fillPaint, setFillPaint] = useState<FillPaint>({
    'fill-color': 'transparent', // mitigates the brief lag before load
  })
  const [highLow, setHighLow] = useState<{ high: number; low?: number }>()
  const [tableRows, setTableRows] = useState<Types.PreppedCensusTableRow[]>()

  useEffect(() => {
    if (isFetching || !data) return

    const headings = data.values[0]

    // TODO: deal w/google's built-in `data.error` (adjust TS first)
    const tableRowsPrepped = data.values.slice(1).map((row, i) => {
      const rowAsJS = {} as Types.PreppedCensusTableRow

      headings.forEach((heading, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore // TODO: don't let TS win
        rowAsJS[heading] =
          heading === 'GEOID' ? row[index] : parseInt(row[index], 10)
      })

      return rowAsJS
    })

    setTableRows(tableRowsPrepped)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching])

  useEffect(() => {
    if (!map || !tableRows || !field) return

    const valuesCurrField = tableRows.map((row) => row[field])
    const means = stats.ckmeans(valuesCurrField, 5)
    const firstItemLastClass = means[4][0]
    const max = stats.max(valuesCurrField)

    // TODO: rm if not using min
    // low: (firstItemLastClass / stats.min(valuesCurrField)) * 100,
    setHighLow({ high: (firstItemLastClass / max) * 100 })

    tableRows.forEach((row) => {
      const featConfig = { source: censusUnit, sourceLayer, id: row.GEOID }
      const total = row[field]

      map.setFeatureState(featConfig, {
        total: (total / max) * 100,
      } as { total: number })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])

  useEffect(() => {
    if (!highLow) return

    setFillPaint(utils.setInterpolatedFill(highLow.high, highLow.low))
  }, [highLow])

  if (error || isFetching) return null // TODO: sentry

  const promoteIDfield = 'GEOID' // tell MB not to use default `id` as unique ID

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Source {...source} type="vector" promoteId={promoteIDfield}>
      {layers.map((layer) => (
        <Layer
          key={layer.id}
          beforeId={beforeId}
          {...layer}
          paint={layer.type === 'line' ? layer.paint : fillPaint}
          layout={{
            ...layer.layout,
            visibility: visible ? 'visible' : 'none',
          }}
        />
      ))}
    </Source>
  )
}
