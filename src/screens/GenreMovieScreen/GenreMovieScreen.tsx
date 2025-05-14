import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import MovieComponent from "../../components/MovieComponent";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchAllMoviesByGenreId } from "../../redux/slices/genreMovieSlice";

export default function GenreMovieScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "GenreMovieScreen">>();
  const genreId = route.params.idGenre;
  const dispatch = useDispatch<AppDispatch>();
  const { listMovies, loading, error, genreData } = useSelector(
    (state: RootState) => state.genreMovie
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleHome = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    dispatch(fetchAllMoviesByGenreId(genreId));
  }, [dispatch]);

  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-xl text-white">Loading</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-xl text-red-600">Lỗi hệ thống</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black px-4">
      <ScrollView>
        <View className="flex-row relative justify-center py-5">
          <TouchableOpacity
            onPress={handleBack}
            className="absolute left-3 top-4"
          >
            <AntDesign name="arrowleft" size={36} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl">GenreMovieScreen</Text>
          <TouchableOpacity
            onPress={handleHome}
            className="absolute right-3 top-4"
          >
            <AntDesign name="home" size={36} color="white" />
          </TouchableOpacity>
        </View>
        {/* image and info */}
        <View className="flex my-3">
          <Text className="text-white text-2xl font-bold">
            Các phim {genreData?.name}
          </Text>
          <View className="flex flex-row flex-wrap justify-start gap-x-5 gap-y-2 mt-3 ml-3">
            {listMovies.map((f, id) => (
              <MovieComponent key={id} item={f} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
