import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface InputSearchComponentProps {
  value: string;
  onChangeValue: (value: string) => void;
  listMovie: Movie[];
}
type Movie = {
  id: string;
  image: string;
  name: string;
};
type RootStackParamList = {
  MovieDetail: { id: string }; // Nếu MovieDetail có params, thay undefined bằng { id: string } chẳng hạn
};
const InputSearchComponent = (props: InputSearchComponentProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { onChangeValue, value, listMovie } = props;
  const [movieSearched, setMovieSearched] = useState<Movie[]>([]);
  useEffect(() => {
    console.log(value);
    if (value.trim().length === 0) {
      setMovieSearched([]);
      return;
    }
    const res = listMovie.filter((item) =>
      item.name.toLowerCase().includes(value.trim().toLowerCase())
    );
    setMovieSearched(res);
  }, [value]);
  console.log("danh sach movie", listMovie);
  console.log("ket qua search", movieSearched);
  const handleSearchItem = (id: any) => {
    console.log("navigate");
    navigation.navigate("MovieDetail", id);
  };
  return (
    <View className="w-full">
      <View className="flex-row items-center bg-[#1C1C1C] rounded-lg h-11 px-3">
        <Image
          source={require("../../assets/images/search_icon.png")}
          className="w-5 h-5 mr-3"
        />
        <TextInput
          className="flex-1 text-white"
          value={value}
          onChangeText={onChangeValue}
          placeholder="Search"
          placeholderTextColor="#8C8C8C"
        />
      </View>
      {movieSearched.length > 0 && (
        <ScrollView>
          {movieSearched.map((item) => (
            <TouchableOpacity onPress={() => handleSearchItem(item.id)}>
              <View className="p-3 bg-teal-700 rounded-sm flex-row gap-3 items-center">
                <Image
                  source={{ uri: item.image }}
                  className="w-7 h-7 rounded-sm"
                ></Image>
                <Text key={item.id} className="color-white">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default InputSearchComponent;
