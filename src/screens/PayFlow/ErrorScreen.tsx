// ErrorScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type"; // Giả định bạn có type này

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ErrorScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex-1 bg-black justify-center items-center px-5">
      <Text className="text-red-500 text-3xl font-bold mb-4">
        Thanh toán thất bại!
      </Text>
      <Text className="text-white text-lg text-center mb-8">
        Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
      </Text>
      <TouchableOpacity
        onPress={() => console.log("close")} // Quay lại màn hình thanh toán
        className="bg-yellow-400 py-3 px-6 rounded-full"
      >
        <Text className="text-black font-bold text-lg">Thử lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;
