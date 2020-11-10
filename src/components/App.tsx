import React, { FC, useEffect, Suspense } from 'react'
import * as Sentry from '@sentry/react'
import { Route } from 'react-router-dom'
import { ReactQueryCacheProvider } from 'react-query'
import { GoInfo } from 'react-icons/go'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

import { AboutPageView, WelcomeDialog } from 'components/about'
import { queryCache } from 'components/about/utils'
import { paths as routes } from 'components/config/routes'
import { AppWrap } from './AppWrap'
import { wpQueryIDs } from './about/config'

// Good tut on this: https://ui.dev/react-router-v4-code-splitting/
const LazyTable = React.lazy(
  () =>
    // webpackChunkName does not seem to work here. Maybe because there is
    // another webpackChunkName nested inside the imported components?
    import(/* webpackChunkName: "table" */ 'components/results/ResultsModal')
)

export const App: FC = () => {
  useEffect(() => {
    queryCache.prefetchQuery(wpQueryIDs.welcome)
    queryCache.prefetchQuery(wpQueryIDs.help)
    queryCache.prefetchQuery(wpQueryIDs.about)
  }, [])

  return (
    <Sentry.ErrorBoundary
      fallback={({ error, componentStack, resetError }) => (
        <>
          <div>You have encountered an error</div>
          <div>{error.toString()}</div>
          <div>{componentStack}</div>
          <button
            type="button"
            onClick={() => {
              resetError()
            }}
          >
            Click here to reset
          </button>
        </>
      )}
    >
      <AppWrap />
      <ReactQueryCacheProvider queryCache={queryCache}>
        {/* ERROR: null is not an object (evaluating 'window.localStorage.hideWelcome') */}
        {/* FIXME: https://sentry.io/organizations/endangered-language-alliance/issues/1953110114/?project=5313356 */}
        {!window.localStorage.hideWelcome && (
          <WelcomeDialog queryKey={wpQueryIDs.welcome} />
        )}
        <Route path={routes.about}>
          <AboutPageView
            title="About"
            icon={<GoInfo />}
            queryKey={wpQueryIDs.about}
          />
        </Route>
        <Route path={routes.help}>
          <AboutPageView
            title="Help"
            icon={<AiOutlineQuestionCircle />}
            queryKey={wpQueryIDs.help}
          />
        </Route>
      </ReactQueryCacheProvider>
      <Suspense fallback={<h1>Loading table data...</h1>}>
        <LazyTable />
      </Suspense>
    </Sentry.ErrorBoundary>
  )
}
