import React, { FC } from 'react'
import { Route } from 'react-router-dom'
import { ReactQueryCacheProvider } from 'react-query'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { FeedbackForm } from 'components/about'
import { wpQueryCache } from 'components/about/utils'
import { routes } from 'components/config/api'
import { Nav } from 'components/nav'
import { WaysToHelp } from './WaysToHelp'

const NO_IMG_SHADOW_CLASSNAME = 'no-img-shadow'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& img': {
        height: 'auto',
        margin: '1rem auto',
        maxWidth: '100%',
        boxShadow: theme.shadows[8],
        // Prevent screenshots from getting lost in Paper bg if same color:
        // outline: 'solid 1px hsl(0deg 0% 40%)',
        [theme.breakpoints.down('xs')]: {
          margin: '0.5rem 0',
        },
      },
      '& figure': {
        margin: '1rem 0', // horiz. margin defaults to huge 40px in Chrome
        textAlign: 'center',
      },
      [`& .${NO_IMG_SHADOW_CLASSNAME} img`]: {
        boxShadow: 'none',
      },
    },
  })
)

export const InfoPanel: FC = () => {
  const classes = useStyles()

  return (
    <>
      <Route path={routes.info} exact>
        <WaysToHelp />
      </Route>
      <ReactQueryCacheProvider queryCache={wpQueryCache}>
        <Route path={routes.about}>
          <div className={classes.root}>
            <p>
              Berlin spricht! ist ein Projekt, das die Sprachvielfalt im urbanen
              Raum Berlin dokumentiert. Ziel ist es, Sprecher:innen
              verschiedener Sprachen beim Erhalt ihrer Sprachen in Berlin zu
              unterstützen und die Kontakte zwischen Sprachgemeinden in Berlin
              und Wissenschaftler:innen zu fördern.
            </p>
            <p>
              In Berlin leben Menschen aus über 180 Ländern mit
              unterschiedlichen Migrationshintergründen und -geschichten, die
              gleichzeitig eine Vielzahl von sehr unterschiedlichen Sprachen –
              darunter auch kleine und bedrohte Sprachen – sprechen. Zusätzlich
              gibt es Vertreter:innen der 7 einheimischen Minderheitensprachen
              und auch einige Plansprachen wie z. B. Esperanto werden in der
              Stadt aktiv gelebt. Diese individuelle und gesellschaftliche
              Vielfalt ist Teil des Kulturerbes der Menschheit. Ihre
              Wertschätzung ist eine wesentliche Voraussetzung für ein
              gelingendes soziales Miteinander im urbanen Raum.
            </p>
            <p>
              Mit unserer Sprachkarte „Sprachen Berlins“ wollen wir dazu einen
              Beitrag leisten, das Miteinander im urbanen Raum zu verbessern:
              Auf der Online-Karte wird die urbane Sprachenvielfalt des Berliner
              Raums interaktiv und dynamisch in Form einer Karte dokumentiert.
              Vorbild ist dabei das Projekt „Languages of New York City“.
            </p>
            <h3>Zu der Website des Projektes:</h3>{' '}
            <a href="https://www.berlin-spricht.org/">www.berlin-spricht.org</a>
            <h3>Zitation:</h3>
            <p>
              Verhoeven, Elisabeth, Lehmann, Nico, Rott, Julian & Henri
              Schellberg (eds.) (2023). Sprachen Berlins – Languages of Berlin.
              [Digital Map]. Berlin: Humboldt-Universität zu Berlin.
              (https://berlin-spricht.org/karte/)
            </p>
          </div>
        </Route>
        <Route path={routes.feedback}>
          <FeedbackForm />
        </Route>
      </ReactQueryCacheProvider>
      <Route path={routes.info} exact>
        <Nav />
      </Route>
    </>
  )
}
