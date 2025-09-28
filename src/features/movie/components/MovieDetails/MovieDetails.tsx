import React from 'react'

import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useMovieDetails } from '../../hooks/useMovieDetails'
import { useMovieId } from '../../hooks/useMovieId'
import MovieDetailItem from '../MovieDetailItem/MovieDetailItem'

const MovieDetails = () => {
  const { theme } = useTheme()
  const movieId = useMovieId()
  const { data: movie } = useMovieDetails(movieId)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }
  if (!movie) return

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.tabContent}>
      <View style={styles.detailsGrid}>
        <MovieDetailItem label="Status" value={movie.status} />
        <MovieDetailItem
          label="Release Date"
          value={new Date(movie.release_date).toLocaleDateString()}
        />
        <MovieDetailItem
          label="Budget"
          value={movie.budget > 0 ? formatCurrency(movie.budget) : 'N/A'}
        />
        <MovieDetailItem
          label="Revenue"
          value={movie.revenue > 0 ? formatCurrency(movie.revenue) : 'N/A'}
        />

        {movie.production_countries &&
          movie.production_countries.length > 0 && (
            <MovieDetailItem
              label="Countries"
              value={movie.production_countries.map((c) => c.name).join(', ')}
            />
          )}

        {movie.spoken_languages && movie.spoken_languages.length > 0 && (
          <MovieDetailItem
            label="Languages"
            value={movie.spoken_languages.map((l) => l.english_name).join(', ')}
          />
        )}
      </View>

      {movie.production_companies && movie.production_companies.length > 0 && (
        <View style={styles.companiesSection}>
          <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
            Production Companies
          </Text>
          <View style={styles.companies}>
            {movie.production_companies.map((company) => (
              <View
                key={company.name}
                style={[
                  styles.company,
                  {
                    backgroundColor: Colors[theme].card,
                    borderColor: Colors[theme].border,
                  },
                ]}
              >
                <Text
                  style={[styles.companyName, { color: Colors[theme].text }]}
                >
                  {company.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Animated.View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({
  tabContent: {
    marginBottom: 20,
  },
  detailsGrid: {
    gap: 16,
  },
  companiesSection: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  companies: {
    gap: 8,
  },
  company: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  companyName: {
    fontSize: 14,
  },
})
