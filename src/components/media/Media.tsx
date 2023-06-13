import React, { FC, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { FiVideo, FiShare } from 'react-icons/fi'
import { AiOutlineSound } from 'react-icons/ai'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { FaMapMarkedAlt } from 'react-icons/fa'

import { ShareButtons, ShareButtonsWrap } from 'components/generic'
import { routes } from 'components/config/api'
import {
  UI_AUDIO,
  UI_DE_SELECT,
  UI_LISTEN_TO_AUDIO,
  UI_VIDEO,
  UI_VIEW_IN_MAP,
  UI_WATCH_VIDEO,
} from 'components/config'
import { MediaListItemProps, MediaProps } from './types'
import { MediaModal } from './MediaModal'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      listStyle: 'none',
      margin: 0,
      marginBottom: '0.25rem',
      padding: 0,
      '& li + li': {
        marginLeft: '0.5rem',
      },
    },
    mediaLink: {
      alignItems: 'center',
      display: 'flex',
      fontSize: '0.85rem',
      '&.bold': {
        fontWeight: 'bold',
      },
      '& svg': {
        marginRight: '0.25rem',
      },
    },
  })
)

const MediaListItem: FC<MediaListItemProps> = (props) => {
  const { label, icon, handleClick, disabled, bold, variant = 'text' } = props
  const classes = useStyles({})
  let title = ''

  if (label === 'Audio') {
    title = UI_LISTEN_TO_AUDIO
  } else if (label === 'Video') {
    title = UI_WATCH_VIDEO
  }

  return (
    <li>
      <Button
        size="small"
        color="secondary"
        variant={variant}
        className={classes.mediaLink + (bold ? ' bold' : '')}
        disabled={disabled}
        title={disabled ? '' : title}
        onClick={(e: React.MouseEvent) => handleClick()}
      >
        {icon}
        {label}
      </Button>
    </li>
  )
}

export const Media: FC<MediaProps> = (props) => {
  const { data, omitClear, shareNoun = 'community' } = props
  const history = useHistory()
  const [mediaUrl, setMediaUrl] = useState<string>()
  const isTable: { params: { id: string } } | null = useRouteMatch(
    routes.dataDetail
  )
  const [showShareBtns, setShowShareBtns] = useState<boolean>(false)
  const classes = useStyles({ showShareBtns })
  const { Language, Video, Audio, Description, name } = data
  const shareSrcAndTitle = `${Language || name} - Languages of Berlin Map`
  // archive.org `embed` format:
  // 'https://archive.org/embed/ela_kabardian_comparative?playlist=1'

  return (
    <>
      {mediaUrl && (
        <MediaModal url={mediaUrl} closeModal={() => setMediaUrl('')} />
      )}
      <ul className={classes.root}>
        <MediaListItem
          bold={Video !== undefined}
          disabled={!Video}
          icon={<FiVideo />}
          label={UI_VIDEO}
          type="Video"
          handleClick={() => setMediaUrl(Video)}
        />
        <MediaListItem
          bold={Audio !== undefined}
          disabled={!Audio}
          icon={<AiOutlineSound />}
          label={UI_AUDIO}
          type="Audio"
          handleClick={() => setMediaUrl(Audio)}
        />
        {/* TODO: use Switch + Route for this, e.g. /Data/:id */}
        {!omitClear &&
          ((!isTable && (
            <MediaListItem
              label={UI_DE_SELECT}
              icon={<IoIosCloseCircleOutline />}
              type="clear"
              handleClick={() => history.push('/karte/Explore/Language/none')}
            />
          )) || (
            <MediaListItem
              label={UI_VIEW_IN_MAP}
              icon={<FaMapMarkedAlt />}
              type="view"
              handleClick={() =>
                history.push(
                  `/karte/Explore/Language/${Language || name}/${
                    isTable?.params?.id
                  }`
                )
              }
            />
          ))}
        <MediaListItem
          {...{ label: 'Share', icon: <FiShare />, type: 'share' }}
          handleClick={() => setShowShareBtns(!showShareBtns)}
        />
      </ul>

      <ShareButtonsWrap
        showShareBtns={showShareBtns}
        shareText={
          <>
            <em>{Language || name}</em> {shareNoun}
          </>
        }
      >
        <ShareButtons
          spacing={2}
          source={shareSrcAndTitle}
          summary={Description} // CAREFUL, this will be lang Descrip!
          title={shareSrcAndTitle}
          url={window.location.href}
        />
      </ShareButtonsWrap>
    </>
  )
}
