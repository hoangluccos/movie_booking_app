import { Text, View } from "react-native";
import ToggleComponent from "../../../components/ToggleComponent";
import MovieComponent from "../../../components/MovieComponent";
import { useState } from "react";

const MovieScreen = () => {
  const [isSelectFirst, setIsSelectFirst] = useState(false); //default select first element in ToggleComponent
  console.log("thay doi ");
  //uef, depen[isSelectFirst]
  return (
    <View className="bg-black flex-1 mt-7 p-3">
      <ToggleComponent
        isSelectFirst={isSelectFirst}
        setIsSelectFirst={setIsSelectFirst}
      />
      {/* List movies */}
      <View className="flex flex-row flex-wrap gap-5 justify-start ml-5">
        {/* mặc định flex của View la column */}
        <MovieComponent />
        <MovieComponent />
        <MovieComponent />
      </View>
    </View>
  );
};

export default MovieScreen;
