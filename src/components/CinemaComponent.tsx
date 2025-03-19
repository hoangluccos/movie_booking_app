import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

interface props {
  isSelected: boolean;
  setSelected: (value: any) => void;
  theater: { name: string; location: string };
  date: string;
}
const CinemaComponent = ({ isSelected, setSelected, theater, date }: props) => {
  return (
    <TouchableOpacity onPress={setSelected}>
      <View
        className={
          !isSelected
            ? "border border-yellow-100 p-3 rounded-md my-2"
            : "border bg-[#261D08] border-yellow-400 p-3 rounded-md my-2"
        }
      >
        <Text className="text-white text-xl font-bold">{theater.name}</Text>
        <View className="flex flex-row">
          <Text className="text-white">{theater.location}</Text>
          <Text className="text-white">- {date}</Text>
        </View>
        <View className="absolute top-6 right-3">
          <FontAwesome5 name="film" size={20} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CinemaComponent;
