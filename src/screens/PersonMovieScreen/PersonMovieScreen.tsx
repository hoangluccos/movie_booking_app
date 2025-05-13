import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import MovieComponent from "../../components/MovieComponent";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchAllMovieByPersonId } from "../../redux/slices/personMovieSlice";
import defaultImage from "../../../assets/images/profile.png";

export default function PersonMovieScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "PersonMovieScreen">>();
  const personId = route.params.idActor;
  const dispatch = useDispatch<AppDispatch>();
  const { listMovies, loading, personInfo, error } = useSelector(
    (state: RootState) => state.personMovie
  );

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(fetchAllMovieByPersonId(personId));
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
          <Text className="text-white text-2xl">PersonMovieScreen</Text>
        </View>
        {/* image and info */}
        <View className="flex justify-center items-center pt-4">
          <View className="w-40 h-40">
            <Image
              className="w-full h-full rounded-[50]"
              source={
                personInfo?.image ? { uri: personInfo.image } : defaultImage
              }
              defaultSource={defaultImage}
            />
          </View>
          <Text className="text-2xl font-bold text-white">
            {personInfo?.name || "Unknown"}
          </Text>
        </View>
        <View className="flex my-3">
          <Text className="text-white text-2xl font-bold">
            Các phim đã tham gia
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
