import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const SetCoupon = () => {
  return (
    <View className="flex flex-row bg-gray-600 h-auto rounded-md mt-3 items-center">
      <View className="flex flex-1 flex-row px-5 items-center gap-x-3">
        <FontAwesome name="flickr" size={20} color={"white"} />
        <TextInput
          placeholderTextColor={"gray"}
          className="text-white font-bold"
          placeholder="discount code"
        />
      </View>
      <TouchableOpacity className="bg-yellow-500 w-[130] h-full flex flex-row justify-center items-center rounded-lg">
        <Text className="font-bold">Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetCoupon;
