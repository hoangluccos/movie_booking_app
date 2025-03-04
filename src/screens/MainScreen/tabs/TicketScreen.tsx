import { Text, View } from "react-native";
import TicketMovieComponent from "../../../components/TicketMovieComponent";

const TicketScreen = () => {
  return (
    <View className="flex-1 bg-black mt-7 px-5 gap-4">
      <View className="flex items-center my-3">
        <Text className="text-white text-2xl font-bold">My ticket</Text>
      </View>
      <TicketMovieComponent />
      <TicketMovieComponent />
      <TicketMovieComponent />
    </View>
  );
};

export default TicketScreen;
