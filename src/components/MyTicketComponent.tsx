import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

interface MyTicketProps {
  nameMovie: string;
  image: string;
  duration: number;
  timeStart: string | number;
  Date: string;
}

const MyTicketComponent = ({
  nameMovie,
  image,
  duration,
  timeStart,
  Date,
}: MyTicketProps) => {
  return (
    <View className="h-auto flex-row gap-4">
      <Image
        source={{ uri: image }}
        className="w-[100] rounded-2xl"
        style={{ aspectRatio: 2 / 3 }}
        resizeMode="cover"
      />
      <View className="bg-gray-600 flex-1 rounded-r-2xl">
        <View className="flex-1 rounded-r-[20] p-3 ">
          <Text className="text-2xl my-2 font-bold text-white">
            {nameMovie}
          </Text>
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5
              name="clock"
              size={18}
              color="white"
              className="rounded-lg"
            />
            <Text className="text-xl mb-1 text-white">{duration}'</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5
              name="film"
              size={18}
              color="white"
              className="rounded-lg"
            />
            <Text className="text-xl mb-1 text-white">
              {Date}-{timeStart}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyTicketComponent;
