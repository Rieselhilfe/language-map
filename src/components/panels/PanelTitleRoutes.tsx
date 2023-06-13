import React, { FC } from 'react'
import { Route, Switch, Link as RouterLink } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { IconButton, Typography, Tooltip, Hidden } from '@material-ui/core'

import {
  UI_CONTACT_FEEDBACK,
  UI_EXPLORE_DATA,
  UI_LANGUAGE,
  UI_NO_SITES_SELECTED,
  UI_SEARCH_AND_DISPLAY_OPTIONS,
  UI_SEARCH_AND_DISPLAY_SITES,
  UI_SITE_DETAILS,
  icons,
} from 'components/config'
import { routes } from 'components/config/api'
import { pluralize } from 'components/explore/utils'
import { Logo } from 'components/generic'

type PanelTitleProps = {
  text: React.ReactNode
  icon?: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      display: 'flex',
      '& > svg': {
        color: theme.palette.text.hint,
        marginRight: 6,
      },
    },
    logoWrap: {
      fontSize: '0.65rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      alignItems: 'center',
    },
    panelTitleText: {
      fontSize: '1.5rem',
      [theme.breakpoints.only('xs')]: {
        fontSize: '1.25rem',
      },
    },
    rightSideBtns: {
      '& > * + *': {
        marginLeft: 4,
      },
    },
  })
)

const PanelTitle: FC<PanelTitleProps> = (props) => {
  const { text, icon } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {icon}
      <Typography
        variant="h6"
        component="h2"
        className={classes.panelTitleText}
      >
        {text}
      </Typography>
    </div>
  )
}

const LinkToHomeBtn: FC = (props) => {
  return (
    <Tooltip title={UI_SEARCH_AND_DISPLAY_OPTIONS}>
      <IconButton
        size="small"
        aria-label="go home"
        color="inherit"
        to="/karte/"
        component={RouterLink}
      >
        {icons.HomeLink}
      </IconButton>
    </Tooltip>
  )
}

export const PanelTitleRoutes: FC<{ panelTitle: string }> = (props) => {
  const { panelTitle } = props
  const classes = useStyles()

  // TODO: add small logo to left side of bar
  return (
    <Switch>
      <Route path="/karte/" exact>
        <div style={{ minWidth: '1.5rem' }} />
        <Hidden smDown>
          <PanelTitle text={UI_SEARCH_AND_DISPLAY_SITES} icon={icons.Home} />
        </Hidden>
        <Hidden mdUp>
          <div className={classes.logoWrap}>
            <Logo darkTheme />
          </div>
        </Hidden>
      </Route>
      <Route path={routes.none}>
        <PanelTitle text={UI_NO_SITES_SELECTED} />
      </Route>
      <Route path={routes.data}>
        <PanelTitle text=" " />
      </Route>
      <Route
        path={['/karte/Explore/:field/:value/:language/:id', routes.details]}
        exact
      >
        <PanelTitle text={UI_SITE_DETAILS} icon={icons.SiteDetails} />
      </Route>
      <Route
        path={[
          '/karte/Explore/:field/:value/:language',
          routes.languageInstance,
        ]}
        exact
      >
        <PanelTitle text={UI_LANGUAGE} icon={icons.Language} />
      </Route>
      <Route path="/karte/Explore/:field" exact>
        <PanelTitle text={pluralize(panelTitle)} icon={icons[panelTitle]} />
      </Route>
      <Route path="/karte/Explore/:field/:value" exact>
        <PanelTitle text={panelTitle} icon={icons[panelTitle]} />
      </Route>
      <Route path="/karte/Census">
        {/* Census just needs panel heading override */}
        <LinkToHomeBtn />
        <PanelTitle text="Census Language Data" icon={icons[panelTitle]} />
      </Route>
      <Route path={routes.explore} exact>
        <LinkToHomeBtn />
        <PanelTitle text={UI_EXPLORE_DATA} icon={icons[panelTitle]} />
      </Route>
      <Route path={routes.feedback} exact>
        <PanelTitle text={UI_CONTACT_FEEDBACK} icon={icons[panelTitle]} />
      </Route>
      <Route path="/karte/:level1" exact>
        {/* Home btn on /TopLevelRoutes looks balanced on left */}
        <LinkToHomeBtn />
        <PanelTitle text={panelTitle} icon={icons[panelTitle]} />
      </Route>
      <Route path={routes.info}>
        <PanelTitle text={panelTitle} icon={icons[panelTitle]} />
      </Route>
    </Switch>
  )
}
