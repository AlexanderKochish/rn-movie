import { ReactNode } from 'react'
import { SearchContext, SearchContextType } from './SearchContext'
type Props = {
  children: ReactNode
  value: SearchContextType
}
const SearchProvider = ({ children, value }: Props) => {
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

export default SearchProvider
