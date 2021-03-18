import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import {
  LayerSymbSelect,
  LayerLabelSelect,
  Legend,
  LangPointsToggle,
} from 'components/legend'
import { useSymbAndLabelState } from 'components/context'
import { WorldRegionMap } from './WorldRegionMap'
import { useLegendConfig } from './hooks'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1rem 0',
      padding: '1rem 0.75rem',
    },
    panelSectionHeading: {
      color: theme.palette.text.secondary,
      fontSize: '1rem',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
    },
    legendCtrls: {
      alignItems: 'center',
      display: 'flex',
      marginBottom: '0.5rem',
      '& > * + *': {
        marginLeft: '1rem',
      },
    },
    // Looks PERFECT on all breakpoints for World Region
    groupedLegend: {
      display: 'grid',
      marginTop: '0.75rem',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: 4,
      // This doesn't affect Size/Status
      gridTemplateAreas: `
          "reg reg"
          "reg reg"
          "aus aus"
          `,
      // Aus/NZ takes up more space
      '& > :last-child': {
        gridArea: 'aus',
      },
      [theme.breakpoints.only('sm')]: {
        gridTemplateColumns:
          'repeat(4, [col-start] minmax(100px, 1fr) [col-end])',
      },
    },
  })
)

const PanelSectionHeading: FC = (props) => {
  const { children } = props
  const classes = useStyles()

  return (
    <Typography className={classes.panelSectionHeading} component="h3">
      {children}
    </Typography>
  )
}

export const LegendPanel: FC = () => {
  const { activeSymbGroupID, hideLangPoints } = useSymbAndLabelState()
  const classes = useStyles()
  const {
    error,
    data,
    isLoading,
    legendHeading,
    routeable,
    legendSummary,
    sourceCredits,
  } = useLegendConfig(activeSymbGroupID)

  if (error)
    return (
      <p>Something went wrong setting up the {activeSymbGroupID} legend.</p>
    )

  return (
    <>
      <PanelSectionHeading>Map display options & legend</PanelSectionHeading>
      <div className={classes.legendCtrls}>
        <LayerSymbSelect />
        <LayerLabelSelect />
      </div>
      <LangPointsToggle checked={hideLangPoints} />
      {isLoading && <p>Loading legend info...</p>}
      {!isLoading && (
        <div className={classes.groupedLegend}>
          {data.map((item) => (
            <Legend
              key={item.groupName}
              routeName={routeable ? activeSymbGroupID : undefined}
              groupName={legendHeading || item.groupName}
              legendSummary={legendSummary}
              sourceCredits={sourceCredits}
              items={item.items}
            />
          ))}
        </div>
      )}
      {activeSymbGroupID === 'World Region' && <WorldRegionMap />}
    </>
  )
}
