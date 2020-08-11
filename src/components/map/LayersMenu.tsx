import React, { FC, useContext, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
} from '@material-ui/core'

import { GlobalContext } from 'components'
import { LayerToggle } from 'components/map'
import { BaselayerType } from './types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formHeading: {
      marginBottom: 4,
      '&:last-of-type': {
        marginTop: theme.spacing(2),
      },
    },
    baselayerGroup: {
      display: 'flex',
      flexDirection: 'row',
    },
  })
)

export const LayersMenu: FC = () => {
  const classes = useStyles()
  // TODO: use global state instead?
  const [activeBaselayer, setActiveBaselayer] = useState('light')
  const { dispatch } = useContext(GlobalContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement
    setActiveBaselayer(value)

    dispatch({
      type: 'SET_BASELAYER',
      payload: value as BaselayerType,
    })
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" className={classes.formHeading}>
        Layer Visibility
      </FormLabel>
      <FormGroup>
        <LayerToggle layerId="counties" name="Counties" />
        <LayerToggle layerId="neighborhoods" name="Neighborhoods" />
      </FormGroup>
      <FormLabel component="legend" className={classes.formHeading}>
        Background Layer
      </FormLabel>
      <RadioGroup
        aria-label="choose a baselayer"
        name="baselayer-chooser"
        value={activeBaselayer}
        onChange={handleChange}
        className={classes.baselayerGroup}
      >
        <FormControlLabel value="light" control={<Radio />} label="Light" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
      </RadioGroup>
    </FormControl>
  )
}
