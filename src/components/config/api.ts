import { RouteLocation } from './types'

export const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY as string
export const AIRTABLE_BASE = 'appRFybjjMghyz5K3'
export const AIRTABLE_CENSUS_BASE = 'appftD9UeMn9v5i8f'

// TODO: get this into provider/global so it doesn't need adding every time
export const reactQueryDefaults = {
  staleTime: Infinity,
  refetchOnMount: false, // TODO: rm if not needed
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
}

const censusRoutes = {
  local: '/karte/Census',
  censusDetail: '/karte/Census/:table/:field/:id',
  pumaDetail: '/karte/Census/puma/:field/:id',
  tractDetail: '/karte/Census/tract/:field/:id',
} as {
  [key: string]: RouteLocation
}

const infoRoutes = {
  about: '/karte/Info/About',
  feedback: '/karte/Info/Feedback',
  help: '/karte/Info/Help',
  info: '/karte/Info',
}

export const routes = {
  explore: '/karte/Explore',
  home: '/karte/',
  neighborhood: '/karte/Explore/Neighborhood',
  neighbInstance: '/karte/Explore/Neighborhood/:id',
  countyInstance: '/karte/Explore/County/:id',
  data: '/karte/Data', // aka "table"
  dataDetail: '/karte/Data/:id', // aka "table"
  none: '/karte/Explore/Language/none',
  details: '/karte/Explore/Language/:value/:id',
  countiesBase: '/karte/Explore/County',
  languageInstance: '/karte/Explore/Language/:language',
  ...censusRoutes,
  ...infoRoutes,
} as {
  [key: string]: RouteLocation
}
