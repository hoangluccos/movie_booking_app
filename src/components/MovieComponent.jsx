import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const MovieComponent = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <View
      className="flex bg-gray-400 h-auto rounded-lg"
      style={{ width: width * 0.4 }}
    >
      <View className="w-full h-[200]">
        <Image
          source={require("../../assets/images/movie_sample.jpg")}
          className="w-full h-full rounded-t-lg"
          //     object-cover-contain khong hieu dung vs Image
          resizeMode="cover"
        />
      </View>
      <View className="p-2 flex-col gap-1">
        <Text className="text-xl font-bold">Avengers:Infinity War</Text>
        <View className="flex flex-row items-center gap-2">
          <FontAwesome5
            name="star"
            size={16}
            color="yellow"
            className="rounded-lg"
          />
          <Text>4.0</Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <FontAwesome5
            name="clock"
            size={16}
            color="yellow"
            className="rounded-lg"
          />
          <Text>2hour 5min</Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <FontAwesome5
            name="film"
            size={16}
            color="yellow"
            className="rounded-lg"
          />
          <Text>Action, Science</Text>
        </View>
      </View>
    </View>
  );
};

export default MovieComponent;
