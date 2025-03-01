import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getApi } from "../../api/Api";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const MovieDetail = ({ route }) => {
  const movies = useSelector((state) => state.movies);
  const navigation = useNavigation();
  const [movieDetail, setMovieDetail] = useState({});
  console.log("redux movies:", movies);
  //   console.log(navigation);
  //   console.log(route.params);
  const handleBack = () => {
    console.log("go back");
    navigation.goBack();
  };
  useEffect(() => {
    getApi(`/api/movies/${route.params}`, true, (error, response) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Response:", response);
        setMovieDetail(response.result);
      }
    });
  }, []);
  console.log(movieDetail.image);

  return (
    <View className="bg-slate-700 w-full h-full flex my-6">
      <TouchableOpacity onPress={handleBack}>
        <View className="p-2 bg-slate-600 rounded-md absolute top-2 left-2">
          <Text className="color-white">Back</Text>
        </View>
      </TouchableOpacity>
      <View className="flex-1 items-center mt-7">
        <View>
          <Image
            source={{ uri: movieDetail.image }}
            className="w-[300] h-[450] rounded-md"
          ></Image>
        </View>
        <View className="my-3">
          <Text className="font-bold text-3xl color-white">
            {movieDetail.name}
          </Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <FontAwesome
            name="star"
            size={20}
            color="white"
            className="rounded-lg"
          />
          <Text className="font-bold text-xl color-white">
            {movieDetail.rate}
          </Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <FontAwesome
            name="language"
            size={20}
            color="white"
            className="rounded-lg"
          />
          <Text className="font-bold text-xl color-white">
            {movieDetail.language}
          </Text>
        </View>
      </View>
      <TouchableOpacity className="absolute bottom-6 w-full h-20 bg-cyan-600 rounded">
        <View className="flex justify-center items-center">
          <Text className="font-bold color-white mt-6 text-2xl">Đặt vé</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetail;
