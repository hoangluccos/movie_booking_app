import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ToggleComponent = ({ isSelectFirst, setIsSelectFirst }) => {
  return (
    <View className="flex flex-row w-full h-[50] bg-gray-400 rounded-[10] my-5">
      <TouchableOpacity
        className="flex-1"
        onPress={() => setIsSelectFirst(!isSelectFirst)}
      >
        <View
          className="flex-1  rounded-l-[10] items-center justify-center"
          style={
            isSelectFirst && { borderRadius: 10, backgroundColor: "#EAB308" }
          }
        >
          <Text className="font-bold text-xl">Now playing</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1"
        onPress={() => setIsSelectFirst(!isSelectFirst)}
      >
        <View
          className="flex-1 rounded-r-[10] items-center justify-center"
          style={
            !isSelectFirst && { borderRadius: 10, backgroundColor: "#EAB308" }
          }
        >
          <Text className="font-bold text-xl">Coming soon</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleComponent;
