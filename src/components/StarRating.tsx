import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type StarRatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxStars?: number;
  size?: number;
};

const StarRating = ({
  rating,
  onRatingChange,
  maxStars = 5,
  size = 24,
}: StarRatingProps) => {
  return (
    <View className="flex-row">
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        const filled = starNumber <= rating;
        return (
          <Pressable key={index} onPress={() => onRatingChange(starNumber)}>
            <Text
              className={`mx-0.5 ${
                filled ? "text-yellow-400" : "text-gray-300"
              }`}
              style={{ fontSize: size }}
            >
              {filled ? (
                <AntDesign name="star" size={30} color="#facc15" />
              ) : (
                <AntDesign name="staro" size={30} color="#facc15" />
              )}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default StarRating;
