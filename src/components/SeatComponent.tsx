import { Text, TouchableOpacity } from "react-native";
import React from "react";
interface props {
  isSelected: boolean;
  setIsSelected: () => void;
}
const SeatComponent = ({ isSelected = false, setIsSelected }: props) => {
  return (
    <TouchableOpacity
      className={
        !isSelected
          ? "p-2 bg-gray-400 rounded-md"
          : "p-2 bg-yellow-400 rounded-md"
      }
      onPress={() => setIsSelected()}
    >
      <Text>A1</Text>
    </TouchableOpacity>
  );
};

export default SeatComponent;
