import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/type";
import { TicketType } from "../data/Data";

// Định nghĩa kiểu cho navigation
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Props {
  nameMovie: string;
  time: string;
  place: string;
  image: string;
  ticket: TicketType;
}
const TicketMovieComponent = ({
  nameMovie,
  time,
  place,
  image,
  ticket,
}: Props) => {
  const navigation = useNavigation<NavigationProp>();

  const handleClickTicket = () => {
    console.log("Click ticket");
    navigation.navigate("TicketScreen", {
      ticket: ticket,
    });
  };
  return (
    <TouchableOpacity onPress={handleClickTicket}>
      <View
        className="flex-row w-full h-40 rounded-[20] mt-4"
        style={{ backgroundColor: "#1C1C1C" }}
      >
        <View className="h-full w-1/3 rounded-l-[20]">
          <Image
            // source={require("../../assets/images/movie_sample.jpg")}
            source={{ uri: image }}
            className="w-full h-full rounded-l-[20]"
          />
        </View>
        <View className="flex-1 rounded-r-[20] p-3 ">
          <Text className="text-2xl my-2 font-bold text-white">
            {nameMovie}
          </Text>
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5
              name="clock"
              size={18}
              color="white"
              className="rounded-lg"
            />
            <Text className="text-xl mb-1 text-white">{time}</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5
              name="location-arrow"
              size={18}
              color="white"
              className="rounded-lg"
            />
            <Text className="text-xl mb-1 text-white">{place}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TicketMovieComponent;
