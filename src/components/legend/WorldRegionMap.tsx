import React, { FC, useState } from 'react'
import { Link } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { ToggleableSection, Explanation } from 'components/generic'
import {
  UI_CLICK_ANY_WORLD_REGION,
  UI_HIDE,
  UI_SHOW,
  UI_WORLD_MAP,
  UI_WORLD_MAP_TEXT_1,
  UI_WORLD_MAP_TEXT_2,
  UI_WORLD_MAP_TEXT_3,
  UI_WORLD_MAP_TEXT_4,
  UI_WORLD_MAP_TEXT_UN_GEOSCHEME,
} from 'components/config'

const WORLD_MAP_IMG_SRC =
  'https://i1.wp.com/languagemapping.org/wp-content/uploads/2020/08/worldLangsMap.jpg?w=884&ssl=1'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 0,
      '& p': {
        marginTop: 0,
      },
    },
    worldMap: {
      maxWidth: '100%',
      marginTop: theme.spacing(1),
    },
  })
)

export const WorldRegionMap: FC = () => {
  const classes = useStyles()
  const [showWorldMap, setShowWorldMap] = useState<boolean>(false)

  const WorldMapToggle = (
    <Link
      href="#"
      onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        setShowWorldMap(!showWorldMap)
      }}
    >
      {UI_WORLD_MAP} {showWorldMap ? UI_HIDE : UI_SHOW}
    </Link>
  )

  const WorldMapTip = (
    <p>
      {UI_CLICK_ANY_WORLD_REGION} {WorldMapToggle}
    </p>
  )

  return (
    <Explanation className={classes.root}>
      {WorldMapTip}
      <ToggleableSection show={showWorldMap}>
        {UI_WORLD_MAP_TEXT_1}{' '}
        <a
          href="https://de.wikipedia.org/wiki/Liste_der_geographischen_Regionen_nach_den_Vereinten_Nationen"
          target="_blank"
          rel="noopener noreferrer"
          title="UN geoscheme wikipedia page"
        >
          {UI_WORLD_MAP_TEXT_UN_GEOSCHEME}
        </a>
        . {UI_WORLD_MAP_TEXT_2}{' '}
        <a
          href={WORLD_MAP_IMG_SRC}
          target="_blank"
          rel="noopener noreferrer"
          title="World regions map image"
        >
          {UI_WORLD_MAP_TEXT_3}
        </a>{' '}
        {UI_WORLD_MAP_TEXT_4}
        <img
          src={WORLD_MAP_IMG_SRC}
          alt="Global regions based on UN geoscheme"
          className={classes.worldMap}
        />
      </ToggleableSection>
    </Explanation>
  )
}
