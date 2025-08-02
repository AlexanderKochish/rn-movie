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
  const { control, handleSubmit, isPending, isValidValue } = useReview(+movieId)
  const { theme } = useTheme()
  return (
    <View>
      <ControlledTextInput
        control={control}
        name="review"
        multiline
        style={[styles.primary, { backgroundColor: Colors[theme].input }]}
        numberOfLines={5}
        placeholder="What did you think about this movie?"
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
        style={[styles.btn, { backgroundColor: BaseColors.orangeLight }]}
        disabled={isValidValue || isPending}
        contentStyle={{
          height: 38,
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
  btn: {
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
})
