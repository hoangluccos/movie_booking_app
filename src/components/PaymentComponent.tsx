import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  image: string;
  nameMethod: string;
  isSelect: boolean;
  onSelect: () => void;
}
const PaymentComponent = ({ image, nameMethod, isSelect, onSelect }: Props) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      className={`flex flex-row bg-[#1C1C1C] w-full h-[80] rounded-lg my-2 ${
        isSelect ? "bg-yellow-500" : ""
      }`}
    >
      <View className="flex-1 flex flex-row items-center gap-x-5 px-2">
        <View className="w-12 h-12">
          <Image
            className="rounded-lg w-full h-full object-cover"
            source={require("../../assets/images/vnpay.png")}
          />
        </View>
        <Text className="text-white font-bold text-xl">{nameMethod}</Text>
      </View>
      <FontAwesome
        className="relative right-3 top-8"
        name="chevron-right"
        size={24}
        color={"white"}
      />
    </TouchableOpacity>
  );
};

export default PaymentComponent;
