import Toast from "react-native-toast-message";

export const showToast = (typeToast: string, message: string) => {
  Toast.show({
    type: typeToast,
    text1: message,
  });
};
