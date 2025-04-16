import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  name: string;
  rate: number;
  content: string;
};

const DetailFeedback = ({ name, rate, content }: Props) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={16}
          color={i <= rate ? "#facc15" : "#d1d5db"} // vàng & xám
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 12,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{name}</Text>
      <View style={{ flexDirection: "row", marginVertical: 4 }}>
        {renderStars()}
      </View>
      <Text style={{ fontSize: 15 }}>{content}</Text>
    </View>
  );
};

export default DetailFeedback;
