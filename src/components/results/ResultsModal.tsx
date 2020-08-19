import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Dialog } from '@material-ui/core'

import { useStyles } from 'components/filters/config.styles'
import { DialogCloseBtn } from 'components'

export const ResultsModal: FC = (props) => {
  const { children } = props
  const classes = useStyles()
  const history = useHistory()
  const loc = useLocation()

  const handleClose = () => {
    history.push(`/${loc.search}`)
  }

  return (
    <Dialog
      open
      className={`${classes.resultsModalRoot}`}
      onClose={handleClose}
      aria-labelledby="results-modal-dialog-title"
      aria-describedby="results-modal-dialog-description"
      maxWidth="xl"
      PaperProps={{
        className: classes.resultsModalPaper,
      }}
    >
      {/* TODO: restore? */}
      {/* <Typography className={classes.featureCount}>
        Showing {langFeatures.length} of {langFeaturesCached.length} language
        communities.
      </Typography> */}
      <DialogCloseBtn onClose={handleClose} tooltip="Exit to map" />
      {children}
    </Dialog>
  )
}
