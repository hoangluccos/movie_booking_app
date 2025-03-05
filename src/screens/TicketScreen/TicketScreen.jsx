import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const TicketScreen = () => {
  const nav = useNavigation();
  return (
    <View className="bg-black flex flex-1 mt-7">
      <View className="p-5 flex flex-row justify-center items-center">
        <TouchableOpacity
          className="absolute top-5 left-5"
          onPress={() => nav.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        <Text className="font-bold text-3xl text-white">My ticket</Text>
      </View>
      {/* Ticket Detail */}
      <View className="flex bg-white h-auto mx-3 p-4 rounded-2xl">
        <View className="h-auto flex-row gap-4">
          <Image
            source={require("../../../assets/images/movie_sample.jpg")}
            className="w-[100] rounded-2xl"
            style={{ aspectRatio: 2 / 3 }}
            resizeMode="cover"
          />
          <View className="bg-gray-600 flex-1 rounded-r-2xl">
            <View className="flex-1 rounded-r-[20] p-3 ">
              <Text className="text-2xl my-2 font-bold text-white">
                Avengers:Infinity War
              </Text>
              <View className="flex flex-row items-center gap-2">
                <FontAwesome5
                  name="clock"
                  size={18}
                  color="white"
                  className="rounded-lg"
                />
                <Text className="text-xl mb-1 text-white">
                  2 hours 29 minutes
                </Text>
              </View>
              <View className="flex flex-row items-center gap-2">
                <FontAwesome5
                  name="film"
                  size={18}
                  color="white"
                  className="rounded-lg"
                />
                <Text className="text-xl mb-1 text-white">
                  Action, adventure
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Time & Seats */}
        <View className="flex flex-row mt-4 ">
          <View className="flex-1 h-[100] flex-row gap-2 justify-center items-center">
            {/* calendar-alt */}
            <FontAwesome5
              name="calendar-alt"
              size={38}
              color="black"
              className="rounded-lg"
            />
            <View>
              <Text className="font-bold text-2xl">14h15'</Text>
              <Text className="font-bold text-2xl">10.12.2025</Text>
            </View>
          </View>
          <View className="flex-1 h-[100] flex-row gap-2 justify-center items-center">
            <FontAwesome5
              name="couch"
              size={38}
              color="black"
              className="rounded-lg"
            />
            <View>
              <Text className="font-bold text-2xl">14h15'</Text>
              <Text className="font-bold text-2xl">10.12.2025</Text>
            </View>
          </View>
        </View>
        <View className="h-[1] bg-gray-600 mx-3 my-5" />
        {/* Others info */}
        <View className="flex flex-col gap-2">
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5 name="money-bill-alt" size={18} color="black" />
            <Text className="text-xl">210.000 VND</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5 name="paper-plane" size={18} color="black" />
            <Text className="text-xl">Vincom Ocean Park</Text>
          </View>
          <View className="flex flex-row items-baseline gap-2">
            <FontAwesome5 name="sticky-note" size={18} color="black" />
            <Text className="text-xl">
              Show this QR code to the ticket counter to receive your ticket
            </Text>
          </View>
        </View>
        <View className="my-5 h-auto">
          {/* circle-half */}
          <MaterialCommunityIcons
            name="circle-half"
            size={60}
            color="black"
            className="rotate-180 absolute top-0 left-[-50]"
          />
          {/* <View className="border-b border-black border-dashed mt-5 mx-4" /> */}
          {/* circle-half */}
          <MaterialCommunityIcons
            name="circle-half"
            size={60}
            color="black"
            className="absolute top-0 right-[-50]"
          />
        </View>

        {/* QR code */}
        <View className="flex flex-col gap-2">
          <Image
            source={require("../../../assets/images/qr_sample.jpg")}
            className="w-full h-[120] mt-10"
          />
          <Text className="text-xl text-center"> Order xxx0000xx</Text>
        </View>
      </View>
    </View>
  );
};

export default TicketScreen;
