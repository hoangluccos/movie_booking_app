import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  AppState,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchAllFoods } from "../../redux/slices/foodSlice";
import { CouponType, FoodType } from "../../data/Data";
import { formatVND, getTypeOfCoupon, totalPrice } from "../../utils/Utils";
import CouponComponent from "../../components/CouponComponent";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, "PaymentScreen">;

// Tạo hàm getApi (nếu chưa có)
export const getPaymentApi = (
  url: string,
  params: Record<string, string> | null,
  callback: (error: any, response: any) => void
) => {
  const baseUrl = "http://172.16.0.225:8080";
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

const PaymentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PaymentScreenRouteProp>();

  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const [isOpenModal, setIsOpenModal] = useState(true);
  const [isOpenModalDiscount, setIsOpenModalDiscount] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const foodListRedux = useSelector<RootState, FoodType[]>(
    (state) => state.foods.foods
  );
  //   const { loading, error } = useSelector((state: RootState) => state.foods);
  const [foodQuantities, setFoodQuantities] = useState<{
    [key: string]: number;
  }>({});
  console.log("FoodQuantities after function: ", foodQuantities);
  console.log("Route PaymentScreen", route.params);
  const listCoupons = useSelector((state: RootState) => state.coupons.coupons);
  console.log("Coupons ", listCoupons);
  const [selectCoupon, setSelectCoupon] = useState<CouponType>(listCoupons[0]);

  const handleSelectCoupon = (objCoupon: CouponType) => {
    console.log("selectCoupon: ", objCoupon.id);
    setSelectCoupon(objCoupon);
  };

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);
  useEffect(() => {
    if (foodListRedux.length > 0) {
      //create initial value FoodQuantities and display them
      const initialFoodQuantities = foodListRedux.reduce(
        (accumulator, currentValue) => {
          accumulator[currentValue.id] = 0;
          return accumulator;
        },
        {} as { [key: string]: number }
      );
      setFoodQuantities(initialFoodQuantities);
    }
  }, [foodListRedux]);
  console.log("ListFood From reduxt call API: ", foodListRedux);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setFoodQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));
  };

  const totalFoodCost = foodListRedux.reduce(
    (sum, food) => sum + food.price * foodQuantities[food.id],
    0
  );

  const handleConfirmFood = () => {
    setIsOpenModal(false);
    console.log("Selected food quantities:", foodQuantities);
    // console.log("Total food cost:", totalFoodCost);
  };
  const handleConfirmCoupon = () => {
    setIsOpenModalDiscount(false);
    // console.log("Selected food quantities:", foodQuantities);
    // console.log("Total food cost:", totalFoodCost);
  };
  const handleEntries = (obj: object) => {
    const entries = Object.entries(obj).map(([key, value], index) => {
      return { foodId: key, quantity: value };
    });
    return entries;
  };

  const handleClickPayment = () => {
    const requestBook = {
      showtimeId: route.params.showTime.id,
      seatId: route.params.seats,
      couponId: selectCoupon.id,
      orderRequests: handleEntries(foodQuantities),
      // orderRequests: [],
    };
    console.log("foodQuantities", foodQuantities);
    console.log("requestBook orderRequests nha: ", requestBook);
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
      <View className="flex-1 bg-black px-3">
        {/* Modal chọn combo đồ ăn */}
        <Modal visible={isOpenModal} transparent={true} animationType="fade">
          <View className="flex-1 bg-black/70 justify-center items-center">
            <View className="bg-white w-11/12 max-h-[80%] rounded-lg p-5">
              <Text className="text-xl font-bold text-center mb-5">
                Chọn Combo Đồ Ăn
              </Text>
              <ScrollView className="max-h-full">
                {/* Giới hạn chiều cao của ScrollView */}
                {/* Dùng ScrollView để cuộn nội dung */}
                {foodListRedux ? (
                  foodListRedux.map((food) => (
                    <FoodComponent
                      key={food.id}
                      id={food.id}
                      name={food.name}
                      image={food.image}
                      price={food.price}
                      quantity={foodQuantities[food.id]}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))
                ) : (
                  <Text>No foods available</Text>
                )}
              </ScrollView>
              <View className="mt-5 items-center">
                <Text className="text-lg font-bold mb-2">
                  Tổng: {formatVND(totalFoodCost)}
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
        {/* Modal chọn coupon discount */}
        <Modal
          visible={isOpenModalDiscount}
          transparent={true}
          animationType="fade"
        >
          <View className="flex-1 bg-black/70 justify-center items-center">
            <View className="bg-white w-11/12 max-h-[80%] rounded-lg p-5">
              <Text className="text-xl font-bold text-center mb-5">
                Chọn Voucher Discount
              </Text>
              <ScrollView className="max-h-full">
                {/* Giới hạn chiều cao của ScrollView */}
                {/* Dùng ScrollView để cuộn nội dung */}

                {/* Thanh tìm kiếm */}
                <View className="mb-3">
                  <TextInput
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Nhập mã voucher"
                    // xử lý sự kiện onChangeText ở đây
                  />

                  <ScrollView className="max-h-[calc(80%-150px)]">
                    {listCoupons.map((coupon, i) => (
                      <CouponComponent
                        key={coupon.id}
                        id={coupon.id}
                        image={coupon.image}
                        title={coupon.code}
                        discount={coupon.discountValue}
                        expireTime={coupon.endDate}
                        minValue={coupon.minValue}
                        handleSelect={() => handleSelectCoupon(coupon)}
                        isSelected={
                          selectCoupon.id === coupon.id ? true : false
                        }
                      />
                    ))}
                  </ScrollView>
                </View>
              </ScrollView>
              <View className="mt-5 items-center">
                <Text className="text-lg font-bold mb-2">
                  Giảm giá:{" "}
                  {formatVND(
                    getTypeOfCoupon(
                      selectCoupon,
                      totalPrice(route.params.seats.length) + totalFoodCost
                    )
                  )}
                </Text>
                <TouchableOpacity
                  className="bg-green-600 py-2 px-5 rounded-md"
                  onPress={handleConfirmCoupon}
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
                <ScrollView
                  className="flex-1"
                  contentContainerStyle={{ paddingBottom: 80 }} // Thêm padding để tránh nội dung bị che bởi nút
                >
                  <MyTicketComponent
                    nameMovie={route.params.Movie.name}
                    image={route.params.Movie.image}
                    duration={route.params.Movie.duration}
                    timeStart={route.params.showTime.startTime}
                    Date={route.params.showTime.date}
                  />
                  {/* Seat and coupons */}
                  <View className="flex gap-y-2 my-10">
                    <DetailBetween
                      title="Time Schedule"
                      value={
                        route.params.showTime.date +
                        "-" +
                        route.params.showTime.startTime
                      }
                    />
                    <DetailBetween title="Seats" value="Seat???" />

                    <TouchableOpacity
                      className="flex flex-row justify-between mt-3 items-center p-2 bg-yellow-500 rounded-md"
                      onPress={() => setIsOpenModal(true)}
                    >
                      <View className="flex flex-row gap-2 items-center">
                        <MaterialCommunityIcons
                          name="popcorn"
                          size={28}
                          color={"white"}
                        />
                        <Text className="text-white font-bold">Food </Text>
                      </View>
                      {totalFoodCost === 0 ? (
                        <Text className="text-white font-bold">
                          + {formatVND(totalFoodCost)}
                        </Text>
                      ) : (
                        <Text className="text-red-700 font-bold text-xl">
                          + {formatVND(totalFoodCost)}
                        </Text>
                      )}
                    </TouchableOpacity>
                    {/* <SetCoupon /> Set coupon Modal*/}
                    <TouchableOpacity
                      className="flex flex-row justify-between mt-3 items-center p-2 bg-yellow-500 rounded-md"
                      onPress={() => setIsOpenModalDiscount(true)}
                    >
                      <View className="flex flex-row gap-2 items-center">
                        <FontAwesome5
                          name="money-check"
                          size={25}
                          color={"white"}
                        />
                        <Text className="text-white font-bold">Discount</Text>
                      </View>

                      <Text className="text-red-700 font-bold text-xl">
                        -{" "}
                        {formatVND(
                          getTypeOfCoupon(
                            selectCoupon,
                            totalPrice(route.params.seats.length) +
                              totalFoodCost
                          )
                        )}
                      </Text>
                    </TouchableOpacity>
                    {/* Food order  */}
                  </View>
                  {/* Total cost */}
                  <View className="flex flex-row justify-between mb-5">
                    <Text className="text-white text-xl">Total</Text>
                    <Text className="text-white text-xl font-bold">
                      {formatVND(
                        totalPrice(route.params.seats.length) +
                          totalFoodCost -
                          getTypeOfCoupon(
                            selectCoupon,
                            totalPrice(route.params.seats.length) +
                              totalFoodCost
                          )
                      )}
                    </Text>
                  </View>
                  {/* Payment method */}
                  <View>
                    <Text className="text-white font-bold text-xl">
                      Payment Method
                    </Text>
                    <PaymentComponent nameMethod="Zalo Pay" image="nothing" />
                    <PaymentComponent nameMethod="Momo" image="nothing" />
                    <PaymentComponent
                      nameMethod="Credit Card"
                      image="nothing"
                    />
                  </View>
                </ScrollView>
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
