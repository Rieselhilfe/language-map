// TODO: rename file to something logical; mv it and all children to ../local
import React, { FC } from 'react'
import { FormControlLabel, Switch } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import {
  useLabelAndSymbDispatch,
  useSymbAndLabelState,
} from 'components/context/SymbAndLabelContext'
import {
  UI_HIDE_LABELS,
  UI_HIDE_SYMBOLS,
  UI_HIDE_SYMBOLS_AND_LABELS,
} from 'components/config'

type CustomFormControlProps = {
  label: React.ReactNode
  switchControl: React.ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: 0,
      marginRight: 0,
      marginBottom: '0.25rem',
      '&+ *': {
        marginLeft: 0,
      },
    },
    controlLabel: {
      display: 'flex',
      alignItems: 'center',
    },
    smallerText: {
      fontSize: '0.75rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.65rem',
      },
    },
  })
)

export const CustomFormControl: FC<CustomFormControlProps> = (props) => {
  const { label, switchControl } = props
  const classes = useStyles()
  const { smallerText, root } = classes

  return (
    <FormControlLabel
      classes={{ label: smallerText, root }}
      label={label}
      control={switchControl}
    />
  )
}

export const LangPointsToggle: FC = (props) => {
  const { hideLangPoints } = useSymbAndLabelState()
  const symbLabelDispatch = useLabelAndSymbDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    symbLabelDispatch({ type: 'TOGGLE_LANG_POINTS' })
  }

  return (
    <CustomFormControl
      label={UI_HIDE_SYMBOLS}
      switchControl={
        <Switch
          checked={hideLangPoints}
          onChange={handleChange}
          name="toggle-lang-points"
          size="small"
        />
      }
    />
  )
}

export const LangLabelsToggle: FC = (props) => {
  const { hideLangLabels } = useSymbAndLabelState()
  const symbLabelDispatch = useLabelAndSymbDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    symbLabelDispatch({ type: 'TOGGLE_LANG_LABELS' })
  }

  return (
    <CustomFormControl
      label={UI_HIDE_LABELS}
      switchControl={
        <Switch
          checked={hideLangLabels}
          onChange={handleChange}
          name="toggle-lang-points"
          size="small"
        />
      }
    />
  )
}

export const AllLangDataToggle: FC = () => {
  const { hideLangLabels, hideLangPoints } = useSymbAndLabelState()
  const symbLabelDispatch = useLabelAndSymbDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const payload = event.target.checked

    symbLabelDispatch({ type: 'TOGGLE_LANG_POINTS', payload })
    symbLabelDispatch({ type: 'TOGGLE_LANG_LABELS', payload })
  }

  return (
    <CustomFormControl
      label={UI_HIDE_SYMBOLS_AND_LABELS}
      switchControl={
        <Switch
          checked={hideLangLabels && hideLangPoints}
          onChange={handleChange}
          name="toggle-lang-points"
          size="small"
        />
      }
    />
  )
}
