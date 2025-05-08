import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import { useWebSocket } from "../../hooks/useWebSocket";
import { transferStringToDateCheckToDay } from "../../utils/Utils";
// import { Spinner } from "tamagui";
import Toast from "react-native-toast-message";
import instance from "../../api/instance";

const showToast = (typeToast: string, message: string) => {
  Toast.show({
    type: typeToast,
    text1: message,
  });
};

const MatchingScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");

  const { connect, disconnect, isConnected, isLoading } = useWebSocket();
  const [notifications, setNotifications] = useState([]);

  const [listMovies, setListMovies] = useState([]);
  const [listTheaters, setListTheaters] = useState([]);
  const [allShowtimesAccessible, setAllShowtimesAccessible] = useState([]);
  const [showtimesCanPick, setShowtimesCanPick] = useState([]);

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
      //   const token = await AsyncStorage.getItem("token");
      //   if (!token) {
      //     navigation.navigate("Login");
      //     return;
      //   }

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
        const filtered = res.data.result.filter((d: any) =>
          transferStringToDateCheckToDay(d.date)
        );
        setAllShowtimesAccessible(filtered);
      };
      fetchShowtimes();
    }
  }, [selectMovieId]);

  useEffect(() => {
    const filtered = allShowtimesAccessible.filter(
      (s: any) => s.theater.name === selectTheaterName
    );
    setShowtimesCanPick(filtered);
  }, [allShowtimesAccessible, selectTheaterName]);

  useEffect(() => {
    const isCreateTicket = notifications.find(
      (noti: any) => noti.message === "Tạo vé thành công"
    );
    const isMatched = notifications.find(
      (noti: any) => noti.message === "Ghép đôi thành công"
    );

    if (isCreateTicket && isMatched) {
      //   const props = {
      //     dataPartner: isMatched.result,
      //     dataTicket: isCreateTicket.result,
      //     dataRequestMatching: listMovies.find((m) => m.id === selectMovieId),
      //   };

      showToast("success", "Đã ghép đôi thành công!");
      //   setTimeout(() => {
      //     disconnect();
      //     navigation.navigate("MatchingSuccess", props);
      //   }, 1000);
    }
  }, [notifications]);

  const handleSubmit = async () => {
    try {
      await connect(userId, handleNotificationSocket);

      const movieName = listMovies.find(
        (m: any) => m.id === selectMovieId
      )?.name;
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
      <View className="flex-1 justify-center items-center bg-black/80">
        {/* <Spinner size="large" color="pink" /> */}
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
            <Text key={i} className="text-pink-200 text-center">
              {noti.message}
            </Text>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/matching_mb.jpg")}
      className="flex-1"
      resizeMode="contain"
    >
      <ScrollView className="flex-1 p-4 bg-pink-400">
        <Text className="text-xl font-bold text-center mb-4">
          Ghép đôi xem phim
        </Text>

        <View className="my-3">
          <SelectList
            setSelected={setSelectMovie}
            data={listMovies.map((m: any) => ({ key: m.id, value: m.name }))}
            placeholder="Chọn phim"
          />
        </View>
        <View className="my-3">
          <SelectList
            setSelected={setSelectTheaterName}
            data={listTheaters.map((t: any) => ({
              key: t.name,
              value: t.name,
            }))}
            placeholder="Chọn rạp"
          />
        </View>
        <View className="my-3">
          <SelectList
            setSelected={setSelectShowtime}
            data={showtimesCanPick.map((s: any) => ({
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
