import Toast from "react-native-toast-message";

//common toast message
export const showToast = ({
  message = "",
  description = "",
  position = "center",
  type = "success",
}) => {
  Toast.show({
    type: type,
    text1: message,
    text2: description,
    position: position,
    visibilityTime: 3000,
  });
};
