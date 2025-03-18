import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { getApi, postApi } from "../../api/Api";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ActorComponent from "../../components/ActorComponent";
import CinemaComponent from "../../components/CinemaComponent";
import { MovieType, ShowtimeType } from "../../data/Data";
import { RootStackParamList } from "../../navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addDays, format, parse } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type MovieDetailRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

interface MovieDetailProp {
  route: MovieDetailRouteProp;
}

const MovieDetail = ({ route }: MovieDetailProp) => {
  const navigation = useNavigation<NavigationProp>();
  const handleBack = () => {
    console.log("go back");
    navigation.goBack();
  };

  //redux
  const [movieDetail, setMovieDetail] = useState<MovieType | null>(null);
  const movies = useSelector((state: any) => state.movies);
  console.log("redux movies:", movies);
  //modal
  const [isShowModal, setIsShowModal] = useState(false);
  const [listSelected, setListSelected] = useState<string[]>([]);
  const [listCinema, setListCinema] = useState<Array<ShowtimeType> | []>([]);
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
  const getNextFiveDays = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const nextDay = addDays(today, i);
      dates.push(format(nextDay, "dd/MM"));
    }
    return dates;
  };
  const next5Days = getNextFiveDays(); //array

  const handleSelectCinema = () => {
    //show the modal select date and theater
    setIsShowModal(!isShowModal);
  };

  const [isSelectedDate, setIsSelectedDate] = useState<Array<string>>([]);
  const handleSelectDate = (value: any) => {
    const isExist = isSelectedDate.includes(value);
    isExist ? setIsSelectedDate([]) : setIsSelectedDate([value]);
  };
  //convert date from DD/MM -> yyyy/mm/dd localDate
  const convertDateApi = (date: string) => {
    const currentY = new Date().getFullYear();
    const formattedDate = parse(date, "dd/MM", new Date(currentY, 0, 1));
    return formattedDate;
  };
  // const [listCinema, setListCinema] = useState<Array<number>>([]);
  //uef
  //fetch api for movieDetail
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

  //fetch api showtime- finding showtime of this movieID, date
  useEffect(() => {
    if (isSelectedDate.length > 0) {
      const formattedDate = convertDateApi(isSelectedDate[0]);
      console.log("Formatted date:", formattedDate.toDateString());
      const request = {
        movieId: movieDetail?.id,
        date: formattedDate,
        location: "Hồ Chí Minh",
      };
      postApi(
        "/api/showtimes/all",
        request,
        true,
        (error: any, response: any) => {
          if (error) {
            console.log("Error when fetching api", error);
          } else {
            console.log("Fetch api successfully");
            console.log("showtimes", response.result);
            //update list Cinema
            setListCinema(response.result);
          }
        }
      );
    }
  }, [isSelectedDate]);
  if (!movieDetail) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-black">
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
        <TouchableOpacity
          onPress={handleBack}
          className="absolute top-5 left-5"
        >
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
              <Text className="font-bold text-white">
                {movieDetail.language}
              </Text>
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
          </View>
        </View>
      </ScrollView>
      {/* <View
        className={
          listSelected.length > 0
            ? "bg-yellow-400 fixed bottom-0 py-5 flex items-center rounded-[50]"
            : "bg-yellow-200 fixed bottom-0 py-5 flex items-center rounded-[50]"
        }
      >
        {listSelected.length > 0 ? (
          <TouchableOpacity onPress={() => handleSelectCinema()}>
            <Text className="text-black font-bold">Booking Ticket</Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-black font-bold">Booking Ticket</Text>
        )}
      </View> */}
      <View className="bg-yellow-400 fixed bottom-0 py-5 flex items-center rounded-[50]">
        <TouchableOpacity onPress={() => handleSelectCinema()}>
          <Text className="text-black font-bold">Booking Ticket</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={isShowModal}>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
          className="flex-1"
        >
          <TouchableOpacity
            className="flex-1"
            onPress={() => setIsShowModal(false)}
          />
          <View className="flex bg-yellow-400 w-full h-[400] px-10 absolute bottom-0">
            <TouchableOpacity
              onPress={() => setIsShowModal(!isShowModal)}
              className="absolute top-1 right-1"
            >
              <Text className="p-1 bg-red-600 rounded-lg">Close</Text>
            </TouchableOpacity>
            {/* List date to select */}
            <View className="flex flex-wrap mt-10 justify-center">
              <View className="flex-row justify-center gap-2">
                {next5Days.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      console.log("select", date), handleSelectDate(date);
                    }}
                  >
                    <Text
                      className={
                        !isSelectedDate.includes(date)
                          ? "p-3 bg-gray-400 rounded-lg"
                          : "p-3 bg-red-400 rounded-lg"
                      }
                    >
                      {date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Cinema Component*/}
            <View className="flex flex-col mt-3">
              <Text className="text-white text-2xl font-bold mb-3">Cinema</Text>
              {listCinema.map((value, index) => (
                <CinemaComponent
                  key={index}
                  theater={value.theater}
                  isSelected={listSelected.includes(value?.id)}
                  setSelected={() => handleSelectMovie(value?.id)}
                />
              ))}
            </View>
            <View className="flex flex-row justify-center bg-white bottom-0 mt-5 py-4 rounded-[50]">
              {listSelected.length > 0 ? (
                <TouchableOpacity>
                  <Text className="font-bold">Select Seats</Text>
                </TouchableOpacity>
              ) : (
                <View>
                  <Text className="">Choose Theater</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MovieDetail;
