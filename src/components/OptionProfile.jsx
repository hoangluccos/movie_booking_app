import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const OptionProfile = ({ text, nameIcon }) => {
  return (
    <TouchableOpacity>
      <View className="w-full h-20 bg-yellow-600 flex flex-row items-center justify-between px-3 rounded-md">
        <View className="flex-row items-center gap-4">
          <FontAwesome5
            name={nameIcon}
            size={20}
            color="white"
            className="rounded-lg"
          />
          <Text className="font-bold text-white text-xl">{text}</Text>
        </View>
        <FontAwesome5
          name="greater-than"
          size={20}
          color="white"
          className="rounded-lg"
        />
      </View>
    </TouchableOpacity>
  );
};

export default OptionProfile;
