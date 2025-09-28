import { StyleSheet } from "react-native";
import { Typography } from "./Typography";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    fontSize: Typography.title.fontSize,
    fontWeight: "700",
  },
  flex: {
    flex: 1,
  },
  introSection: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.2)",
  },
  introSectionError: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(109, 44, 44, 0.4)",
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(120, 43, 43, 0.58)",
  },
});
