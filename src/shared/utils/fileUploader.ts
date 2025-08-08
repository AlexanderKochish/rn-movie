export const uploadToCloudinary = async (imageUri: string) => {
  const formData = new FormData()

  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'profile.jpg',
  } as any)

  formData.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_PRESET!)
  formData.append('folder', 'users/profile_photos')

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  const data = await response.json()

  if (data.secure_url) {
    return data.secure_url
  } else {
    throw new Error('Upload failed: ' + JSON.stringify(data))
  }
}
