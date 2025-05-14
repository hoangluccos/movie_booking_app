import { ScrollView, Text, View } from "react-native";
import ToggleComponent from "../../../components/ToggleComponent";
import MovieComponent from "../../../components/MovieComponent";
import { useEffect, useState } from "react";
import { getApi } from "../../../api/Api";
import { MovieType } from "../../../data/Data";

const MovieScreen = () => {
  const [isSelectFirst, setIsSelectFirst] = useState(true); //default select first element in ToggleComponent
  const [listMovie, setListMovie] = useState<MovieType[]>([]);
  console.log("thay doi ");
  //uef, depen[isSelectFirst]
  useEffect(() => {
    getApi("/api/movies/", false, (error, response) => {
      if (error) {
        console.log("Error with get: ", error);
      } else {
        console.log("Response List Movies: ", response.result);
        setListMovie(response.result);
      }
    });
    //
  }, []);

  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nowPlayingMovies = listMovie.filter((movie) => {
    const premiereDate = parseDate(movie.premiere);
    return premiereDate <= today;
  });

  const comingSoonMovies = listMovie.filter((movie) => {
    const premiereDate = parseDate(movie.premiere);
    return premiereDate > today;
  });

  const movies = isSelectFirst ? nowPlayingMovies : comingSoonMovies;

  return (
    <View className="bg-black flex-1 mt-7 p-3">
      <ToggleComponent
        isSelectFirst={isSelectFirst}
        setIsSelectFirst={setIsSelectFirst}
      />
      {/* List movies */}

      <ScrollView>
        <View className="flex flex-row flex-wrap gap-5 justify-start ml-4">
          {/* mặc định flex của View la column */}
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieComponent key={movie.id} item={movie} />
            ))
          ) : (
            <Text className="text-white">No movies available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieScreen;
