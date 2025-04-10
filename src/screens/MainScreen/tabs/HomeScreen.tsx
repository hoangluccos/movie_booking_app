import {
  Dimensions,
  Image,
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
import { useEffect, useState } from "react";
import { GenreType, MovieType } from "../../../data/Data";
import { getApi } from "../../../api/Api";
import { formatDuration } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies, setMovies } from "../../../redux/slices/movieSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { setIsLogOut } from "../../../redux/slices/userSlice";

const HomeScreen = ({ navigation }: any) => {
  const { width: screenWidth } = Dimensions.get("window");
  const sliderWidth = screenWidth;

  const dispatch = useDispatch<AppDispatch>();
  const [activeSlide, setActiveSlide] = useState(0);

  const [searchValue, setSearchValue] = useState("");

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const listMovie = movies || [];

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(setIsLogOut(false));
  }, [dispatch]);

  const handleClickMovie = (id: string) => {
    console.log("Click on movie", id);
    navigation.navigate("MovieDetail", id);
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
          <View className="py-4 flex-row justify-between">
            <View>
              <Text className="text-lg text-white">Hi, Friends</Text>
              <Text className="text-2xl text-white">Wellcome Back</Text>
            </View>
            <View className="justify-center">
              <FontAwesome name="bell-o" color="white" size={35} />
            </View>
          </View>
          <View>
            <InputSearchComponent
              value={searchValue}
              onChangeValue={setSearchValue}
              listMovie={listMovie}
            />
          </View>
          <View>
            <View className="flex-row justify-between items-center py-4">
              <Text className="text-white text-xl">Now Playing</Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <FontAwesome name="caret-right" color="#FCC434" size={15} />
              </View>
            </View>

            {/* Đang chiếu */}
            <View className="items-center pb-4">
              <Carousel
                layout="default"
                data={listMovie}
                renderItem={showMovieNowPlayingCus}
                sliderWidth={sliderWidth}
                itemWidth={300}
                inactiveSlideOpacity={0.5} //làm mờ ảnh
                inactiveSlideScale={0.85} //làm nhỏ ảnh
                onSnapToItem={(index) => setActiveSlide(index)}
                loop
                containerCustomStyle={{}} // Thêm dòng này
              />
              {/* <Pagination
              dotsLength={listMovie.length}
              activeDotIndex={activeSlide}
              containerStyle={{paddingVertical: 10}}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: '#3498db',
              }}
              inactiveDotStyle={{backgroundColor: '#ccc'}}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            /> */}
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
