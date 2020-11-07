import React, { FC, useState } from 'react'
import { Link, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { FaGlobeAmericas } from 'react-icons/fa'

import { LayerSymbSelect, LayerLabelSelect, Legend } from 'components/legend'
import { ToggleableSection } from 'components'
import { GoInfo } from 'react-icons/go'
import { LegendSwatch } from './types'
import { WorldRegionMap } from './WorldRegionMap'

type LegendPanelComponent = {
  legendItems: LegendSwatch[]
  groupName: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '1.25em',
    },
    legendCtrls: {
      margin: '0.25em 0',
      display: 'flex',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: '1em',
      },
    },
    changeLegendLink: {
      alignItems: 'center',
      display: 'inline-flex',
      fontSize: '0.8em',
      '& svg': {
        marginRight: 4,
      },
    },
    legendTip: {
      color: theme.palette.text.secondary,
      fontSize: '0.65em',
      marginTop: '1.75em',
    },
  })
)

export const LegendPanel: FC<LegendPanelComponent> = (props) => {
  const { legendItems, groupName } = props
  const classes = useStyles()
  const [showWorldMap, setShowWorldMap] = useState<boolean>(false)

  const LegendTip = (
    <Typography className={`${classes.changeLegendLink} ${classes.legendTip}`}>
      <GoInfo />
      Click any of the items in the legend to view similar communities.
    </Typography>
  )

  return (
    <div className={classes.root}>
      <div className={classes.legendCtrls}>
        <LayerSymbSelect />
        <LayerLabelSelect />
      </div>
      {LegendTip}
      <Legend legendItems={legendItems} groupName={groupName} />
      <Link
        href="#"
        className={classes.changeLegendLink}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault()
          setShowWorldMap(!showWorldMap)
        }}
      >
        <FaGlobeAmericas />
        {showWorldMap ? 'Hide' : 'Show'} world map
      </Link>
      <ToggleableSection show={showWorldMap}>
        <WorldRegionMap />
      </ToggleableSection>
    </div>
  )
}
