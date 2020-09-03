import React, { FC } from 'react'
import { CirclePaint, AnyLayout } from 'mapbox-gl'
import { Source, Layer } from 'react-map-gl'

import { LayerPropsNonBGlayer } from './types'
import { mbStyleTileConfig } from './config'

// Ongoing fonts to check
// Tokpe Gola

type SourceAndLayerComponent = {
  symbLayers: LayerPropsNonBGlayer[]
  labelLayers: LayerPropsNonBGlayer[]
  activeLangSymbGroupId: string
  activeLangLabelId: string
}

const commonCirclePaint = {
  'circle-stroke-color': 'cyan',
  'circle-stroke-width': [
    'case',
    ['boolean', ['feature-state', 'selected'], false],
    3,
    0,
  ],
} as CirclePaint

// NOTE: it did not seem to work when using two different Styles with the same
// dataset unless waiting until there is something to put into <Source>.
export const LangMbSrcAndLayer: FC<SourceAndLayerComponent> = ({
  symbLayers,
  labelLayers,
  activeLangSymbGroupId,
  activeLangLabelId,
}) => {
  return (
    <Source
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore // promoteId is just not anywhere in the source...
      promoteId="ID"
      type="vector"
      // YO: careful here, it's overriding what's in the MB style JSON...
      url={`mapbox://${mbStyleTileConfig.tilesetId}`}
      id={mbStyleTileConfig.langSrcID}
    >
      {symbLayers.map((layer: LayerPropsNonBGlayer) => {
        let { paint, layout } = layer
        const isInActiveGroup =
          layer.metadata['mapbox:group'] === activeLangSymbGroupId

        // Hide if not in active symbology group
        layout = {
          ...layout,
          visibility: isInActiveGroup ? 'visible' : 'none',
        }

        // Set selected feature stroke for all layers of `circle` type
        if (layer.type === 'circle') {
          paint = { ...paint, ...commonCirclePaint }
        } else if (layer.type === 'symbol') {
          // TODO: change symbol size (???) for selected feat. Evidently cannot
          // set layout properties base on feature-state though, so maybe this:
          // https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setlayoutproperty
          // 0.5 good with 24x24 SVG if there is a background circle. Otherwise
          // a little smaller is better.
          layout = { ...layout, 'icon-size': 0.4 }
        }

        return (
          // TODO: some kind of transition/animation on switch
          <Layer
            key={layer.id}
            {...layer}
            // YO: careful here, it's overriding what's in the MB style JSON...
            source-layer={mbStyleTileConfig.layerId}
            layout={layout}
            paint={paint}
          />
        )
      })}
      {/* TODO: set "text-size" value based on zoom level */}
      {/* TODO: make expressions less redundant, AND make it config-driven so
      that the font stuff is not so tangled up in the MB config (totally
      separate file may be best) */}
      {labelLayers.map((layer: LayerPropsNonBGlayer) => {
        const isActiveLabel = layer.id === activeLangLabelId

        const layout: AnyLayout = {
          ...layer.layout,
          visibility: isActiveLabel ? 'visible' : 'none',
        }

        return (
          <Layer
            key={layer.id}
            {...layer}
            // YO: careful here, it's overriding what's in the MB style JSON...
            source-layer={mbStyleTileConfig.layerId}
            layout={layout}
          />
        )
      })}
    </Source>
  )
}
