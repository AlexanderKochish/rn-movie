export const uploadToCloudinary = async (imageUri: string) => {
  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "profile.jpg",
  } as any);

  formData.append("upload_preset", process.env.EXPO_PUBLIC_CLOUDINARY_PRESET!);
  formData.append("folder", "users/profile_photos");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error("Upload failed: " + JSON.stringify(data));
  }
};

// const takePhoto = async () => {
//     try {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync()
//       if (status !== 'granted') {
//         Alert.alert(
//           'Permission required',
//           'Please allow camera access to take a photo.'
//         )
//         return
//       }

//       const result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       })

//       if (!result.canceled) {
//         setIsUploading(true)
//         const imageUri = result.assets[0].uri
//         setAvatar(imageUri)
//         setChangesMade(true)
//         // Here you would upload the photo similar to pickImage
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to take photo. Please try again.')
//     } finally {
//       setIsUploading(false)
//     }
//   }
