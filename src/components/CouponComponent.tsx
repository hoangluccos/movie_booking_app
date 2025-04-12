import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  image: string;
  title: string;
  expireTime: string;
  discount: number;
  minValue: number;
  isSelected: boolean;
  id: string;
  handleSelect: () => void;
}
const CouponComponent = ({
  image,
  title,
  expireTime,
  discount,
  minValue,
  handleSelect,
  isSelected = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={handleSelect}
      className={` my-1 p-3 border-b border-gray-200 flex-row items-center rounded-lg ${
        isSelected ? "bg-gray-400" : ""
      }`}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: 50,
          height: 50,
          marginRight: 10,
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
      <View>
        <Text className="font-bold">{title}</Text>
        <Text className="text-sm">Hết hạn: {expireTime}</Text>
        <Text className="text-sm">Giảm: {discount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CouponComponent;
