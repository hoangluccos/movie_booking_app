import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import SeatComponent from "../../components/SeatComponent";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const SeatScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const listSeats = Array(45).fill(0);
  const handleClickSeat = (indexSeat: number) => {
    const isExisted = selectedSeats.includes(indexSeat);
    isExisted
      ? setSelectedSeats(
          selectedSeats.filter((value) => {
            return value !== indexSeat;
          })
        )
      : setSelectedSeats([...selectedSeats, indexSeat]);
  };
  return (
    <View className="flex-1 p-5 bg-black">
      <View className="flex flex-row justify-center p-5 bg-black ">
        <TouchableOpacity
          className="absolute top-4 left-2"
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Select Seats</Text>
      </View>
      <View className="flex">
        <Image
          className="w-full h-[90]"
          source={require("../../../assets/images/screen_theater.jpg")}
          resizeMode="contain"
        />
      </View>
      {/*list seats*/}
      <View className="flex flex-row flex-wrap gap-x-2 gap-y-2">
        {listSeats.map((_, index) => (
          <SeatComponent
            key={index}
            isSelected={selectedSeats.includes(index)}
            setIsSelected={() => handleClickSeat(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default SeatScreen;
