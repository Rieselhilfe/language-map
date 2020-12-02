import React, { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Source, Layer } from 'react-map-gl'

import * as utils from './utils'
import * as Types from './types'

export const BoundariesLayer: FC<Types.BoundariesLayerProps> = (props) => {
  const { beforeId, source, layers, lookupPath, visible } = props
  const { data, isFetching, error } = useQuery(
    source.id,
    () => utils.asyncAwaitFetch<Types.BoundaryLookup[]>(lookupPath),
    {
      staleTime: 300000,
      refetchOnMount: false,
      enabled: visible,
    }
  )
  const [recordIDs, setRecordIDs] = useState<number[]>()

  useEffect(() => {
    if (isFetching || !data) return

    setRecordIDs(data.map((record) => record.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching])

  if (error || !recordIDs || !visible || isFetching) return null

  return (
    <Source {...source} type="vector">
      {layers.map((layer) => (
        <Layer
          key={layer.id}
          beforeId={beforeId}
          {...layer}
          layout={{
            ...layer.layout,
            visibility: visible ? 'visible' : 'none',
          }}
          filter={['in', ['id'], ['literal', recordIDs]]}
        />
      ))}
    </Source>
  )
}
