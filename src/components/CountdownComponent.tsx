import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  setIsTimeout: (value: boolean) => void;
  cancelSelectSeat: () => void;
}

const CountDownComponent = ({ setIsTimeout, cancelSelectSeat }: Props) => {
  const [countDown, setCountdown] = useState(30);

  useEffect(() => {
    if (countDown <= 0) {
      setIsTimeout(true);
      return;
    }

    const timer = setTimeout(() => setCountdown(countDown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countDown]);

  const minutes = Math.floor(countDown / 60);
  const seconds = countDown % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <View className="w-full flex flex-row">
      <View className="bg-[#f3ea28] rounded-xl border border-black w-3/4 h-[60px] justify-center items-center">
        <Text className="text-black font-bold">Thời gian giữ ghế còn lại</Text>
        <Text className="text-black font-bold">{formattedTime}</Text>
      </View>
      <View className="w-1/4">
        <TouchableOpacity
          onPress={() => cancelSelectSeat()}
          className="w-full flex flex-row justify-center items-center"
        >
          <MaterialIcons
            className="mt-2"
            name="cancel"
            size={40}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CountDownComponent;
