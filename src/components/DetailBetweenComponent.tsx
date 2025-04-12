import { View, Text } from "react-native";
import React from "react";

interface Props {
  title: string;
  value: string;
}
const DetailBetweenComponent = ({ title, value }: Props) => {
  return (
    <View className="flex flex-row justify-between">
      <Text className="text-white text-xl">{title}</Text>
      <Text className="text-white text-xl font-bold">{value}</Text>
    </View>
  );
};

export default DetailBetweenComponent;
