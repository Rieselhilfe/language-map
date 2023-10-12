import { BaseLayer, InitialMapProps, BoundsArray } from './types'
import { censusLayersConfig } from './config.census'
import { nonCensusPolygonConfig } from './config.non-census-poly'

export * from './config.points'

export const MAPBOX_TOKEN = process.env.REACT_APP_MB_TOKEN
export const NYC_LAT_LONG = { latitude: 52.5244, longitude: 13.4105 }
export const initialMapState = { ...NYC_LAT_LONG, zoom: 8.5 }
export const POINT_ZOOM_LEVEL = 13 // clicked point or single-result filter
export const mbStyleTileConfig = {
  layerId: 'data-for-map3', // TODO: a dev/deploy-only instance!
  langSrcID: 'languages-src', // arbitrary, set in code, never changes
  tilesetId: 'langmapberlin.cldbohp940q9m20pqsjosubyw-2stso',
  // Custom MB Style: the only known way to use the custom fonts
  customStyles: {
    dark: 'mapbox://styles/langmapberlin/clmruj7qs02au01qx7x2g80p3',
    light: 'mapbox://styles/langmapberlin/clmruj7qs02au01qx7x2g80p3',
    none: 'mapbox://styles/langmapberlin/clmruj7qs02au01qx7x2g80p3',
  } as { [key in BaseLayer]: string },
}

export const allPolyLayersConfig = {
  ...censusLayersConfig,
  ...nonCensusPolygonConfig,
}

export const mapProps: InitialMapProps = {
  attributionControl: false,
  className: 'mb-language-map',
  clickRadius: 4, // much comfier for small points on small screens
  height: '100%',
  mapboxApiAccessToken: MAPBOX_TOKEN,
  mapOptions: { logoPosition: 'bottom-left' },
  maxZoom: 18, // 18 is kinda misleading w/the dispersed points, but looks good
  width: '100%',
}

// This is for #3 above. It should include the 5 boroughs and bits of NJ, and
// centered on Manhattan. // TODO: improve this now that no more offsets
export const initialBounds = [
  [13.25, 52.35], // 52.5244 Longitude: 13.4105
  [13.55, 52.65],
] as BoundsArray
