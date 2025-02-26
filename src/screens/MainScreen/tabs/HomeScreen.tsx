import {
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import InputSearchComponent from '../../../components/InputSearchComponent';
import {useEffect, useState} from 'react';
import {genreType, movieType} from '../../../data/Data';
import {getApi} from '../../../api/Api';
import {formatDuration} from '../../../utils/Utils';

const HomeScreen = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [searchValue, setSearchValue] = useState('');
  const [listMovie, setListMovie] = useState<movieType[]>([]);

  const {width: screenWidth} = Dimensions.get('window');
  const sliderWidth = screenWidth;

  useEffect(() => {
    getApi('/api/movies/', false, (error, response) => {
      if (error) {
        console.log('Error with get: ', error);
      } else {
        console.log('Reponse: ', response.result);
        setListMovie(response.result);
      }
    });
  }, []);

  const showMovieNowPlayingCus = ({item}: {item: movieType}) => {
    return (
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
            {formatDuration(item.duration)} •{' '}
            {item.genres
              .slice(0, 2)
              .map(genre => genre.name)
              .join(', ')}
          </Text>
        </View>
        <View className="flex-row justify-center items-center space-x-2">
          <AntDesign name="star" size={20} color="#FCC434" />
          <Text className="text-gray-400">{item.rate}</Text>
        </View>
      </View>
    );
  };

  const showMovieComingSoonCus = (item: movieType) => {
    return (
      <View className="w-[170px]">
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
          <View className="flex-row items-center space-x-2">
            <Image
              source={require('../../../../assets/images/video_icon.png')}
            />
            <Text className="text-gray-400">
              {item.genres
                .slice(0, 1)
                .map(genre => genre.name)
                .join(', ')}
            </Text>
          </View>
        </View>
        <View>
          <View className="flex-row items-center space-x-2">
            <Image
              source={require('../../../../assets/images/calendar_icon.png')}
            />
            <Text className="text-gray-400">{item.premiere}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        className="bg-black w-full h-full px-4"
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View>
          <View className="py-4 flex-row justify-between">
            <View>
              <Text className="text-lg text-white">Hi, Huy</Text>
              <Text className="text-2xl text-white">Wellcome Back </Text>
            </View>
            <View className="justify-center">
              <Icon name="notifications" color="white" size={35} />
            </View>
          </View>
          <View>
            <InputSearchComponent
              value={searchValue}
              onChangeValue={setSearchValue}
            />
          </View>
          <View>
            <View className="flex-row justify-between items-center py-4">
              <Text className="text-white text-xl">Now Playing</Text>
              <View className="flex-row items-center">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  color="#FCC434"
                  size={15}
                />
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
                onSnapToItem={index => setActiveSlide(index)}
                loop
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
              <View className="flex-row items-center">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  color="#FCC434"
                  size={15}
                />
              </View>
            </View>

            <View>
              <ScrollView className="space-x-4" horizontal>
                {listMovie.map(item => (
                  <View key={item.id}>{showMovieComingSoonCus(item)}</View>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Giảm giá */}
          <View className="pb-4">
            <View className="flex-row justify-between items-center py-4">
              <Text className="text-white text-xl">Promo & Discount</Text>
              <View className="flex-row items-center">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  color="#FCC434"
                  size={15}
                />
              </View>
            </View>

            <View className="items-center">
              <Image
                className="w-[370px] h-[200px]"
                source={require('../../../../assets/images/discount.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
