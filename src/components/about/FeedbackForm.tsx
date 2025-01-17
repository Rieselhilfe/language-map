import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { UI_FEEDBACK_AND_QUESTIONS } from 'components/config'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      left: '1rem',
      bottom: '1rem',
    },
  })
)

const DOCS_FORM_SRC =
  'https://docs.google.com/forms/d/e/1FAIpQLSfyysD4C02HBVzU3MsJuFRhBSB4ituGYj7304-qcANmw0f6IA/viewform?embedded=true'

export const FeedbackForm: FC = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <iframe
        src={DOCS_FORM_SRC}
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title={UI_FEEDBACK_AND_QUESTIONS}
      >
        Loading…
      </iframe>
    </div>
  )
}
