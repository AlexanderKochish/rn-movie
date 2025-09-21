import { uploadToCloudinary } from "@/src/shared/utils/fileUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Resolver, useForm } from "react-hook-form";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../auth/hooks/useAuth";
import { profileRepository } from "../api/profile.repository";
import { accountSchema, accountSchemaType } from "../lib/zod/account.schema";
import { ProfileUpdate } from "../types/types";

export const useAccountForm = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<
    accountSchemaType
  >({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      avatar: "",
    },
    resolver: zodResolver(accountSchema) as Resolver<accountSchemaType>,
  });

  const avatar = watch("avatar");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setValue("avatar", result.assets[0].uri);
    }
  };

  const mutation = useMutation({
    mutationFn: async (formData: accountSchemaType) => {
      if (!user) throw new Error("User not found");

      const imageUrl = formData.avatar
        ? await uploadToCloudinary(formData.avatar)
        : null;

      const updateData: ProfileUpdate = {};
      if (imageUrl) updateData.avatar_url = imageUrl;
      if (formData.username) updateData.username = formData.username;
      if (formData.fullName) updateData.full_name = formData.fullName;
      if (formData.age) updateData.age = Number(formData.age);

      return await profileRepository.updateProfile(user?.id, updateData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });

      reset({
        avatar: data.avatar_url ?? "",
        username: data.username ?? "",
        fullName: data.full_name ?? "",
        age: Number(data.age) ?? "",
      });

      Toast.show({
        type: "customSuccess",
        text1: "Profile updated successfully",
      });
    },
    onError: (error: any) => {
      Alert.alert("Error", error.message ?? "Failed to update profile");
    },
  });

  return {
    control,
    handleSubmit: handleSubmit((formData) => mutation.mutate(formData)),
    handlePickImage,
    avatar,
    isLoading: mutation.isPending,
    isDirty,
    isSuccess: mutation.isSuccess,
  };
};
