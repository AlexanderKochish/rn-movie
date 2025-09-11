import { Alert, Linking } from "react-native";

export const openSupportEmail = async (subject: string = "MovieApp") => {
    const url = `mailto:shvepsolek@gmail.com?subject=${subject}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert("Error", "Unable to open email client.");
    }
};
