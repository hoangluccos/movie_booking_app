import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/type";
import { NotiTypeSocket } from "../../data/Data";
import { FontAwesome } from "@expo/vector-icons";
import instance from "../../api/instance";
import { showToast } from "../../utils/toast";
import { useWebSocket } from "../../hooks/useWebSocket";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function NotificationScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "NotificationScreen">>();
  const [notifications, setNotifications] = useState<NotiTypeSocket[]>(
    route.params?.listNotification.map((noti) => ({
      ...noti,
    })) || []
  );
  const { disconnect } = useWebSocket();

  const handleMarkAsRead = async (id: string) => {
    console.log("id notify", id);
    try {
      const res = await instance.put(`/notifies/${id}`);
      console.log("put notify", res.data);
      if (res.data) {
        setNotifications(notifications.filter((notify) => notify.id !== id));
        showToast("success", "Đã đọc thông báo");
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      console.log("Disconnecting socket in NotificationScreen...");
      disconnect();

      return () => {
        // Optional: Cleanup if needed when leaving NotificationScreen
      };
    }, [disconnect])
  );
  const handleGoHome = () => {
    navigation.navigate("Home");
  };

  const handleMatchingSuccess = () => {
    const isCreateTicket = notifications.find(
      (noti: NotiTypeSocket) => noti.code === 201 //"Tạo vé thành công"
    );
    const isMatched = notifications.find(
      (noti: NotiTypeSocket) => noti.code === 200 //"Ghép đôi thành công"
    );
    if (isCreateTicket && isMatched) {
      const props = {
        dataPartner: isMatched.data,
        dataTicket: isCreateTicket.data,
      };
      showToast("success", "Hệ thống đã tìm được partner cho bạn!");
      setTimeout(() => {
        // disconnect();
        navigation.navigate("MatchingSuccess", props);
      }, 1000);
    }
  };

  return (
    <View className="bg-black flex-1 ">
      <View className="flex-row items-center justify-between mt-3 px-2">
        <Text className="text-white text-2xl font-bold p-4">Notifications</Text>
        <TouchableOpacity onPress={handleGoHome}>
          <FontAwesome name="home" size={40} color="white" className="mr-4" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {notifications.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">
              No notifications available
            </Text>
          </View>
        ) : (
          notifications.map((noti) => (
            <View
              key={noti.id}
              className="flex-row items-center p-4 mx-2 my-1 bg-gray-900 rounded-lg"
            >
              <FontAwesome
                name="bell-o"
                size={24}
                color="#FCC434"
                className="mr-4"
              />
              <TouchableOpacity
                onPress={handleMatchingSuccess}
                className="flex-1"
              >
                <Text className="text-white text-base">{noti.message}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMarkAsRead(noti.id)}>
                <FontAwesome name="check-circle" size={24} color="#34C759" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
