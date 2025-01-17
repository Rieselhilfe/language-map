import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import { RecordDescription } from 'components/results'
import { DetailedIntro, LangOrEndoIntro } from 'components/details'
import { FeedbackToggle } from 'components/about'
import { routes } from 'components/config/api'
import { UI_SOMETHING_WRONG_COMMUNITY } from 'components/config'
import { NoFeatSel } from './NoFeatSel'
import { DetailsProps } from './types'
import { useDetails } from './hooks'

// Just the routes so that the hook with `useParams` will work
export const DetailsPanel: FC = () => {
  return (
    <Switch>
      <Route path={routes.details} exact>
        <DetailsWrap />
      </Route>
      {/* Don't need path, assumes parent will be in a Route already */}
      <Route>
        <NoFeatSel />
      </Route>
    </Switch>
  )
}

// Responsible for hitting the hook and passing data
const DetailsWrap: FC = () => {
  const {
    isLoading,
    error,
    instanceDescripID,
    langDescripID,
    data,
    id,
    notFound,
  } = useDetails()

  if (isLoading) return null
  if (error) return <p>{UI_SOMETHING_WRONG_COMMUNITY}</p>
  if (notFound)
    return <NoFeatSel reason={`No community found with an id of ${id}.`} />

  return <Details {...{ instanceDescripID, langDescripID, data }} />
}

// Used in /Explore/Language/:language/:id and /Data/:id
export const Details: FC<DetailsProps> = (props) => {
  const { instanceDescripID, langDescripID, data } = props

  if (!data) return null

  const { Language } = data
  const descripID = instanceDescripID || langDescripID

  document.title = `${Language} - Berlin Languages`

  return (
    <>
      <DetailedIntro data={data} langDescripID={langDescripID} isInstance>
        <LangOrEndoIntro data={data} />
      </DetailedIntro>
      {/* There should always be a description, but checking just in case */}
      {descripID && (
        <Typography variant="body2" component="div" align="left">
          <RecordDescription
            descriptionID={descripID}
            descripTable={
              instanceDescripID ? 'Descriptions' : 'Language Descriptions'
            }
          />
        </Typography>
      )}
      <FeedbackToggle language={Language} />
    </>
  )
}
