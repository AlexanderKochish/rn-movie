import { supabase } from "@/src/shared/services/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSignOut = () => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    await AsyncStorage.clear();
  };

  return {
    signOut,
  };
};
