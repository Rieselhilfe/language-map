import React from 'react'
import { IconButton } from '@material-ui/core'
import { GoFile } from 'react-icons/go'
import { FaMapMarkedAlt } from 'react-icons/fa'

import { InstanceLevelSchema, InternalWithLang } from 'components/context/types'
import { UI_SHOW_IN_MAP, UI_VIEW_FULL_SCREEN_DETAILS } from 'components/config'
import { CountryListItemWithFlag } from './CountryListItemWithFlag'
import { EndoImageModal } from './EndoImageModal'

export const FILTER_CLASS = 'for-filter'

export function renderCountryColumn(
  data: InstanceLevelSchema
): string | React.ReactNode {
  return (
    <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
      {data.Country.map((countryWithFlag, i) => (
        <CountryListItemWithFlag
          key={data.Country[i]}
          name={data.Country[i]}
          url={data.countryImg[i].url}
          filterClassName={FILTER_CLASS}
        />
      ))}
    </ul>
  )
}

export function renderEndoColumn(
  data: InstanceLevelSchema
): string | React.ReactNode {
  if (!data['Font Image Alt']) {
    return data.Endonym
  }

  return (
    <EndoImageModal
      url={data['Font Image Alt'][0].url}
      language={data.Language}
    />
  )
}

// This is a misleading name since it's now "County", but it does the same thing
export function renderDescripCol(): string | React.ReactNode {
  return (
    <IconButton
      title={UI_VIEW_FULL_SCREEN_DETAILS}
      size="small"
      color="secondary"
    >
      <GoFile />
    </IconButton>
  )
}

export function renderIDcolumn(): string | React.ReactNode {
  return (
    <IconButton title={UI_SHOW_IN_MAP} size="small" color="secondary">
      <FaMapMarkedAlt />
    </IconButton>
  )
}

export const whittleLangFeats = (
  data: InstanceLevelSchema[]
): InternalWithLang[] =>
  data.map((row) => {
    const { id, Latitude, Longitude, Language } = row

    // Language needed for "No community selected" due to new routes setup
    return { id, Latitude, Longitude, Language }
  })
