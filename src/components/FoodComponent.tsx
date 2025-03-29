import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

interface Props {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  onQuantityChange: (id: string, newQuantity: number) => void;
}

const FoodComponent = ({
  id,
  name,
  image,
  price,
  quantity,
  onQuantityChange,
}: Props) => {
  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };
  const handleDecrease = () => {
    onQuantityChange(id, quantity > 0 ? quantity - 1 : 0);
  };

  return (
    <TouchableOpacity>
      <View
        className="flex-row w-full h-40 rounded-[20] mb-3" // Thêm margin-bottom để các item không dính nhau
        style={{ backgroundColor: "#1C1C1C" }}
      >
        <View className="h-full w-1/3 rounded-l-[20]">
          <Image
            source={
              image
                ? { uri: image }
                : require("../../assets/images/movie_sample.jpg")
            }
            className="w-full h-full rounded-l-[20]"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 rounded-r-[20] p-3">
          <Text className="text-2xl my-2 font-bold text-white">{name}</Text>
          {/* Dùng name từ props */}
          <View className="flex flex-row items-center gap-2">
            <FontAwesome6
              name="money-bill-1"
              size={18}
              color="white"
              className="rounded-lg"
            />
            <Text className="text-xl mb-1 text-white">
              {price.toLocaleString()} VND
            </Text>
            {/* Dùng price từ props */}
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="bg-blue-500 w-8 h-8 justify-center items-center rounded-md mx-1"
              onPress={handleDecrease}
            >
              <Text className="text-white text-lg font-bold">-</Text>
            </TouchableOpacity>
            <View className="w-10 h-8 bg-gray-100 border border-gray-300 rounded-md justify-center items-center">
              <Text className="text-base font-bold">{quantity}</Text>
            </View>
            <TouchableOpacity
              className="bg-blue-500 w-8 h-8 justify-center items-center rounded-md mx-1"
              onPress={handleIncrease}
            >
              <Text className="text-white text-lg font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodComponent;
