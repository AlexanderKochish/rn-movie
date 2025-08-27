import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const handleRegistrationError = (errorMessage: string) => {
    console.error("Push notification registration error:", errorMessage);
};
export const registerForPushNotificationsAsync = async () => {
    try {
        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        if (!Device.isDevice) {
            console.log("Running on emulator - push notifications disabled");
            return "EMULATOR_DEMO_TOKEN";
        }

        const { status: existingStatus } = await Notifications
            .getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            handleRegistrationError(
                "Permission not granted for push notifications!",
            );
            return null;
        }

        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;
        console.log("Expo projectId:", projectId);

        if (!projectId) {
            handleRegistrationError("Project ID not found");
            return null;
        }

        const pushTokenString = (
            await Notifications.getExpoPushTokenAsync({
                projectId,
            })
        ).data;

        console.log("Successfully obtained Expo push token");
        return pushTokenString;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error
            ? error.message
            : String(error);
        handleRegistrationError(errorMessage);
        return null;
    }
};
