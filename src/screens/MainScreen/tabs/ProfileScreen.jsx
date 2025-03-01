import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import OptionProfile from "../../../components/OptionProfile";
import { useEffect } from "react";
import { getApi } from "../../../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slices/userSlice";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.user);
  useEffect(() => {
    getApi("/api/users/bio", true, (error, res) => {
      if (!error) {
        console.log("user profile: ", res.result);
        dispatch(setUser(res.result));
      }
    });
  }, []);
  console.log("user profile from redux: ", infoUser);
  return (
    <View className="bg-black flex-1 px-3 py-10 mt-8">
      <View className="flex-row gap-5">
        <Image
          source={
            infoUser?.user?.avatar
              ? { uri: infoUser.user.avatar }
              : require("../../../../assets/images/user.png")
          }
          className="w-[80] h-[80] bg-white rounded-[50]"
        />
        <View>
          <Text className="text-white font-bold text-3xl">
            {infoUser.user.username}
          </Text>
          <View>
            <View className="flex-row gap-3 items-center">
              <AntDesign name="mail" size={18} color="gray" />
              <Text className="text-gray-100">{infoUser.user.email}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="absolute top-1 right-2">
          <View>
            <AntDesign name="edit" size={23} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="mt-[50] w-full gap-5">
        <OptionProfile text={"Ticket"} />
        <OptionProfile text={"Payment history"} />
        <OptionProfile text={"Change language"} />
        <OptionProfile text={"Change password"} />
      </View>
    </View>
  );
};

export default ProfileScreen;
