import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getApi } from "../../api/Api";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ActorComponent from "../../components/ActorComponent";
import CinemaComponent from "../../components/CinemaComponent";
import { MovieType } from "../../data/Data";
import { RootStackParamList } from "../../navigation/type";
type MovieDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MovieDetail"
>;
type MovieDetailRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

interface MovieDetailProp {
  route: MovieDetailRouteProp;
}

const MovieDetail = ({ route }: MovieDetailProp) => {
  const listMovie = [1, 2];

  const movies = useSelector((state: any) => state.movies);
  const navigation = useNavigation();
  const [movieDetail, setMovieDetail] = useState<MovieType | null>(null);
  console.log("redux movies:", movies);
  const [listSelected, setListSelected] = useState<number[]>([]);
  const handleSelectMovie = (value: any) => {
    //logic: arr only store 1 element to select the movie that had been select to choose
    setListSelected((prevSelected) => {
      const isExist = prevSelected.includes(value);
      if (isExist) {
        return [];
      } else {
        return [value];
      }
    });
  };
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
  if (!movieDetail) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

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
            <Text className="font-bold text-white">
              {movieDetail.genres.map((genre) => genre.name + ` `)}
            </Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className="text-white">Censorship</Text>
            <Text className="font-bold text-white">13+</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className="text-white">Language</Text>
            <Text className="font-bold text-white">{movieDetail.language}</Text>
          </View>
        </View>
        <View className="flex flex-col w-full mb-10 gap-2">
          <Text className="text-2xl font-bold text-white">Storyline</Text>
          <Text className="font-bold text-white" numberOfLines={3}>
            {movieDetail.content}
          </Text>
        </View>
        <View className="flex flex-col w-full mb-10 gap-2">
          <Text className="text-2xl font-bold text-white">Actors</Text>
          {/* Actors, Directors Component */}
          <View className="flex flex-row gap-2">
            {movieDetail.actors.map((actor, index) => (
              <ActorComponent
                key={index}
                nameActor={actor.name}
                gender={actor.gender}
                image={actor.image}
              />
            ))}
          </View>
          {/* Cinema Component*/}
          <View className="flex flex-col mt-3">
            <Text className="text-white text-2xl font-bold mb-3">Cinema</Text>
            {/* arr sample to store list cinema */}
            {listMovie.map((value, index) => (
              <CinemaComponent
                key={index}
                isSelected={listSelected.includes(value)}
                setSelected={() => handleSelectMovie(value)}
              />
            ))}
            {/* <CinemaComponent
              isSelected={isSelectMovie}
              setSelected={handleSelectMovie}
            />
            <CinemaComponent
              isSelected={isSelectMovie}
              setSelected={handleSelectMovie}
            /> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetail;
