import { ScrollView, Text, View } from "react-native";
import TicketMovieComponent from "../../../components/TicketMovieComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect } from "react";
import { fetchAllTickets } from "../../../redux/slices/ticketSlice";
import { generateMovieId_Image } from "../../../utils/Utils";

const MyTicketScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tickets = useSelector((state: RootState) => state.tickets);
  const { movies } = useSelector((state: RootState) => state.movies);
  const movieIds = generateMovieId_Image(movies);
  useEffect(() => {
    dispatch(fetchAllTickets());
  }, []);
  console.log("ticket from redux : ", tickets);
  if (tickets.loading) {
    return (
      <View className="bg-black flex flex-1">
        <Text className="text-2xl">Loading ...</Text>
      </View>
    );
  }
  if (tickets.error) {
    return (
      <View className="bg-black flex flex-1">
        <Text className="text-2xl text-red-500">Error when loading ...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-black mt-7 px-5 gap-4">
      <ScrollView className="gap-y-2">
        <View className="flex items-center my-3">
          <Text className="text-white text-2xl font-bold">My ticket</Text>
        </View>
        {tickets.tickets.map((ticket, i) => {
          return (
            <TicketMovieComponent
              key={i}
              ticket={ticket}
              nameMovie={ticket.movieName}
              time={`${ticket.time} - ${ticket.date}`}
              place={ticket.theaterName}
              image={movieIds[ticket.movieId]}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MyTicketScreen;
