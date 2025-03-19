import { Dimensions, Text, TouchableOpacity } from "react-native";
import React from "react";
interface props {
  isSelected: boolean;
  setIsSelected: () => void;
  positionSeat: string;
}
const SeatComponent = ({
  isSelected = false,
  setIsSelected,
  positionSeat,
}: props) => {
  const widthW = Dimensions.get("window").width;
  const heightW = Dimensions.get("window").height;
  return (
    <TouchableOpacity
      className={
        !isSelected
          ? "p-2 bg-gray-400 rounded-md flex items-center min-h-[35]"
          : "p-2 bg-yellow-400 rounded-md flex items-center min-h-[35]"
      }
      style={{ width: widthW * 0.15 }}
      onPress={() => setIsSelected()}
    >
      <Text>{positionSeat}</Text>
    </TouchableOpacity>
  );
};

export default SeatComponent;
