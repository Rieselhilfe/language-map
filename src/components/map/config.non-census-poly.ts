const sharedLinePaint = { 'line-opacity': 0.4 }
const sharedFillOpacity = [
  'case',
  ['boolean', ['feature-state', 'hover'], false],
  0.29,
  0.14,
]

export const nonCensusPolygonConfig = {
  neighborhoods: {
    linePaint: { ...sharedLinePaint, 'line-color': '#FFA500' },
    routePath: '/karte/Explore/Neighborhood/:id',
    selLineColor: 'rgb(255, 165, 0)',
    selFillColor: 'rgb(255, 165, 0)',
    sourceID: 'neighborhoods',
    sourceLayer: 'lor_ortsteile-alg2ty',
    tableName: 'Neighborhood',
    url: 'mapbox://langmapberlin.5oo280v6',
    visContextKey: 'showNeighbs',
    uniqueIDfield: 'name',
    fillPaint: {
      'fill-color': 'orange',
      'fill-opacity': sharedFillOpacity,
    },
  },
  counties: {
    linePaint: {
      ...sharedLinePaint,
      'line-color': 'hsl(209, 42%, 73%)',
    },
    routePath: '/karte/Explore/County/:id',
    selLineColor: 'hsl(193, 73%, 52%)',
    selFillColor: 'hsla(193, 63%, 42%, 0.85)',
    sourceID: 'counties',
    sourceLayer: 'bezirksgrenzen-dzaqvc',
    tableName: 'County',
    url: 'mapbox://langmapberlin.3or72b7t',
    visContextKey: 'showCounties',
    uniqueIDfield: 'name',
    fillPaint: {
      'fill-color': 'hsl(193, 63%, 32%)',
      'fill-opacity': sharedFillOpacity,
    },
  },
}
