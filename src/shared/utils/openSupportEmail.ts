import { Alert, Linking } from "react-native";

export async function openSupportEmail(subject: string = "Watcher") {
    const email = "shvepsolek@gmail.com";
    const encodedSubject = encodeURIComponent(subject);
    const url = `mailto:${email}?subject=${encodedSubject}`;

    try {
        const supported = await Linking.canOpenURL(url);
        if (!supported) {
            await Linking.openURL(url);
            return;
        }
        await Linking.openURL(url);
    } catch (err) {
        console.error("openSupportEmail error:", err);
        Alert.alert("Error", "Unable to open email client.");
    }
}
