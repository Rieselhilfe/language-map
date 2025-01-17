// NOTE: did not implement "hover" state for census layers due to complexities
// with their dynamic fills.

// The feature-state approach came from:
// https://docs.mapbox.com/help/tutorials/data-joins-with-mapbox-boundaries/
const fillPaint = {
  type: 'fill',
  paint: {
    'fill-color': [
      'case',
      ['!=', ['feature-state', 'total'], NaN],
      [
        'interpolate',
        ['linear'],
        ['feature-state', 'total'],
        4,
        'rgb(237, 248, 233)',
        140,
        'rgb(0, 109, 44)',
      ],
      'rgba(255, 255, 255, 0)', // TODO: transparent at least
    ],
    'fill-opacity': 0.8,
  },
}

const linePaint = { 'line-color': '#c2c2c2', 'line-opacity': 0.2 }

const common = {
  linePaint,
  fillPaint,
  uniqueIDfield: 'GEOID',
  idIsNumeric: true,
}

export const censusLayersConfig = {
  puma: {
    ...common,
    routePath: '/karte/Census/puma/:field/:id',
    sourceID: 'puma',
    sourceLayer: 'puma',
    tableName: 'puma',
    url: 'placeholder',
    visContextKey: 'showNeighbs',
  },
  tract: {
    ...common,
    routePath: '/karte/Census/tract/:field/:id',
    sourceID: 'tract',
    sourceLayer: 'tract',
    tableName: 'tract',
    url: 'placeholder',
    visContextKey: 'showCounties',
  },
}
