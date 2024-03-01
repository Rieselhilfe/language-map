import React, { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import {
  routes,
  icons,
  UI_ABOUT,
  UI_CONTACT_FEEDBACK,
  UI_USER_MANUAL,
} from 'components/config'
import { UItextFromAirtable } from 'components/generic'
import { Settings } from './Settings'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      width: '100%',
      height: '100%',
      '& svg': {
        width: '1.5rem',
        height: '1.5rem',
      },
    },
    listItemIcon: {
      color: theme.palette.text.secondary,
      marginRight: '0.75rem',
      minWidth: 'auto', // override default
    },
    smallerText: {
      fontSize: '0.8rem',
    },
    divider: {
      margin: '1rem 0',
    },
  })
)

export const Nav: FC = () => {
  const classes = useStyles()
  const { listLink, listItemIcon, smallerText, divider } = classes

  return (
    <>
      <nav>
        <List>
          <ListItem button dense disableGutters>
            <Link
              underline="none"
              component={RouterLink}
              to={routes.about}
              className={listLink}
            >
              <ListItemIcon className={listItemIcon}>
                {icons.About}
              </ListItemIcon>
              <ListItemText
                classes={{ secondary: smallerText }}
                primary={UI_ABOUT}
                secondary={<UItextFromAirtable id="info-link--about" />}
              />
            </Link>
          </ListItem>
          <ListItem button dense disableGutters>
            <Link
              underline="none"
              component={RouterLink}
              to={routes.feedback}
              className={listLink}
            >
              <ListItemIcon className={listItemIcon}>
                {icons.Feedback}
              </ListItemIcon>
              <ListItemText
                classes={{ secondary: smallerText }}
                primary={UI_CONTACT_FEEDBACK}
                secondary={
                  <UItextFromAirtable id="info-link--contact-feedback" />
                }
              />
            </Link>
          </ListItem>
          <ListItem button dense disableGutters>
            <Link
              underline="none"
              href="https://languagemapping.org/wp-content/uploads/2021/03/Help-Video-Script.pdf"
              target="_blank"
              className={listLink}
            >
              <ListItemIcon className={listItemIcon}>
                {icons.UserManual}
              </ListItemIcon>
              <ListItemText
                classes={{ secondary: smallerText }}
                primary={UI_USER_MANUAL}
                secondary={<UItextFromAirtable id="info-link--user-manual" />}
              />
            </Link>
          </ListItem>
        </List>
        <Divider className={divider} />
      </nav>
      <Settings smallerTextClass={smallerText} />
    </>
  )
}

/**
<ListItem button dense disableGutters>
            <Link
              underline="none"
              component={RouterLink}
              to={routes.help}
              className={listLink}
            >
              <ListItemIcon className={listItemIcon}>{icons.Help}</ListItemIcon>
              <ListItemText
                classes={{ secondary: smallerText }}
                primary={UI_HELP}
                secondary={<UItextFromAirtable id="info-link--help" />}
              />
            </Link>
          </ListItem>
 */
