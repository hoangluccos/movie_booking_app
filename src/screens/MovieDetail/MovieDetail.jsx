import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getApi } from "../../api/Api";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ActorComponent from "../../components/ActorComponent";
import CinemaComponent from "../../components/CinemaComponent";

const MovieDetail = ({ route }) => {
  const stars = 5;
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
    <ScrollView
      className="flex flex-1 bg-black w-full"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <TouchableOpacity onPress={handleBack}>
        <View className="p-2 bg-slate-600 rounded-md absolute top-2 left-2">
          <Text className="color-white">Back</Text>
        </View>
      </TouchableOpacity>
      <ImageBackground
        source={{ uri: movieDetail.image }}
        className="w-full h-[300]"
      />
      <TouchableOpacity onPress={handleBack} className="absolute top-5 left-5">
        <FontAwesome name="arrow-left" size={30} color="white" />
      </TouchableOpacity>
      <View className=" relative top-[-100] mx-4 rounded-md">
        <View className="flex flex-col p-5 bg-gray-800 h-[200]">
          <Text className="text-2xl font-bold text-white">
            {movieDetail.name}
          </Text>
          <Text className="text-xl text-white">{movieDetail.premiere}</Text>
          <View className="h-10 " />
          <Text className="text-xl text-white">Review 4.8</Text>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <FontAwesome
                    key={index}
                    name="star-o"
                    size={25}
                    color="white"
                    className="mx-1"
                  />
                ))}
            </View>
            <TouchableOpacity>
              <View className="flex flex-row gap-2 items-center border border-white p-2 rounded-sm">
                <FontAwesome name="play" size={20} color="white" />
                <Text className="text-white">Watch trailer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-col justify-center my-10 gap-2">
          <View className="flex flex-row gap-5">
            <Text className="text-white">Movie genre</Text>
            <Text className="font-bold text-white">Action,Action,Action</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className="text-white">Censorship</Text>
            <Text className="font-bold text-white">13+</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className="text-white">Language</Text>
            <Text className="font-bold text-white">English</Text>
          </View>
        </View>
        <View className="flex flex-col w-full mb-10 gap-2">
          <Text className="text-2xl font-bold text-white">Storyline</Text>
          <Text className="font-bold text-white" numberOfLines={3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            praesentium blanditiis, excepturi provident molestias itaque
            doloribus reprehenderit nobis enim, eos quae id? Cumque quis ea,
            atque voluptatem soluta voluptatum debitis!
          </Text>
        </View>
        <View className="flex flex-col w-full mb-10 gap-2">
          <Text className="text-2xl font-bold text-white">Actors</Text>
          {/* Actors, Directors Component */}
          <View className="flex flex-row gap-2">
            <ActorComponent />
            <ActorComponent />
            <ActorComponent />
          </View>
          {/* Cinema Component*/}
          <View className="flex flex-col mt-3">
            <Text className="text-white text-2xl font-bold mb-3">Cinema</Text>
            <CinemaComponent />
            <CinemaComponent />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetail;
