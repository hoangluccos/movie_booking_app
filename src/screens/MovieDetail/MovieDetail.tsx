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
import { FontAwesome } from "@expo/vector-icons";
import ActorComponent from "../../components/ActorComponent";
import CinemaComponent from "../../components/CinemaComponent";
import { MovieType, ShowtimeType } from "../../data/Data";
import { RootStackParamList } from "../../navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addDays, format, parse } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchAllCoupons } from "../../redux/slices/couponSlice";
import { fetchAllFeedbackByMovie } from "../../redux/slices/feedbackSlice";
import DetailFeedback from "../../components/DetailFeedback";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type MovieDetailRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

interface MovieDetailProp {
  route: MovieDetailRouteProp;
}

const MovieDetail = ({ route }: MovieDetailProp) => {
  const navigation = useNavigation<NavigationProp>();
  const [movieDetail, setMovieDetail] = useState<MovieType | null>(null);
  //modal
  const [isShowModal, setIsShowModal] = useState(false);
  const [listCinemaSelected, setListCinemaSelected] = useState<ShowtimeType[]>(
    []
  );
  const listFeedback = useSelector(
    (state: RootState) => state.feedbacks.feedbacks
  );
  const [isSelectedDate, setIsSelectedDate] = useState<Array<string>>([]);
  const [listCinema, setListCinema] = useState<ShowtimeType[] | []>([]);
  const dispatch = useDispatch<AppDispatch>();

  const handleBack = () => {
    console.log("go back");
    navigation.goBack();
  };

  const handleClickBooking = () => {
    //show the modal select date and theater
    setIsShowModal(!isShowModal);
  };

  const handleSelectCinema = (value: any) => {
    //logic: arr only store 1 element to select the movie that had been select to choose
    setListCinemaSelected((prevSelected) => {
      const isExist = prevSelected.includes(value);
      if (isExist) {
        return [];
      } else {
        return [value];
      }
    });
  };
  console.log("selected cinema:", listCinemaSelected[0]);
  console.log("Route params ", route.params);
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

  const handleSelectDate = (value: any) => {
    const isExist = isSelectedDate.includes(value);
    isExist ? setIsSelectedDate([]) : setIsSelectedDate([value]);
  };

  //convert date from DD/MM -> yyyy/mm/dd localDate
  const convertDateApi = (date: string) => {
    const currentY = new Date().getFullYear();
    const formattedDate = parse(date, "dd/MM", new Date(currentY, 0, 1));
    // return formattedDate;
    return format(formattedDate, "yyyy-MM-dd");
  };

  //uef
  //fetch api for movieDetail
  useEffect(() => {
    getApi(`/api/movies/${route.params.id}`, true, (error, response) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Response MovieDetail:", response);

        setMovieDetail(response.result);
      }
    });
    console.log("Bat dau fetch API coupon");
    dispatch(fetchAllCoupons());
    dispatch(fetchAllFeedbackByMovie(route.params.id));
  }, []);

  //fetch api showtime- finding showtime of this movieID, date
  useEffect(() => {
    if (isSelectedDate.length > 0) {
      const formattedDate = convertDateApi(isSelectedDate[0]);
      console.log("Formatted date:", formattedDate);
      const request = {
        movieId: movieDetail?.id,
        date: formattedDate,
        location: "Hồ Chí Minh",
      };
      postApi(
        "/api/showtimes/all",
        null,
        request,
        true,
        (error: any, response: any) => {
          if (error) {
            console.log("Error when fetching api", error);
          } else {
            console.log("Fetch api successfully");
            console.log("showtimes: ", response.result);
            //update list Cinema
            setListCinema(response.result);
            setListCinemaSelected([]);
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

  //handle navigate to SeatScreen
  const handleSelectSeat = (showTime: ShowtimeType) => {
    console.log("ShowtimeId have clicked: ", showTime.id);
    setIsShowModal(false);
    navigation.navigate("SeatScreen", {
      showtimeId: showTime.id,
      Movie: movieDetail,
      showTime: showTime,
    });
  };

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
              {/* <TouchableOpacity>
                <View className="flex flex-row gap-2 items-center border border-white p-2 rounded-sm">
                  <FontAwesome name="play" size={20} color="white" />
                  <Text className="text-white">Watch trailer</Text>
                </View>
              </TouchableOpacity> */}
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
              <ScrollView horizontal={true} className="flex flex-row gap-2">
                {movieDetail.actors.map((actor, index) => (
                  <ActorComponent
                    key={index}
                    nameActor={actor.name}
                    gender={actor.gender}
                    image={actor.image}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
          <View className="flex flex-col w-full mb-10 gap-2">
            {/* List feedback */}
            <Text className="text-2xl font-bold text-white">
              Feedback from audience
            </Text>
            {listFeedback.length === 0 ? (
              <Text className="text-sm font-bold text-white">
                {" "}
                Now dont have any feedback
              </Text>
            ) : (
              listFeedback.map((feedback, i) => (
                <DetailFeedback
                  content={feedback.content}
                  name={feedback.byName}
                  rate={feedback.rate}
                  key={i}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => handleClickBooking()}
        className="bg-yellow-400 fixed bottom-0 py-5 flex items-center rounded-[50]"
      >
        <Text className="text-black font-bold">Booking Ticket</Text>
      </TouchableOpacity>
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
          <View className="flex bg-[#faad14] w-full h-[400] px-10 absolute bottom-0">
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
                          ? "p-3 bg-[#fffbe6] rounded-lg"
                          : "p-3 bg-[#871400] rounded-lg text-white"
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
                  date={value.date}
                  theater={value.theater}
                  isSelected={listCinemaSelected.includes(value)}
                  setSelected={() => handleSelectCinema(value)}
                />
              ))}
            </View>
            {listCinemaSelected.length > 0 ? (
              <TouchableOpacity
                className="flex flex-row justify-center bg-white bottom-0 mt-5 py-4 rounded-[50]"
                onPress={() => handleSelectSeat(listCinemaSelected[0])}
              >
                <Text className="font-bold">Select Seats</Text>
              </TouchableOpacity>
            ) : (
              <View className="flex flex-row justify-center bg-white bottom-0 mt-5 py-4 rounded-[50]">
                <Text className="">Choose Date</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MovieDetail;
