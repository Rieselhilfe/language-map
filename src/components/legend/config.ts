import { OutlinedTextFieldProps } from '@material-ui/core'

import * as Types from './types'

export const commonSelectProps = {
  fullWidth: true,
  select: true,
  size: 'small',
  InputLabelProps: { disableAnimation: true, focused: true },
  SelectProps: { native: true },
} as OutlinedTextFieldProps

export const worldRegionLegend = {
  Africa: [
    'Eastern Africa',
    'Middle Africa',
    'Northern Africa',
    'Southern Africa',
    'Western Africa',
  ],
  Americas: [
    'Caribbean',
    'Central America',
    'Northern America',
    'South America',
  ],
  Asia: [
    'Central Asia',
    'Eastern Asia',
    'Southeastern Asia',
    'Southern Asia',
    'Western Asia',
  ],
  Europe: [
    'Eastern Europe',
    'Northern Europe',
    'Southern Europe',
    'Western Europe',
  ],
  Oceania: [
    'Australia and New Zealand', // maybe issues w/ampersand
    'Melanesia',
    'Micronesia',
    'Polynesia',
  ],
} as Types.WorldRegionLegend

export const legendConfig = {
  'World Region': {
    groupByField: 'continent',
    routeable: true,
    fields: [
      'name',
      'continent',
      'icon-color',
      'text-color',
      'text-halo-color',
    ],
  },
  Size: {
    labelByField: 'label',
    fields: ['name', 'label', 'icon-color', 'icon-size'],
  },
  Status: {
    fields: ['name', 'icon-color', 'icon-image', 'src_img'],
  },
} as Types.LegendConfig
