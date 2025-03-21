import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  image: string;
  nameMethod: string;
}
const PaymentComponent = ({ image, nameMethod }: Props) => {
  return (
    <TouchableOpacity className="flex flex-row bg-[#1C1C1C] w-full h-[80] rounded-lg my-2">
      <View className="flex-1 flex flex-row items-center gap-x-5">
        <Image
          className="rounded-lg "
          source={require("../../assets/images/payment_method.jpg")}
        />
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
