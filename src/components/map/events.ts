import { Map, LngLatBounds } from 'mapbox-gl'

import * as config from './config'
import * as utils from './utils'
import * as MapTypes from './types'
import { LangRecordSchema } from '../../context/types'

const { langSrcID } = config.mbStyleTileConfig
const { neighbConfig, countiesConfig } = config

const countiesSrcId = countiesConfig.source.id
const neighSrcId = neighbConfig.source.id
const countiesPolyID = countiesConfig.layers[0]['source-layer']
const neighPolyID = neighbConfig.layers[0]['source-layer']

export function onHover(
  event: MapTypes.MapEvent,
  setTooltipOpen: React.Dispatch<MapTypes.MapTooltip | null>,
  map: Map
): void {
  const { features, target } = event
  const topMostFeat = features[0]
  const oneOfOurs = [langSrcID, neighSrcId, countiesSrcId].includes(
    topMostFeat.source
  )

  // Close tooltip no matter what
  setTooltipOpen(null)

  if (!topMostFeat || !oneOfOurs) {
    target.style.cursor = 'default'

    return
  }

  target.style.cursor = 'pointer'

  // Not Language points. Clear feature state then set to `hover`.
  if (topMostFeat.source !== langSrcID) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore // TODO: defeat
    const sourceLayer = topMostFeat.layer['source-layer']

    map.removeFeatureState({
      source: neighSrcId,
      sourceLayer: neighPolyID,
    })

    map.removeFeatureState({
      source: countiesSrcId,
      sourceLayer: countiesPolyID,
    })

    map.setFeatureState(
      {
        sourceLayer,
        source: topMostFeat.source,
        id: topMostFeat.id,
      },
      { hover: true }
    )
  } else {
    const {
      Latitude,
      Longitude,
      Endonym,
      Language,
      'Font Image Alt': altImage,
    } = features[0].properties as LangRecordSchema

    setTooltipOpen({
      latitude: Latitude,
      longitude: Longitude,
      heading: altImage ? Language : Endonym,
      subHeading: altImage || Endonym === Language ? '' : Language,
    })
  }
}

export function handleBoundaryClick(
  map: Map,
  topMostFeat: MapTypes.LangFeature | MapTypes.BoundaryFeat,
  boundsConfig: MapTypes.BoundsConfig,
  selFeatAttribs: null | LangRecordSchema
): void {
  const boundaryFeat = topMostFeat as MapTypes.BoundaryFeat
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore // TODO: defeat
  const sourceLayer = topMostFeat.layer['source-layer']

  map.removeFeatureState({
    source: neighSrcId,
    sourceLayer: neighPolyID,
  })

  map.removeFeatureState({
    source: countiesSrcId,
    sourceLayer: countiesPolyID,
  })

  map.setFeatureState(
    {
      sourceLayer,
      source: topMostFeat.source,
      id: boundaryFeat.id,
    },
    { selected: true }
  )

  const { type, coordinates } = boundaryFeat.geometry
  let polyCoords

  if (type === 'MultiPolygon') {
    // eslint-disable-next-line prefer-destructuring
    // TODO: fix
    // polyCoords = coordinates[0][0]
    // eslint-disable-next-line no-alert
    alert('sorry, multi-polygons not ready yet!')

    return
  }

  if (type === 'Polygon') {
    ;[polyCoords] = coordinates
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const clickedFeatBounds = polyCoords.reduce(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (allBounds: LngLatBounds, thisSet) => allBounds.extend(thisSet),
    new LngLatBounds()
  )

  const { width, height, isDesktop, mapOffset } = boundsConfig
  const { latitude, longitude, zoom } = utils.getWebMercSettings(
    width,
    height,
    isDesktop,
    mapOffset,
    clickedFeatBounds.toArray(),
    /* eslint-disable operator-linebreak */
    isDesktop
      ? { top: 60, bottom: 60, right: 60, left: 60 + mapOffset[0] * 2 }
      : { top: 30, bottom: height / 2 + 30, left: 30, right: 30 }
    /* eslint-enable operator-linebreak */
  )

  map.flyTo(
    {
      // Not THAT essential if you... don't like cool things
      essential: true,
      center: { lng: longitude, lat: latitude },
      zoom,
    },
    { selFeatAttribs, forceViewportUpdate: true }
  )
}
