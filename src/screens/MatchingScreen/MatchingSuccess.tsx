import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/type";
import { WebView } from "react-native-webview";
import { postApi } from "../../api/Api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchAllTickets } from "../../redux/slices/ticketSlice";
import { MovieType, PartnerType, ShowtimeType } from "../../data/Data";
import instance from "../../api/instance";

interface RouteParams {
  dataTicket: { id: string; showtimeId: string };
  dataPartner: PartnerType;
}

export const getPaymentApi = (
  url: string,
  params: Record<string, string> | null,
  callback: (error: any, response: any) => void
) => {
  const baseUrl = "http://10.0.2.2:8080";
  let queryString = "";
  if (params) {
    queryString = "?" + new URLSearchParams(params).toString();
  }

  fetch(`${baseUrl}${url}${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};

const MatchingSuccess = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { dataTicket, dataPartner } = route.params as RouteParams;
  const ticketId = dataTicket.id;
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const [dataMovie, setDataMovie] = useState<MovieType>({});
  const [showTime, setShowTime] = useState<ShowtimeType>({});

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const res = await instance.get(
          `/showtimes/info/${dataTicket.showtimeId}`
        );
        console.log("data response: ", res.data.result);
        setDataMovie(res.data.result.movie);
        setShowTime(res.data.result);
      } catch (error) {
        console.log("fail when fetch showtime api : ", error);
      }
    };
    fetchShowtime();
  }, []);

  const handleDeleteRQ = () => {
    const checkAndDeleteRQ = async () => {
      try {
        const res = await instance.get("/matching/check");
        if (res.data.result.isSendMatchingRequest) {
          const deleteRQ = async () => {
            try {
              const response = await instance.delete("/matching/");
              if (response.data.code === 200) {
                console.log("Delete Request matching successfully");
              }
            } catch (error) {
              console.log("error when delete", error);
            }
          };
          deleteRQ();
        }
      } catch (error) {
        console.log("error when checking: ", error);
      }
    };
    checkAndDeleteRQ();
  };

  const handlePayment = async () => {
    try {
      const requestPayment = {
        ticketId: ticketId,
        method: "VNPay",
      };
      postApi(
        "/api/payment/",
        requestPayment,
        null,
        true,
        (error: any, response: any) => {
          if (error) {
            console.log("Error when post api Payment", error);
          } else {
            console.log("Redirect into payment", response.result);
            setPaymentUrl(response.result);
          }
        }
      );
    } catch (error) {
      console.error("Error payment", error);
    }
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
        //delete request matching after paid successfully
        handleDeleteRQ();
        // fix not auto fetch all_tickets in tickets screen
        dispatch(fetchAllTickets());
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
      return false;
    }
    return true;
  };
  return (
    <View className="flex-1 pt-4">
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
          <SafeAreaView className="flex-1 bg-blue-950 pt-4">
            <View className="flex-1 p-5">
              {/* Movie Info */}
              <View className="bg-white rounded-xl p-5 mb-5 shadow-md w-full max-w-md mx-auto">
                <Text className="text-center text-lg font-bold text-gray-800">
                  Thông tin phim đã chọn
                </Text>
                <Image
                  source={{ uri: dataMovie.image }}
                  className="w-32 h-32 mx-auto my-3"
                  resizeMode="contain"
                />
                <Text className="text-center text-base font-semibold text-gray-700">
                  {dataMovie.name}
                </Text>
                <Text className="text-center text-sm text-gray-600">
                  Ngày xuất chiếu: {showTime.date} - giờ : {showTime.startTime}
                </Text>
              </View>

              {/* Partner Info */}
              <View className="bg-white rounded-xl p-5 shadow-md w-full max-w-md mx-auto">
                <Text className="text-center text-lg font-bold text-gray-800">
                  Thông tin partner
                </Text>
                <Text className="text-center text-base text-gray-700">
                  Tên: {dataPartner.name}
                </Text>
                <Text className="text-center text-base text-gray-700">
                  DOB: {dataPartner.dateOfBirth}
                </Text>
              </View>
            </View>

            {/* Payment Button */}
            <TouchableOpacity
              onPress={handlePayment}
              className="absolute bottom-5 left-5 right-5 bg-emerald-500 py-4 rounded-xl shadow-lg active:scale-95"
            >
              <Text className="text-center text-white text-lg font-bold">
                THANH TOÁN NGAY
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

export default MatchingSuccess;
