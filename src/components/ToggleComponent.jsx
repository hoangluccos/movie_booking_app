import { View, Text } from "react-native";
import React from "react";

const ToggleComponent = () => {
  return (
    <View className="flex flex-row w-full h-[50] bg-yellow-400 rounded-[10] my-5">
      <View className="flex-1 bg-red-600 rounded-l-[10] items-center justify-center">
        <Text className="font-bold text-xl">Now playing</Text>
      </View>
      <View className="flex-1 rounded-r-[10] items-center justify-center">
        <Text className="font-bold text-xl">Coming soon</Text>
      </View>
    </View>
  );
};

export default ToggleComponent;
