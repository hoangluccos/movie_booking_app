import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User } from "../../data/Data";
interface UserState {
  user: User | null;
}
const ProfileInfoScreen = () => {
  const userInfo = useSelector<RootState, UserState>((state) => state.user);
  console.log(userInfo);
  const [avatar, setAvatar] = useState<any>(userInfo?.user?.avatar);
  const handleErrorAvatar = () => {
    console.log("Loi anh roi");
    setAvatar(require("../../../assets/images/user.png"));
  };
  return (
    <View className="bg-black flex flex-1">
      <View className="bg-orange-400 h-[150] w-full"></View>
      <View className="m-8 bg-green-400 w-[200] h-[200]">
        <Image
          source={avatar}
          className="w-[50] h-[50]"
          onError={handleErrorAvatar}
        />
      </View>
    </View>
  );
};

export default ProfileInfoScreen;
