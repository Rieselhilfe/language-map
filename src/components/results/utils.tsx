import React from 'react'
import { IconButton } from '@material-ui/core'
import { GoFile } from 'react-icons/go'
import { FaMapMarkedAlt } from 'react-icons/fa'

import { DetailsSchema, InternalUse } from 'components/context/types'
import { CountryListItemWithFlag } from './CountryListItemWithFlag'
import { EndoImageModal } from './EndoImageModal'

export const FILTER_CLASS = 'for-filter'

export function renderCountryColumn(
  data: DetailsSchema
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
  data: DetailsSchema
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

export function renderDescripCol(): string | React.ReactNode {
  return (
    <IconButton title="View description" size="small" color="secondary">
      <GoFile />
    </IconButton>
  )
}

export function renderIDcolumn(): string | React.ReactNode {
  return (
    <IconButton title="Show in map" size="small" color="secondary">
      <FaMapMarkedAlt />
    </IconButton>
  )
}

export const whittleLangFeats = (data: DetailsSchema[]): InternalUse[] =>
  data.map((row) => {
    const { id, Latitude, Longitude } = row

    return { id, Latitude, Longitude }
  })
