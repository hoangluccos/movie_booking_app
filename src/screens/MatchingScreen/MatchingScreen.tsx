import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import { useWebSocket } from "../../hooks/useWebSocket";
import { transferStringToDateCheckToDay } from "../../utils/Utils";
import Toast from "react-native-toast-message";
import instance from "../../api/instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/type";
import {
  MovieType,
  NotiTypeSocket,
  ShowtimeType,
  TheaterType,
} from "../../data/Data";

const showToast = (typeToast: string, message: string) => {
  Toast.show({
    type: typeToast,
    text1: message,
  });
};

const MatchingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [userId, setUserId] = useState("");

  const { connect, disconnect, isConnected, isLoading } = useWebSocket();
  const [notifications, setNotifications] = useState<NotiTypeSocket[] | []>([]);

  const [listMovies, setListMovies] = useState([]);
  const [listTheaters, setListTheaters] = useState([]);
  const [allShowTimesAccessible, setAllShowTimesAccessible] = useState([]);
  const [showTimesCanPick, setShowTimesCanPick] = useState([]);

  const [selectMovieId, setSelectMovie] = useState("");
  const [selectTheaterName, setSelectTheaterName] = useState("");
  const [selectShowtime, setSelectShowtime] = useState("");
  const [selectGender, setSelectGender] = useState(0);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(30);

  const genderOptions = [
    { key: 1, value: "Nam" },
    { key: 0, value: "Nữ" },
  ];

  const ageOptions = Array.from({ length: 83 }, (_, i) => {
    const age = i + 18;
    return { key: age, value: `${age} tuổi` };
  });

  const handleNotificationSocket = (data: any) => {
    setNotifications((prev) => [...prev, data]);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("LogInScreen");
        return;
      }

      const [resMovies, resTheaters, resMybio] = await Promise.all([
        instance.get("/movies/"),
        instance.get("/theaters/"),
        instance.get("/users/bio"),
      ]);

      setListMovies(resMovies.data.result);
      setListTheaters(resTheaters.data.result);
      setUserId(resMybio.data.result.id);
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    if (selectMovieId) {
      const fetchShowtimes = async () => {
        const res = await instance.get(`/showtimes/${selectMovieId}/all`);
        const filtered = res.data.result.filter((d: ShowtimeType) =>
          transferStringToDateCheckToDay(d.date)
        );
        setAllShowTimesAccessible(filtered);
      };
      fetchShowtimes();
    }
  }, [selectMovieId]);

  useEffect(() => {
    const filtered = allShowTimesAccessible.filter(
      (s: ShowtimeType) => s.theater.name === selectTheaterName
    );
    setShowTimesCanPick(filtered);
  }, [allShowTimesAccessible, selectTheaterName]);

  useEffect(() => {
    const isCreateTicket = notifications.find(
      (noti: NotiTypeSocket) => noti.message === "Tạo vé thành công"
    );
    const isMatched = notifications.find(
      (noti: NotiTypeSocket) => noti.message === "Ghép đôi thành công"
    );

    if (isCreateTicket && isMatched) {
      const props = {
        dataPartner: isMatched.result,
        dataTicket: isCreateTicket.result,
        dataRequestMatching: listMovies.find(
          (m: MovieType) => m.id === selectMovieId
        ),
      };

      showToast("success", "Đã ghép đôi thành công!");
      setTimeout(() => {
        disconnect();
        navigation.navigate("MatchingSuccess", props);
      }, 1000);
    }
  }, [notifications]);

  const handleSubmit = async () => {
    try {
      await connect(userId, handleNotificationSocket);

      const movieName = listMovies.find(
        (m: MovieType) => m.id === selectMovieId
      )?.name;
      // const movie = listMovies.find((m: MovieType) => m.id === selectMovieId) á;
      // const movieName = movie ? movie.name : "";
      await instance.post("/matching/", {
        movieName,
        theaterName: selectTheaterName,
        showtimeId: selectShowtime,
        gender: selectGender,
        minAge,
        maxAge,
      });

      showToast("success", "Đang tìm người phù hợp...");
    } catch (err) {
      console.error(err);
      showToast("error", "Có lỗi xảy ra khi gửi yêu cầu!");
    }
  };

  const isDisabled = !selectMovieId || !selectTheaterName || !selectShowtime;

  if (isLoading) {
    return (
      <ImageBackground
        source={require("../../../assets/images/matching_mb.jpg")}
        className="flex-1"
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}
      >
        <View className="flex-1 justify-center items-center bg-black/60 pt-5">
          <ActivityIndicator size="large" color="#f472b6" className="mt-10" />
          <Text className="text-white text-xl mt-4">
            Đang tìm người phù hợp...
          </Text>
          <TouchableOpacity
            onPress={disconnect}
            className="mt-6 bg-gray-600 px-4 py-2 rounded-full"
          >
            <Text className="text-white">Hủy tìm</Text>
          </TouchableOpacity>
          <ScrollView className="mt-6">
            {notifications.map((noti: any, i) => (
              <Text key={i} className="font-bold text-pink-200 text-center">
                {noti.message}
              </Text>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/matching_mb.jpg")}
      className="flex-1"
      imageStyle={{ opacity: 0.1 }}
      resizeMode="cover"
    >
      <ScrollView className="flex-1 p-4 pt-8">
        <Text className="text-xl font-bold text-center mb-4">
          Ghép đôi xem phim
        </Text>

        <View className="my-3">
          <SelectList
            setSelected={setSelectMovie}
            data={listMovies.map((m: MovieType) => ({
              key: m.id,
              value: m.name,
            }))}
            placeholder="Chọn phim"
          />
        </View>
        <View className="my-3">
          <SelectList
            setSelected={setSelectTheaterName}
            data={listTheaters.map((t: TheaterType) => ({
              key: t.name,
              value: t.name,
            }))}
            placeholder="Chọn rạp"
          />
        </View>
        <View className="my-3">
          <SelectList
            setSelected={setSelectShowtime}
            data={showTimesCanPick.map((s: ShowtimeType) => ({
              key: s.id,
              value: `Ngày: ${s.date} - Giờ: ${s.startTime}`,
            }))}
            placeholder="Chọn lịch chiếu"
          />
        </View>
        <View className="my-3">
          <SelectList
            setSelected={setSelectGender}
            data={genderOptions}
            placeholder="Giới tính partner"
          />
        </View>
        <Text className="mt-1 font-semibold">Tuổi từ:</Text>
        <SelectList setSelected={setMinAge} data={ageOptions} />

        <Text className="my-3 font-semibold">Đến:</Text>
        <SelectList setSelected={setMaxAge} data={ageOptions} />

        <TouchableOpacity
          disabled={isDisabled}
          onPress={handleSubmit}
          className={`mt-6 px-6 py-3 rounded-full ${
            isDisabled ? "bg-gray-400" : "bg-pink-600"
          }`}
        >
          <Text className="text-white text-center font-bold">Tìm người</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default MatchingScreen;
