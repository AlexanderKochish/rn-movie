import CategoryPage from '@/src/features/movie/components/CategoryPage/CategoryPage'
import { useHomeMovies } from '@/src/features/movie/hooks/useHomeMovies'
import Header from '@/src/shared/components/Header/Header'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import React from 'react'

const PopularMoviesScreen = () => {
  const { popular, isLoading, isRefetching, refetch } = useHomeMovies()

  if (isLoading) {
    return <Preloader />
  }

  return (
    <CategoryPage
      category={popular}
      isRefetching={isRefetching}
      refetch={refetch.popular}
      header={
        <Header
          goBack
          title="Popular movies"
          subTitle="The most discussed films of this week"
        />
      }
    />
  )
}
export default PopularMoviesScreen
