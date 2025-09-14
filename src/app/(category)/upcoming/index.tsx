import CategoryPage from '@/src/features/movie/components/CategoryPage/CategoryPage'
import { useHomeMovies } from '@/src/features/movie/hooks/useHomeMovies'
import Header from '@/src/shared/components/Header/Header'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import React from 'react'

const UpcomingMoviesScreen = () => {
  const { upcoming, isLoading, isRefetching, refetch } = useHomeMovies()

  if (isLoading) {
    return <Preloader />
  }

  return (
    <CategoryPage
      header={<Header goBack title="Comming Soon" subTitle="Upcoming films" />}
      category={upcoming}
      refetch={refetch.upcoming}
      isRefetching={isRefetching}
    />
  )
}

export default UpcomingMoviesScreen
