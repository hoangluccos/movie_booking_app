import { View, Text, Image } from "react-native";
import React from "react";

const ActorComponent = () => {
  return (
    <View className="bg-gray-700 w-[110] h-[50] rounded-[10] flex flex-row items-center gap-2">
      <View className="flex flex-row items-center justify-center gap-1 mx-2">
        <Image
          source={require("../../assets/images/movie_sample.jpg")}
          className="w-[40] h-[40] rounded-[50]"
        />
        <View className="flex flex-col">
          <Text className="font-bold text-white">Anthony</Text>
          <Text className="text-gray text-white">Vietnam</Text>
        </View>
      </View>
    </View>
  );
};

export default ActorComponent;
