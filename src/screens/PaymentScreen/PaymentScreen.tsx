import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import MyTicketComponent from "../../components/MyTicketComponent";
import DetailBetween from "../../components/DetailBetweenComponent";
import PaymentComponent from "../../components/PaymentComponent";
import { postApi } from "../../api/Api";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, "PaymentScreen">;

const PaymentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PaymentScreenRouteProp>();
  console.log("route params", route.params);
  const handleClickPayment = () => {
    const requestBook = {
      showtimeId: route.params.showTime.id,
      seatId: route.params.seats,
      couponId: "",
    };
    postApi("/api/book/", requestBook, true, (error: any, response: any) => {
      if (error) {
        console.log("Error when post api Booking ticket");
      } else {
        console.log("Have booking ticket successfully");
        console.log(response.result);
      }
    });
  };
  return (
    <View className="flex flex-1 flex-col bg-black px-5 mt-7">
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
      <View className="flex gap-y-2 my-10">
        <DetailBetween />
        <DetailBetween />
        <View className="flex flex-row bg-gray-600 h-auto rounded-md mt-3 items-center">
          <View className="flex flex-1 flex-row px-5 items-center gap-x-3">
            <FontAwesome name="flickr" size={20} color={"white"} />
            <TextInput
              placeholderTextColor={"white"}
              className="text-white"
              placeholder="discount code"
            />
          </View>
          <TouchableOpacity className="bg-yellow-500 w-[130] h-full flex flex-row justify-center items-center rounded-lg">
            <Text className="font-bold">Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Total cost */}
      <View className="flex flex-row justify-between mb-5">
        <Text className="text-white text-xl">Total</Text>
        <Text className="text-white text-xl font-bold">100000VND</Text>
      </View>
      {/* Payment method */}
      <View>
        <Text className="text-white font-bold text-xl">Payment Method</Text>
        <PaymentComponent nameMethod="Zalo Pay" image="nothing" />
        <PaymentComponent nameMethod="Momo" image="nothing" />
        <PaymentComponent nameMethod="Credit Card" image="nothing" />
      </View>
      <TouchableOpacity
        onPress={() => handleClickPayment()}
        className="bg-yellow-400 absolute w-full bottom-0 left-5 justify-items-center py-5 flex items-center rounded-[50]"
      >
        <Text className="text-black font-bold">Booking Ticket</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
