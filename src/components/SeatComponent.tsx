import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import React from "react";
interface props {
  isSelected: boolean | undefined;
  setIsSelected: () => void | undefined;
  positionSeat: string | undefined;
  status: number;
  isSample:
    | {
        id: boolean;
        colorSample: string;
        textSample: string;
      }
    | undefined;
}
const SeatComponent = ({
  isSelected = false,
  setIsSelected,
  positionSeat,
  status,
  isSample = { id: false, colorSample: "", textSample: "" },
}: props) => {
  const widthW = Dimensions.get("window").width;
  const heightW = Dimensions.get("window").height;
  if (isSample.id) {
    return (
      <View
        className={"p-2 rounded-md flex justify-center items-center "}
        style={{
          width: widthW * 0.15,
          height: heightW * 0.05,
          backgroundColor: isSample.colorSample,
        }}
      >
        <Text>{isSample.textSample}</Text>
      </View>
    );
  }
  return status === 1 || status === 2 ? (
    <View
      className={`p-2 rounded-md flex items-center min-h-[35] ${
        status === 1 ? "bg-red-500" : status === 2 ? "bg-blue-400" : ""
      }`}
      style={{ width: widthW * 0.15 }}
    >
      <Text>{positionSeat}</Text>
    </View>
  ) : (
    <TouchableOpacity
      className={`p-2 rounded-md flex items-center min-h-[35] ${
        isSelected ? "bg-green-500" : "bg-gray-400"
      }`}
      style={{ width: widthW * 0.15 }}
      onPress={() => setIsSelected()}
    >
      <Text>{positionSeat}</Text>
    </TouchableOpacity>
  );
};

export default SeatComponent;
