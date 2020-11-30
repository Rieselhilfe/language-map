import React, { FC } from 'react'
import { Typography, Box } from '@material-ui/core'

import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

import { SubtleText } from 'components/generic'
import * as Types from './types'
import { useSpatialPanelStyles } from './styles'

export const LocationSearchContent: FC<Types.PanelSectionProps> = (props) => {
  const { children, explanation, heading } = props
  const classes = useSpatialPanelStyles()

  return (
    <Box className={classes.root}>
      {heading && (
        <Typography variant="h5" component="h3">
          {heading}
        </Typography>
      )}
      <SubtleText>{explanation}</SubtleText>
      {children}
    </Box>
  )
}