import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

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
          onPress={() => console.log("goBack")}
        >
          <FontAwesome name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl text-white font-bold">Payment</Text>
      </View>
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
              <Text className="text-xl mb-1 text-white">Action, adventure</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;
