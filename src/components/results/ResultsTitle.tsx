/* eslint-disable operator-linebreak */
/* eslint-disable react/display-name */
import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { BsTable } from 'react-icons/bs'
import { UI_DATA } from 'components/config'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableTitleRoot: {
      gridArea: 'title',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        '& .MuiFormControl-root': { paddingLeft: 8 },
      },
    },
    titleIcon: {
      fontSize: '0.6em',
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(1),
      flexShrink: 0,
    },
  })
)

export const ResultsTitle: FC = () => {
  const classes = useStyles()

  return (
    <Typography variant="h4" className={classes.tableTitleRoot}>
      <BsTable className={classes.titleIcon} />
      {UI_DATA}
    </Typography>
  )
}
