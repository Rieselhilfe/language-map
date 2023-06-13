import React, { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Explanation } from 'components/generic'
import { routes } from 'components/config/api'
import { UI_ADDLLANGUAGES } from 'components/config/uiStrings'

export const AddlLanguages: FC<{ data: string[] }> = (props) => {
  const { data = [] } = props

  return (
    <>
      <Explanation>{UI_ADDLLANGUAGES}</Explanation>
      <ul style={{ marginTop: 0 }}>
        {data.sort().map((langName) => (
          <li key={langName}>
            <RouterLink to={`${routes.explore}/Language/${langName}`}>
              {langName}
            </RouterLink>
          </li>
        ))}
      </ul>
    </>
  )
}
