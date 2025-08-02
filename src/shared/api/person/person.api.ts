import { PersonDetailsResponse } from '../../types/types'
import { fetchData } from '../tmdbClient'

export const getPersonDetailsById = (id: number) =>
  fetchData<PersonDetailsResponse>(`person/${id}`)
