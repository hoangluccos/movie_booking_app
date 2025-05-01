import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { findMovieById } from "../../redux/slices/movieSlice";
import { MovieType } from "../../data/Data";
import StarRating from "../../components/StarRating";
import { postFeedback } from "../../redux/slices/ticketSlice";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type TicketScreenRouteProp = RouteProp<RootStackParamList, "TicketScreen">;

const TicketScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<TicketScreenRouteProp>();
  const { ticket } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const movieDetail = useSelector<RootState, MovieType | null>(
    (state) => state.movies.movieDetail
  );

  const [rating, setRating] = useState(4);
  const [contentRating, setContentRating] = useState("");
  useEffect(() => {
    dispatch(findMovieById(ticket.movieId));
  }, [ticket.movieId]);
  console.log("ticket", ticket);
  console.log("movieDetail-From-Redux", movieDetail);

  const handleSendRating = () => {
    const dataSend = {
      movieId: ticket.movieId,
      content: contentRating,
      rate: rating,
    };
    console.log("dataSend ", dataSend);
    dispatch(postFeedback(dataSend));
    Alert.alert("We have send your feedback to the Admin");
  };

  if (!movieDetail) {
    return (
      <View className="flex flex-1 bg-black">
        <Text className="text-red-500 text-center font-bold">Loi He Thong</Text>
      </View>
    );
  }

  return (
    <View className="bg-black flex flex-1 mt-7">
      <View className="p-5 flex flex-row justify-center items-center">
        <TouchableOpacity
          className="absolute top-5 left-5"
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={28} color="white" />
        </TouchableOpacity>
        <Text className="font-bold text-3xl text-white">My ticket</Text>
      </View>
      {/* Ticket Detail */}
      <View className="flex bg-white h-auto mx-3 p-4 rounded-2xl">
        <View className="h-auto flex-row gap-4">
          <Image
            source={{ uri: movieDetail.image }}
            className="w-[100] rounded-2xl"
            style={{ aspectRatio: 2 / 3 }}
            resizeMode="cover"
          />
          <View className="bg-gray-600 flex-1 rounded-r-2xl">
            <View className="flex-1 rounded-r-[20] p-3 ">
              <Text className="text-2xl my-2 font-bold text-white">
                {ticket.movieName}
              </Text>
              <View className="flex flex-row items-center gap-2">
                <FontAwesome5
                  name="clock"
                  size={18}
                  color="white"
                  className="rounded-lg"
                />
                <Text className="text-xl mb-1 text-white">
                  {movieDetail.duration} minutes
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
                  {movieDetail.genres.reduce((accumulator, current) => {
                    accumulator += current.name + " ";
                    return accumulator;
                  }, "")}
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
            {/* Time date */}
            <View>
              <Text className="font-bold text-2xl">{ticket.startTime}</Text>
              <Text className="font-bold text-2xl">
                {ticket.dateScreenTime}
              </Text>
            </View>
          </View>
          <View className="flex-1 h-[100] flex-row gap-2 justify-center items-center">
            <FontAwesome5
              name="couch"
              size={38}
              color="black"
              className="rounded-lg"
            />
            {/* Seat location */}
            <View>
              {ticket.seats.map((seat, index) => {
                return (
                  <Text key={index} className="font-bold text-2xl">
                    {seat.locateRow}
                    {seat.locateColumn}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
        <View className="h-[1] bg-gray-600 mx-3 my-5" />
        {/* Others info */}
        <View className="flex flex-col gap-2">
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5 name="money-bill-alt" size={18} color="black" />
            <Text className="text-xl">
              {ticket.totalPrice.toLocaleString()}VND
            </Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <FontAwesome5 name="paper-plane" size={18} color="black" />
            <Text className="text-xl">{ticket.theaterName}</Text>
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
        {/* Rating movie afterwatch */}
        {ticket.canComment ? (
          <View className="flex items-center">
            <Text className="text-xl font-bold my-3">Rating this film</Text>
            <StarRating rating={rating} onRatingChange={setRating} />
            <View className="flex flex-row w-full justify-between items-center">
              <TextInput
                className="p-2 w-[80%] h-[50] mt-3 border border-gray-300 rounded-md"
                placeholder="Express your thinking"
                value={contentRating}
                onChangeText={setContentRating}
              />
              <TouchableOpacity
                onPress={() => handleSendRating()}
                className="flex items-center justify-center px-3 mt-2 bg-blue-300 rounded-lg h-[50]"
              >
                <Text>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="flex items-center">
            <Text className="font-bold text-xl underline uppercase text-[#facc15]">
              You can not rating this film
            </Text>
          </View>
        )}

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
