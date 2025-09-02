import React from 'react'

import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useMovieDetails } from '../../hooks/useMovieDetails'
import { useMovieId } from '../../hooks/useMovieId'

const MovieDetails = () => {
  const movieId = useMovieId()
  const { data: movie } = useMovieDetails(movieId)
  // const producer = useMemo(
  //   () => credits?.crew.find((item) => item.job === 'Producer'),
  //   [credits]
  // )
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
        <DetailItem label="Status" value={movie.status} />
        <DetailItem
          label="Release Date"
          value={new Date(movie.release_date).toLocaleDateString()}
        />
        <DetailItem
          label="Budget"
          value={movie.budget > 0 ? formatCurrency(movie.budget) : 'N/A'}
        />
        <DetailItem
          label="Revenue"
          value={movie.revenue > 0 ? formatCurrency(movie.revenue) : 'N/A'}
        />

        {movie.production_countries &&
          movie.production_countries.length > 0 && (
            <DetailItem
              label="Countries"
              value={movie.production_countries.map((c) => c.name).join(', ')}
            />
          )}

        {movie.spoken_languages && movie.spoken_languages.length > 0 && (
          <DetailItem
            label="Languages"
            value={movie.spoken_languages.map((l) => l.english_name).join(', ')}
          />
        )}
      </View>

      {movie.production_companies && movie.production_companies.length > 0 && (
        <View style={styles.companiesSection}>
          <Text style={styles.sectionTitle}>Production Companies</Text>
          <View style={styles.companies}>
            {movie.production_companies.map((company) => (
              <View key={company.name} style={styles.company}>
                <Text style={styles.companyName}>{company.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Animated.View>
  )
}

export default MovieDetails

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  tabContent: {
    marginBottom: 20,
  },
  detailsGrid: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  detailLabel: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },

  companiesSection: {
    marginTop: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  companies: {
    gap: 8,
  },
  company: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  companyName: {
    color: '#fff',
    fontSize: 14,
  },
})
