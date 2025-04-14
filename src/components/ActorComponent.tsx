import { View, Text, Image } from "react-native";
import React, { useState } from "react";

interface ActorProps {
  nameActor: string;
  gender: boolean;
  image: string;
}
const ActorComponent = ({ nameActor, gender, image }: ActorProps) => {
  const [imageSource, setImageSource] = useState({ uri: image });
  const defaultImage = require("../../assets/images/profile.png");
  const handleImageError = (error: any) => {
    console.log("Image load error:", error.nativeEvent.error);
    setImageSource(defaultImage);
  };
  return (
    <View className="bg-gray-700 max-w-[130] h-[50] rounded-[10] flex flex-row items-center gap-2 mx-1">
      <View className="flex flex-row items-center justify-center gap-1 mx-2">
        <Image
          source={imageSource} // Nguồn ảnh động
          className="min-w-[40] max-w-[50] h-[40] rounded-[50]"
          onError={handleImageError}
        />
        <View className="flex flex-col flex-1">
          <Text
            className="font-bold text-white"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {nameActor}
          </Text>
          <Text className="text-gray text-white">
            {gender ? "Male" : "Female"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActorComponent;
