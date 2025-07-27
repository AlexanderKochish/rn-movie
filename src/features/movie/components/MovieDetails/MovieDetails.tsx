import React, { useMemo } from 'react'
import { useCredits } from '../../hooks/useCredits'

import { MovieDetailsType } from '@/src/shared/types/types'
import { useMovieId } from '../../hooks/useMovieId'
import MovieDetailsDescription from '../MovieDetailsDescription/MovieDetailsDescription'
import MovieDetailsTitle from '../MovieDetailsTitle/MovieDetailsTitle'

type Props = {
  data: MovieDetailsType | undefined
}

const MovieDetails = ({ data }: Props) => {
  const movieId = useMovieId()
  const { credits } = useCredits(movieId)
  const producer = useMemo(
    () => credits?.crew.find((item) => item.job === 'Producer'),
    [credits]
  )

  return (
    <>
      <MovieDetailsTitle data={data} movieId={movieId} />
      <MovieDetailsDescription
        overview={data?.overview}
        producerName={producer?.name}
      />
    </>
  )
}

export default MovieDetails
