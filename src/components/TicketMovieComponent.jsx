import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
const TicketMovieComponent = () => {
  return (
    <TouchableOpacity>
      <View
        className="flex-row w-full h-40 rounded-[20]"
        style={{ backgroundColor: "#1C1C1C" }}
      >
        <View className="h-full w-1/3 rounded-l-[20]">
          <Image
            source={require("../../assets/images/movie_sample.jpg")}
            className="w-full h-full rounded-l-[20]"
          />
        </View>
        <View className="flex-1 rounded-r-[20] p-3 ">
          <Text className="text-2xl my-2 font-bold text-white">
            Avengers:Infinity War
          </Text>
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5
              name="clock"
              size={18}
              color="white"
              className="rounded-lg"
            />
            <Text className="text-xl mb-1 text-white">16.12.2025</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5
              name="location-arrow"
              size={18}
              color="white"
              className="rounded-lg"
            />
            <Text className="text-xl mb-1 text-white">Vincom Ocean Park</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TicketMovieComponent;
