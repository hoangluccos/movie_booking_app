import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import SeatComponent from "../../components/SeatComponent";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type";
import { getApi } from "../../api/Api";
import { SeatType } from "../../data/Data";
import { formattedSeat } from "../../utils/Utils";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SeatScreenRouteProp = RouteProp<RootStackParamList, "SeatScreen">;

const SeatScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SeatScreenRouteProp>();
  console.log("route", route);

  const showtimeId = route.params.showtimeId;
  // const theaterId = route.params.theaterId;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  console.log("seat selected: ", selectedSeats);
  const handleClickSeat = (seatID: string) => {
    const isExisted = selectedSeats.includes(seatID);
    isExisted
      ? setSelectedSeats(
          selectedSeats.filter((value) => {
            return value !== seatID;
          })
        )
      : setSelectedSeats([...selectedSeats, seatID]);
  };

  const [seatInfo, setSeatInfo] = useState<SeatType[]>([]);

  // const formattedSeat = (seat: SeatType[]) => {
  //   const result = seat.sort((a: SeatType, b: SeatType) => {
  //     if (a.locateRow < b.locateRow) return -1;
  //     if (a.locateRow > b.locateRow) return 1;
  //     //if equal locateRow
  //     return a.locateColumn - b.locateColumn;
  //   });
  //   return result;
  // };

  useEffect(() => {
    getApi(
      `/api/showtimes/${showtimeId}`,
      true,
      (error: any, response: any) => {
        if (error) {
          console.log("error when fetching api:", error);
        } else {
          console.log("seatInfo: ", response.result);
          setSeatInfo(response.result);
        }
      }
    );
  }, []);

  //navigate
  const handleBuyTicket = () => {
    navigation.navigate("PaymentScreen", {
      seats: selectedSeats,
      showTime: route.params.showTime,
      Movie: route.params.Movie,
    });
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
      <View className="flex flex-row flex-wrap gap-x-2 gap-y-2 justify-center">
        {formattedSeat(seatInfo).map((seat, index) => (
          <SeatComponent
            key={index}
            isSample={{ id: false, textSample: "", colorSample: "" }}
            status={seat.status}
            isSelected={selectedSeats.includes(seat.id)}
            setIsSelected={() => handleClickSeat(seat.id)}
            positionSeat={`${seat.locateRow}${seat.locateColumn} `}
          />
        ))}
      </View>
      <View className="flex flex-row justify-center items-center mt-5 gap-3">
        <SeatComponent
          isSample={{ id: true, textSample: "Can not", colorSample: "red" }}
        />
        <SeatComponent
          isSample={{ id: true, textSample: "Can", colorSample: "gray" }}
        />
        <SeatComponent
          isSample={{ id: true, textSample: "Picking", colorSample: "yellow" }}
        />
      </View>
      <View className="flex flex-row justify-between items-center border-gray-300  absolute bottom-0 left-0 right-0">
        {/* total fee */}
        <View className="flex-1 h-20 flex justify-center items-center">
          <Text className="text-xl text-white">Total</Text>
          {selectedSeats.length > 0 ? (
            <Text className="text-white font-bold text-xl">
              {100000 * selectedSeats.length} VND
            </Text>
          ) : (
            <Text className="text-white font-bold text-xl">0 VND</Text>
          )}
        </View>

        {selectedSeats.length > 0 ? (
          <TouchableOpacity
            className="flex-1 bg-yellow-500 rounded-[30] flex justify-center items-center h-20"
            onPress={() => handleBuyTicket()}
          >
            <Text className="p-2 font-bold text-xl">Buy ticket</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-1 bg-gray-200 rounded-[30] flex justify-center items-center h-20">
            <Text className="p-2 font-bold text-xl">Buy ticket</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SeatScreen;
