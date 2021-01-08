import { useQuery } from 'react-query'
import Airtable from 'airtable'

import { AIRTABLE_BASE, reactQueryDefaults } from 'components/config'
import {
  AirtableOptions,
  TonsOfFields,
  AirtableError,
  ReactQueryOptions,
} from './types'

const airtableQuery = async (tableName: string, options: AirtableOptions) => {
  const base = new Airtable().base(options?.baseID || AIRTABLE_BASE)

  // CRED: github.com/Airtable/airtable.js/issues/69#issuecomment-414394657
  return base(tableName).select(options).all()
}

export function useAirtable<TResult = TonsOfFields>(
  tableName: string,
  options: AirtableOptions,
  reactQueryOptions?: ReactQueryOptions
): {
  data: TResult[]
  error: AirtableError | null
  isLoading: boolean
} {
  const { data, isLoading, error } = useQuery<
    { fields: TResult }[],
    AirtableError
  >([tableName, options], airtableQuery, {
    ...reactQueryDefaults,
    ...reactQueryOptions,
  })

  return {
    error,
    data: data?.map((row) => row.fields) || [],
    isLoading,
  }
}

export const useIcon = (
  value: string,
  tableName = 'Country',
  imgField = 'src_image'
): string => {
  // TODO: handle errors
  // const { data, isLoading, error } = useAirtable(tableName, {
  const { data, isLoading } = useAirtable(tableName, {
    fields: [imgField],
    filterByFormula: `{name} = '${value}'`,
  })

  // TODO: deal w/TS
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (isLoading || !data || !data[0] || !data[0][imgField]) return ''

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return data[0][imgField][0].url
}