import { View, Text } from "react-native";
import React from "react";
import { NotiTypeSocket } from "../../data/Data";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/type";

export default function NotificationScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "NotificationScreen">>();
  //   console.log("listNotification: ", route.params.listNotification);

  return (
    <View className="bg-black flex flex-1 justify-center">
      <Text className="text-white">NotificationScreen</Text>
    </View>
  );
}
