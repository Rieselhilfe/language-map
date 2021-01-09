import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import { RecordDescription } from 'components/results'
import { DetailedIntro } from 'components/details'
import { PanelContentSimple } from 'components/panels/PanelContent'
import { LoadingIndicatorPanel } from 'components/generic/modals'
import { routes } from 'components/config/api'
import { NoFeatSel } from './NoFeatSel'
import { DetailsProps } from './types'
import { useDetails } from './hooks'

export const DetailsError: FC = () => {
  return (
    <PanelContentSimple>
      <p>Something went wrong looking for this community.</p>
    </PanelContentSimple>
  )
}

// Just the routes so that the hook with `useParams` will work
export const DetailsPanel: FC = () => {
  return (
    <Switch>
      <Route path={`${routes.details}/:id`}>
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
  const { isLoading, error, data, id, notFound } = useDetails()

  if (isLoading) return <LoadingIndicatorPanel />
  if (error) return <DetailsError />
  if (notFound)
    return <NoFeatSel reason={`No community found with an id of ${id}.`} />

  return (
    <PanelContentSimple>
      <Details data={data} />
    </PanelContentSimple>
  )
}

// Used in /details/:id and /table/:id
export const Details: FC<DetailsProps> = (props) => {
  const { instanceDescripID, langDescripID, data } = props

  if (!data) return null

  const { Language } = data
  const descripID = instanceDescripID || langDescripID

  document.title = `${Language} - NYC Languages`

  return (
    <>
      <DetailedIntro data={data} isInstance />
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
    </>
  )
}
