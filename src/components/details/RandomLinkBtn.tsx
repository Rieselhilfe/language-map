import React, { FC, useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { FaRandom } from 'react-icons/fa'

import { GlobalContext } from 'components/context'
import {
  UI_LOADING_LANGUAGES,
  UI_NO_COMMUNITIES_AVAILABLE,
  UI_RANDOM_LINK_BUTTON_TEXT,
} from 'components/config'

export const RandomLinkBtn: FC = () => {
  const { state } = useContext(GlobalContext)
  const { langFeatures, langFeatsLenCache } = state

  let randoFeatID
  let btnText
  let randoLang

  if (langFeatures.length) {
    const randoFeatIndex = Math.floor(Math.random() * (langFeatures.length - 1))

    randoFeatID = langFeatures[randoFeatIndex].id
    randoLang = langFeatures[randoFeatIndex].Language
  }

  if (!langFeatsLenCache) btnText = UI_LOADING_LANGUAGES
  else if (!langFeatures.length) btnText = UI_NO_COMMUNITIES_AVAILABLE
  else btnText = UI_RANDOM_LINK_BUTTON_TEXT

  return (
    <Button
      variant="contained"
      color="secondary"
      component={RouterLink}
      size="small"
      disabled={!langFeatsLenCache || !langFeatures.length}
      startIcon={<FaRandom />}
      to={
        randoLang ? `/karte/Explore/Language/${randoLang}/${randoFeatID}` : '/'
      }
    >
      {btnText}
    </Button>
  )
}
