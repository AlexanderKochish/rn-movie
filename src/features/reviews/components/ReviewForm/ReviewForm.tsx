import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useReview } from '../../hooks/useReview'

type Props = {
  movieId: number
}

const ReviewForm = ({ movieId }: Props) => {
  const { control, handleSubmit, isPending } = useReview(+movieId)
  const { theme } = useTheme()
  return (
    <View>
      <ControlledTextInput
        control={control}
        name="review"
        multiline
        style={[styles.primary, { backgroundColor: Colors[theme].input }]}
        numberOfLines={5}
        placeholder="Type your review here"
        mode="outlined"
        textAlignVertical="top"
        textColor={Colors.dark.text}
        contentStyle={{
          textAlignVertical: 'top',
        }}
        theme={{
          colors: {
            text: Colors[theme].text,
            placeholder: BaseColors.lightGray,
          },
        }}
      />
      <Button
        mode="outlined"
        onPress={handleSubmit}
        style={{
          backgroundColor: Colors[theme].btn,
          borderRadius: 10,
          width: 150,
          alignSelf: 'center',
          marginBottom: 20,
        }}
        disabled={isPending}
        contentStyle={{
          height: 38,
          justifyContent: 'center',
        }}
        textColor={Colors[theme].text}
      >
        Send Review
      </Button>
    </View>
  )
}

export default ReviewForm

const styles = StyleSheet.create({
  primary: {
    height: 80,
    marginVertical: 8,
  },
})
