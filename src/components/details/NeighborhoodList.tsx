import React, { FC } from 'react'
import { Link as RouterLink, Route, Switch } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Link } from '@material-ui/core'
import { BiMapPin } from 'react-icons/bi'

import { CustomCard, CardListWrap } from 'components/explore'
import { Explanation, UItextFromAirtable } from 'components/generic'
import { sortArrOfObjects } from 'components/legend/utils'
import {
  UI_ADDL_NEIGHBORHOODS,
  UI_SITES,
  UI_VIEW_DETAILS_LANGUAGE,
  UI_VIEW_MORE_LANGUAGES_IN_1,
  UI_VIEW_MORE_LANGUAGES_IN_2,
} from 'components/config'
import { DetailedIntroProps } from './types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: { marginBottom: '1.5em' },
    addlNeighbsList: {
      margin: 0,
      fontSize: '0.85rem',
    },
    explanation: {
      color: theme.palette.text.secondary,
      fontSize: '0.75rem',
      margin: '0.5rem 0',
    },
    mainHeading: {
      marginBottom: '0.5rem',
    },
    sectionHeading: {
      marginTop: '1rem',
    },
    verticalAlign: {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginRight: '0.25em',
        color: theme.palette.text.secondary,
        fontSize: '0.85em',
      },
    },
  })
)

const CardFooter: FC<{ text?: string }> = ({ text }) => {
  return (
    <Switch>
      <Route path="/Explore/Language/:language/:id" exact>
        {UI_VIEW_MORE_LANGUAGES_IN_1} {text} {UI_VIEW_MORE_LANGUAGES_IN_2}
      </Route>
      <Route>{UI_VIEW_DETAILS_LANGUAGE}</Route>
    </Switch>
  )
}

export const NeighborhoodList: FC<DetailedIntroProps> = (props) => {
  const { data, isInstance } = props
  const classes = useStyles()
  const {
    addlNeighborhoods,
    Neighborhood,
    'Primary Locations': primaryLocs = [],
    Town,
    instanceIDs = [],
    name,
  } = data || {}
  const locName = Neighborhood || Town
  const locRouteName = Town ? 'Town' : 'Neighborhood'
  let additional

  if (isInstance) additional = data['Additional Neighborhoods'] || []
  else additional = addlNeighborhoods
  const gahhhh = additional || []

  const More = (
    <>
      <Typography
        variant="overline"
        component="h4"
        className={classes.sectionHeading}
      >
        {UI_ADDL_NEIGHBORHOODS}
      </Typography>
      <ul className={classes.addlNeighbsList}>
        <Switch>
          <Route path="/karte/Explore/Language/:language/:id" exact>
            {(data['Additional Neighborhoods'] || []).map((place) => (
              <li key={place}>
                <Link
                  component={RouterLink}
                  to={`/Explore/Neighborhood/${place}`}
                >
                  {place}
                </Link>
              </li>
            ))}
          </Route>
          <Route>
            {addlNeighborhoods?.map((place) => (
              <li key={place}>
                <Link
                  component={RouterLink}
                  to={`/karte/Explore/Neighborhood/${place}`}
                >
                  {place}
                </Link>
              </li>
            ))}
          </Route>
        </Switch>
      </ul>
    </>
  )

  const sortedByLoc = primaryLocs
    .map((loc, i) => ({
      loc,
      county: data.County[i],
      id: instanceIDs[i] || 999999,
    }))
    .sort(sortArrOfObjects<{ loc: string; county: string; id: number }>('loc'))

  return (
    <>
      <Typography
        variant="h5"
        component="h3"
        className={`${classes.verticalAlign} ${classes.mainHeading}`}
      >
        <BiMapPin /> {UI_SITES}
      </Typography>
      <Explanation>
        <Switch>
          <Route path="/karte/Explore/Language/:language/:id" exact>
            <UItextFromAirtable id="details-neighb-loc-list" rootElemType="p" />
          </Route>
          <Route>
            <UItextFromAirtable id="lang-profile-loc-list" />
          </Route>
        </Switch>
      </Explanation>
      <CardListWrap>
        <Switch>
          {/* Inside the Details "Locations" popout */}
          <Route path="/karte/Explore/Language/:language/:id" exact>
            <CustomCard
              title={locName}
              // intro={`${data.County[0]}`} // TODO: County as intro
              url={`/Explore/${locRouteName}/${locName}`}
              footer={<CardFooter text={locName} />}
            />
          </Route>
          <Route>
            {sortedByLoc.map(({ loc, county, id }, i) => {
              return (
                <CustomCard
                  key={loc}
                  title={loc}
                  intro={county}
                  url={`/karte/Explore/Language/${name}/${id}`}
                  footer={<CardFooter text={loc} />}
                  timeout={350 + i * 250}
                />
              )
            })}
          </Route>
        </Switch>
      </CardListWrap>
      {gahhhh.length ? More : null}
    </>
  )
}
