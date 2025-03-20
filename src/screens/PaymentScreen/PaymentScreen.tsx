import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import MyTicketComponent from "../../components/MyTicketComponent";
import DetailBetween from "../../components/DetailBetweenComponent";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, "PaymentScreen">;

const PaymentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PaymentScreenRouteProp>();
  console.log("route params", route.params);
  return (
    <View className="flex flex-1 bg-black px-5 mt-7">
      <View className="flex flex-row justify-center py-4 my-2">
        <TouchableOpacity
          className="absolute top-3 left-2"
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl text-white font-bold">Payment</Text>
      </View>
      <MyTicketComponent
        nameMovie={route.params.Movie.name}
        image={route.params.Movie.image}
        duration={route.params.Movie.duration}
        timeStart={route.params.showTime.startTime}
        Date={route.params.showTime.date}
      />
      {/* Seat an coupons */}
      <View className="flex gap-y-2 my-5">
        <DetailBetween />
        <DetailBetween />
      </View>
    </View>
  );
};

export default PaymentScreen;
