import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import InputSearchComponent from "../../../components/InputSearchComponent";
import { useCallback, useEffect, useState } from "react";
import { GenreType, MovieType, NotiTypeSocket, User } from "../../../data/Data";
import { formatDuration } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../../../redux/slices/movieSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchUser, setIsLogOut } from "../../../redux/slices/userSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/type";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { showToast } from "../../../utils/toast";

interface UserState {
  user: User | null;
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const { width: screenWidth } = Dimensions.get("window");
  const sliderWidth = screenWidth;

  const dispatch = useDispatch<AppDispatch>();
  const [activeSlide, setActiveSlide] = useState(0);

  const [searchValue, setSearchValue] = useState("");

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const infoUser = useSelector<RootState, UserState>((state) => state.user);

  const listMovie = movies || [];

  //handle connect socket
  const { connect, disconnect, isConnected, isLoading } = useWebSocket();
  const [notifications, setNotifications] = useState<NotiTypeSocket[] | []>([]);

  const handleNotificationSocket = useCallback((data: NotiTypeSocket) => {
    setNotifications((prev) => {
      if (prev.some((notif) => notif.id === data.id)) {
        return prev;
      }
      return [...prev, { ...data }];
    });
  }, []);

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(setIsLogOut(false));
    //get UserId
    dispatch(fetchUser());
  }, [dispatch]);

  // Connect socket when screen is focused, disconnect when unfocused
  useFocusEffect(
    useCallback(() => {
      if (infoUser.user?.id) {
        console.log("Connecting socket in HomeScreen...");
        connect(infoUser.user?.id, handleNotificationSocket);
      }

      // return () => {
      //   console.log("Disconnecting socket in HomeScreen...");
      //   disconnect();
      // };
    }, [infoUser.user])
  );

  const handleClickMovie = (id: string) => {
    console.log("Click on movie", id);
    navigation.navigate("MovieDetail", { id: id });
  };

  const handleClickMatchingFeature = () => {
    navigation.navigate("MatchingScreen");
  };

  const handleClickNotification = () => {
    console.log("before redirect - list notifications: ", notifications);
    navigation.navigate("NotificationScreen", {
      listNotification: notifications,
    });
  };

  const showMovieNowPlayingCus = ({ item }: { item: MovieType }) => {
    return (
      <TouchableOpacity onPress={() => handleClickMovie(item.id)}>
        <View className="flex justify-center items-center w-[300px]">
          <Image
            className="w-[300px] h-[450px] rounded-lg"
            source={{
              uri: item.image,
            }}
          />
          <Text className="text-white text-center mt-2 text-lg font-semibold">
            {item.name}
          </Text>
          <View>
            <Text className="text-gray-400">
              {formatDuration(item.duration)} •{" "}
              {item.genres
                .slice(0, 2)
                .map((genre) => genre.name)
                .join(", ")}
            </Text>
          </View>
          <View className="flex-row justify-center items-center gap-x-2">
            <FontAwesome name="star" size={20} color="#FCC434" />
            <Text className="text-gray-400">{item.rate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const showMovieComingSoonCus = (item: MovieType) => {
    return (
      <TouchableOpacity onPress={() => handleClickMovie(item.id)}>
        <View className="w-[170px] mx-2">
          <View className="h-[300px]">
            <Image
              className="h-[240px] rounded-lg"
              source={{
                uri: item.image,
              }}
            />

            <Text className="text-lg text-[#FCC434] numberOfLines={2}">
              {item.name}
            </Text>
          </View>
          <View>
            <View className="flex-row items-center gap-x-2">
              <Image
                source={require("../../../../assets/images/video_icon.png")}
              />
              <Text className="text-gray-400">
                {item.genres
                  .slice(0, 1)
                  .map((genre) => genre.name)
                  .join(", ")}
              </Text>
            </View>
          </View>
          <View>
            <View className="flex-row items-center gap-x-2">
              <Image
                source={require("../../../../assets/images/calendar_icon.png")}
              />
              <Text className="text-gray-400">{item.premiere}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading)
    return (
      <View className="bg-black flex flex-1 items-center justify-center">
        <Text className="text-white font-bold text-2xl">Loading movies...</Text>
      </View>
    );
  if (error)
    return (
      <View className="bg-black flex flex-1 items-center justify-center">
        <Text className="text-red text-2xl">Error: {error}</Text>
      </View>
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        className="bg-black w-full h-full px-4"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <View className="my-3 py-4 px-2 flex-row justify-between">
            <View>
              <Text className="text-lg text-white">Hi, Friends</Text>
              <Text className="text-2xl text-white">Welcome Back</Text>
            </View>
            <TouchableOpacity
              onPress={handleClickNotification}
              className="justify-center relative" // Thêm relative để badge định vị
            >
              <FontAwesome name="bell-o" color="white" size={35} />
              {notifications.length > 0 && (
                <View className="absolute top-0 right-0 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                  <Text className="text-white text-xs">
                    {notifications.length > 9 ? "9+" : notifications.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <InputSearchComponent
              value={searchValue}
              onChangeValue={setSearchValue}
              listMovie={listMovie}
            />
          </View>
          {/* Begin matching feature */}
          <View className="matching_feature w-full my-2">
            <Text className="text-white my-1 text-xl font-bold">
              New feature
            </Text>
            <TouchableOpacity className="" onPress={handleClickMatchingFeature}>
              <ImageBackground
                source={require("../../../../assets/images/canva_matching1.png")}
                className="w-full h-[150px] rounded-md overflow-hidden"
                resizeMode="cover"
              ></ImageBackground>
            </TouchableOpacity>
          </View>
          {/* End matching feature */}
          <View>
            <View className="flex-row justify-between items-center py-4">
              <Text className="text-white text-xl">Now Playing</Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <FontAwesome name="caret-right" color="#FCC434" size={15} />
              </View>
            </View>
            {/* Begin Now playing feature */}
            <View className="items-center pb-4">
              <Carousel
                layout="default"
                data={listMovie}
                renderItem={showMovieNowPlayingCus}
                sliderWidth={sliderWidth}
                itemWidth={300}
                inactiveSlideOpacity={0.5}
                inactiveSlideScale={0.85}
                onSnapToItem={(index) => setActiveSlide(index)}
                loop
              />
            </View>
          </View>

          {/* Sắp chiếu */}
          <View className="pb-4">
            <View className="flex-row justify-between items-center py-4">
              <Text className="text-white text-xl">Coming Soon</Text>
              <View className="flex-row items-center gap-x-1">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <FontAwesome name="caret-right" color="#FCC434" size={15} />
              </View>
            </View>

            <View>
              <ScrollView horizontal>
                {listMovie.map((item) => (
                  <View key={item.id}>{showMovieComingSoonCus(item)}</View>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Giảm giá */}
          <View className="pb-4">
            <View className="flex-row justify-between items-center py-4">
              <Text className="text-white text-xl">Promo & Discount</Text>
              <View className="flex-row items-center gap-x-1">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <FontAwesome name="caret-right" color="#FCC434" size={15} />
              </View>
            </View>

            <View className="items-center">
              <Image
                className="w-[370px] h-[200px]"
                source={require("../../../../assets/images/discount.png")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
