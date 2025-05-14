import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/type";

interface props {
  name: string;
  idGenre: string;
}

export default function GenreComponent({ name, idGenre }: props) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleClick = () => {
    navigation.navigate("GenreMovieScreen", { idGenre: idGenre });
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      className="bg-slate-300 px-2 py-1 rounded-lg"
    >
      <Text className="font-bold text-black">{name}</Text>
    </TouchableOpacity>
  );
}
