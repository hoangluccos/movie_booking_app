import { TouchableOpacity, View, Text, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { MovieType } from "../data/Data";
import { formatDuration } from "../utils/Utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/type";

const { width } = Dimensions.get("window");

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const MovieComponent = ({ item }: { item: MovieType }) => {
  const nav = useNavigation<NavigationProps>();
  const handlePress = () => {
    console.log("log ", item);
    nav.navigate("MovieDetail", { id: item.id });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        className="bg-[#bfbfbf] rounded-lg"
        style={{
          width: width * 0.42,
          height: 340,
        }}
      >
        <View className="w-full h-[200]">
          <Image
            source={{ uri: item.image }}
            className="w-full h-full rounded-t-lg"
            resizeMode="cover"
          />
        </View>

        <View className="p-2 flex-col justify-between h-[120]">
          <Text
            className="text-xl font-bold"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ minHeight: 48 }}
          >
            {item.name || "Untitled"}
          </Text>

          <View className="flex-col">
            <View
              className="flex flex-row items-center gap-3"
              style={{ minHeight: 20 }}
            >
              <FontAwesome5 name="star" size={16} color="yellow" />
              <Text numberOfLines={1} className="font-semibold">
                {item.rate || "N/A"}
              </Text>
            </View>

            <View
              className="flex flex-row items-center gap-3"
              style={{ minHeight: 20 }}
            >
              <FontAwesome5 name="clock" size={16} color="yellow" />
              <Text numberOfLines={1} className="font-semibold">
                {formatDuration(item.duration) || "N/A"}
              </Text>
            </View>

            <View
              className="flex flex-row items-center gap-3"
              style={{ minHeight: 20 }}
            >
              <FontAwesome5 name="film" size={16} color="yellow" />
              <Text
                className="font-semibold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.genres && item.genres.length > 0
                  ? item.genres
                      .slice(0, 2)
                      .map((genre) => genre.name)
                      .join(", ")
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieComponent;
