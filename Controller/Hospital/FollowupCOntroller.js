import { Linking, Alert } from "react-native";

//-------------------- send follow up email-------------------------
export const sendEmail = ({ to, subject, message }) => {
  const emailUrl = `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;

  Linking.canOpenURL(emailUrl)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(emailUrl);
      } else {
        Alert.alert("Error", "No email app found to send email.");
      }
    })
    .catch((err) => {
      console.error("Error while trying to open email app:", err);
      Alert.alert("Error", "Failed to open email app.");
    });
};
