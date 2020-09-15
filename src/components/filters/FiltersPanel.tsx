import React, { FC, useContext, useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'

import { GlobalContext, ScrollToTopOnMount } from 'components'
import { LegendPanel } from 'components/legend'
import { SearchByOmnibox } from './SearchByOmnibox'
import { LangRecordSchema } from '../../context/types'

export const FiltersPanel: FC = () => {
  const { state } = useContext(GlobalContext)
  const { langSymbGroups, activeLangSymbGroupId } = state
  const elemID = 'filters-panel'
  /* eslint-disable operator-linebreak */
  const groupName = langSymbGroups[activeLangSymbGroupId]
    ? langSymbGroups[activeLangSymbGroupId].name
    : ''
  /* eslint-enable operator-linebreak */
  const [data, setData] = useState<LangRecordSchema[]>([])

  useEffect((): void => setData(state.langFeatures), [state.langFeatures])

  // TODO: something respectable for styles, aka MUI-something
  return (
    <>
      <ScrollToTopOnMount elemID={elemID} />
      <Typography variant="h5" component="h3" id={elemID}>
        Search language communities
      </Typography>
      <SearchByOmnibox data={data} />
      <Typography variant="h5" component="h3">
        Legend
      </Typography>
      {state.mapLoaded && (
        // TODO: react-query for mb-styles json, then use query in legend panel
        <LegendPanel legendItems={state.legendItems} groupName={groupName} />
      )}
    </>
  )
}
