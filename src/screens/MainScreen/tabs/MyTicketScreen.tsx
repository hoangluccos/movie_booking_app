import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TicketMovieComponent from "../../../components/TicketMovieComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
  fetchAllTickets,
  sortByFarthestDate,
  sortByNearestDate,
} from "../../../redux/slices/ticketSlice";
import { generateMovieId_Image } from "../../../utils/Utils";
import { FontAwesome5 } from "@expo/vector-icons";

const MyTicketScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tickets = useSelector((state: RootState) => state.tickets);
  const { movies } = useSelector((state: RootState) => state.movies);
  const movieIds = generateMovieId_Image(movies);
  const [openModalFilter, setOpeModalFilter] = useState(false);
  const [filterBy, setFilterBy] = useState<"nearest" | "farthest">("farthest");

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, []);
  console.log("ticket from redux : ", tickets);

  useEffect(() => {
    if (filterBy === "nearest") {
      dispatch(sortByNearestDate());
    } else {
      dispatch(sortByFarthestDate());
    }
  }, [filterBy]);

  const handleClickFilterIcon = () => {
    setOpeModalFilter(true);
  };

  const handleSelectFilterOption = (option: "nearest" | "farthest") => {
    setFilterBy(option);
    setOpeModalFilter(false);
  };
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
      <Modal animationType="fade" transparent={true} visible={openModalFilter}>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
          className="flex-1"
        >
          <TouchableOpacity
            className="flex-1"
            onPress={() => setOpeModalFilter(false)}
          />
          <View className="flex px-3 absolute top-20 bottom-0 right-5 left-5 h-[130] bg-blue-50 rounded-md">
            <Text className="text-lg font-bold mb-4 text-center mt-2">
              Sắp xếp theo
            </Text>

            <TouchableOpacity
              className="flex-row items-center gap-x-3 mb-4"
              onPress={() => handleSelectFilterOption("nearest")}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  filterBy === "nearest" ? "border-blue-600" : "border-gray-400"
                } items-center justify-center`}
              >
                {filterBy === "nearest" && (
                  <View className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                )}
              </View>
              <Text className="text-base">Ngày xa nhất</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center gap-x-3 mb-2"
              onPress={() => handleSelectFilterOption("farthest")}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  filterBy === "farthest"
                    ? "border-blue-600"
                    : "border-gray-400"
                } items-center justify-center`}
              >
                {filterBy === "farthest" && (
                  <View className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                )}
              </View>
              <Text className="text-base">Ngày gần nhất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView className="gap-y-2">
        <View className="flex items-center my-3">
          <Text className="py-1 text-white text-2xl font-bold">My ticket</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleClickFilterIcon()}
          className="absolute top-4 right-3 p-1 bg-slate-500 rounded-lg"
        >
          <FontAwesome5
            name="filter"
            size={22}
            color="white"
            className="rounded-lg"
          />
        </TouchableOpacity>
        {tickets.tickets.map((ticket, i) => {
          return (
            <TicketMovieComponent
              key={i}
              ticket={ticket}
              nameMovie={ticket.movieName}
              time={`${ticket.startTime} - ${ticket.dateScreenTime}`}
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
