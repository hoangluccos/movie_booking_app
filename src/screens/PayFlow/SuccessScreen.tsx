import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  RouteProp,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type"; // Điều chỉnh đường dẫn nếu cần

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SuccessScreen"
>;
type SuccessScreenRouteProp = RouteProp<RootStackParamList, "SuccessScreen">;

const SuccessScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SuccessScreenRouteProp>();
  const { amount, orderInfo, transactionNo } = route.params || {};

  return (
    <View className="flex-1 bg-black justify-center items-center px-5">
      <Text className="text-green-500 text-3xl font-bold mb-4">
        Thanh toán thành công!
      </Text>
      <View className="text-center text-white mb-8">
        <Text className="mb-2 font-bold text-white">
          Mã giao dịch: {transactionNo || "N/A"}
        </Text>
        <Text className="mb-2 font-bold text-white">
          Số tiền: {amount !== undefined ? amount.toLocaleString() : "0"} VNĐ
        </Text>
        <Text className="mb-2 font-bold text-white">
          {orderInfo || "Không có thông tin"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="bg-yellow-400 py-3 px-6 rounded-full"
      >
        <Text className="text-black font-bold text-lg">Quay về trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;
