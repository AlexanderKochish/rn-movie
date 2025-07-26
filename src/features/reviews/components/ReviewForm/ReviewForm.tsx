import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useReview } from '../../hooks/useReview'

type Props = {
  movieId: number
}

const ReviewForm = ({ movieId }: Props) => {
  const { control, handleSubmit, isPending } = useReview(+movieId)
  return (
    <View>
      <ControlledTextInput
        control={control}
        name="review"
        multiline
        style={styles.primary}
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
            text: Colors.dark.text,
            placeholder: '#999',
          },
        }}
      />
      <Button
        mode="outlined"
        onPress={handleSubmit}
        style={{
          backgroundColor: Colors.dark.btn,
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
        textColor={Colors.dark.text}
      >
        Send Review
      </Button>
    </View>
  )
}

export default ReviewForm

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.dark.input,
    height: 80,
    marginVertical: 8,
  },
})
