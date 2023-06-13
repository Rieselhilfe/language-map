import React, { FC } from 'react'

import { BasicExploreIntro } from 'components/explore'
import { LoadingIndicatorBar } from 'components/generic/modals'
import { UItextFromAirtable } from 'components/generic'
import { UI_COULD_NOT_LOAD, icons } from 'components/config'
import { CardListWrap } from './CardList'
import { CustomCard } from './CustomCard'
import { useAirtable } from './hooks'
import { AirtableSchemaQuery } from './types'

// The top-level "/Explore" route as a landing page index to explorable fields
export const Explore: FC = () => {
  const { data, error, isLoading } = useAirtable<AirtableSchemaQuery>(
    'Schema',
    {
      // Cheap check for Explore-ables:
      filterByFormula: '{exploreSortOrder} > 0',
      sort: [{ field: 'exploreSortOrder' }],
    }
  )

  return (
    <>
      <BasicExploreIntro
        introParagraph={<UItextFromAirtable id="explore-intro" />}
        noAppear={!isLoading}
      />
      {isLoading && <LoadingIndicatorBar omitText />}
      {error && UI_COULD_NOT_LOAD}
      <CardListWrap>
        {data.map(({ name, plural, definition }, i) => (
          <CustomCard
            key={name}
            icon={icons[name] || null}
            title={plural || ''} // TODO: ugh
            url={`/karte/Explore/${name}`}
            timeout={350 + i * 250}
            footer={definition}
          />
        ))}
      </CardListWrap>
    </>
  )
}
