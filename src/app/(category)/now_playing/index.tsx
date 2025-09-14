import CategoryPage from '@/src/features/movie/components/CategoryPage/CategoryPage'
import { useHomeMovies } from '@/src/features/movie/hooks/useHomeMovies'
import Header from '@/src/shared/components/Header/Header'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import React from 'react'

const NowPlayingScreen = () => {
  const { topRated, isLoading, isRefetching, refetch } = useHomeMovies()
  if (isLoading) {
    return <Preloader />
  }
  return (
    <CategoryPage
      header={
        <Header
          goBack
          title="Now Playing"
          subTitle="Now playing the best films"
        />
      }
      category={topRated}
      isRefetching={isRefetching}
      refetch={refetch.topRated}
    />
  )
}

export default NowPlayingScreen
