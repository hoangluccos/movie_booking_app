import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import MyTicketComponent from "../../components/MyTicketComponent";
import DetailBetween from "../../components/DetailBetweenComponent";
import PaymentComponent from "../../components/PaymentComponent";
import { postApi } from "../../api/Api";
import { ResponseApiType } from "../../data/Response";
import { WebView } from "react-native-webview";
import { ScrollView } from "react-native-gesture-handler";
import FoodComponent from "../../components/FoodComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, "PaymentScreen">;

// Tạo hàm getApi (nếu chưa có)
export const getPaymentApi = (
  url: string,
  params: Record<string, string> | null,
  callback: (error: any, response: any) => void
) => {
  const baseUrl = "http://192.168.1.4:8080";
  let queryString = "";
  if (params) {
    queryString = "?" + new URLSearchParams(params).toString();
  }
  fetch(`${baseUrl}${url}${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Thêm headers nếu cần (ví dụ: Authorization)
    },
  })
    .then((response) => response.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};

const PaymentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PaymentScreenRouteProp>();
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(true);

  const [foodQuantities, setFoodQuantities] = useState<{
    [key: string]: number;
  }>({ food1: 0, food2: 0, food3: 0 });

  const foodList = [
    { id: "food1", name: "Popcorn", price: 50000 },
    { id: "food2", name: "Coca", price: 30000 },
    { id: "food3", name: "Combo Popcorn + Coca", price: 70000 },
    { id: "food3", name: "Combo Popcorn + Coca", price: 70000 },
    { id: "food3", name: "Combo Popcorn + Coca", price: 70000 },
    { id: "food3", name: "Combo Popcorn + Coca", price: 70000 },
    { id: "food3", name: "Combo Popcorn + Coca", price: 70000 },
  ];

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setFoodQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));
  };

  const totalFoodCost = foodList.reduce(
    (sum, food) => sum + food.price * foodQuantities[food.id],
    0
  );

  const handleConfirmFood = () => {
    setIsOpenModal(false);
    console.log("Selected food quantities:", foodQuantities);
    console.log("Total food cost:", totalFoodCost);
  };

  const handleClickPayment = () => {
    const requestBook = {
      showtimeId: route.params.showTime.id,
      seatId: route.params.seats,
      couponId: null,
      orderRequests: [],
    };
    console.log("requestBook: ", requestBook);
    postApi(
      "/api/book/",
      null,
      requestBook,
      true,
      (error: any, response: ResponseApiType) => {
        if (error) {
          console.log("Error when post api Booking ticket", error);
        } else {
          console.log("Have booking ticket successfully", response);
          setTicketId(response.result.id); // Lưu ticketId
          const requestPayment = {
            ticketId: response.result.id,
            method: "VNPay",
          };
          postApi(
            "/api/payment/",
            requestPayment,
            null,
            true,
            (error: any, response: ResponseApiType) => {
              if (error) {
                console.log("Error when post api Payment", error);
              } else {
                console.log("Redirect into payment", response.result);
                setPaymentUrl(response.result);
              }
            }
          );
        }
      }
    );
  };

  const confirmPayment = (responseCode: string, ticketId: string) => {
    getPaymentApi(
      "/api/payment/callback",
      { vnp_ResponseCode: responseCode, vnp_TxnRef: ticketId },
      (error: any, response: any) => {
        if (error) {
          console.log("Error confirming payment", error);
        } else {
          console.log("Payment confirmed and saved to database", response);
        }
      }
    );
  };

  const handleNavigationStateChange = (navState: { url: string }) => {
    const { url } = navState;
    console.log("Navigated to:", url);

    if (url.includes("/api/payment/callback")) {
      const params = new URLSearchParams(url.split("?")[1]);
      const responseCode = params.get("vnp_ResponseCode");
      const amount = params.get("vnp_Amount");
      const orderInfo = decodeURIComponent(params.get("vnp_OrderInfo") || "");
      const transactionNo = params.get("vnp_TransactionNo");

      if (responseCode === "00" && ticketId) {
        console.log("Thanh toán thành công");
        confirmPayment(responseCode, ticketId); // Gọi GET để xác nhận
        setPaymentUrl(null);
        navigation.navigate("SuccessScreen", {
          amount: amount ? Number(amount) / 100 : 0,
          orderInfo: orderInfo || "",
          transactionNo: transactionNo || "",
        });
      } else {
        console.log("Thanh toán thất bại, ResponseCode:", responseCode);
        setPaymentUrl(null);
        navigation.navigate("ErrorScreen");
      }
    }
  };

  const handleShouldStartLoad = (request: { url: string }) => {
    const { url } = request;
    console.log("Should load:", url);

    if (url.includes("/api/payment/callback")) {
      handleNavigationStateChange({ url });
      return false; // Ngăn WebView tải thêm
    }
    return true;
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-black p-5">
        {/* Modal chọn combo đồ ăn */}
        <Modal visible={isOpenModal} transparent={true} animationType="slide">
          <View className="flex-1 bg-black/70 justify-center items-center">
            <View className="bg-white w-11/12 max-h-[80%] rounded-lg p-5">
              <Text className="text-xl font-bold text-center mb-5">
                Chọn Combo Đồ Ăn
              </Text>
              <ScrollView className="max-h-full">
                {/* Giới hạn chiều cao của ScrollView */}
                {/* Dùng ScrollView để cuộn nội dung */}
                {foodList.map((food) => (
                  <FoodComponent
                    key={food.id}
                    id={food.id}
                    name={food.name}
                    price={food.price}
                    quantity={foodQuantities[food.id]}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </ScrollView>
              <View className="mt-5 items-center">
                <Text className="text-lg font-bold mb-2">
                  Tổng: {totalFoodCost.toLocaleString()} VND
                </Text>
                <TouchableOpacity
                  className="bg-green-600 py-2 px-5 rounded-md"
                  onPress={handleConfirmFood}
                >
                  <Text className="text-white text-base font-bold">
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {!isOpenModal && (
          <View className="flex flex-1 flex-col bg-black px-5 mt-7">
            {paymentUrl ? (
              <WebView
                source={{ uri: paymentUrl }}
                style={{ flex: 1 }}
                onNavigationStateChange={handleNavigationStateChange}
                onShouldStartLoadWithRequest={handleShouldStartLoad}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.log("WebView error:", nativeEvent);
                }}
                onHttpError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.log("WebView HTTP error:", nativeEvent);
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                cacheEnabled={false}
              />
            ) : (
              <>
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
                  <Text className="text-white text-xl font-bold">
                    100000VND
                  </Text>
                </View>
                {/* Payment method */}
                <View>
                  <Text className="text-white font-bold text-xl">
                    Payment Method
                  </Text>
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
              </>
            )}
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default PaymentScreen;
