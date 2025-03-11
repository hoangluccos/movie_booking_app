import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import OptionProfile from "../../../components/OptionProfile";
import { useEffect } from "react";
import { getApi } from "../../../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { setUser } from "../../../redux/slices/userSlice";
import { User } from "../../../data/Data";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/type";

interface UserState {
  user: User | null;
}
interface ApiResponse {
  result: User;
}

const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const infoUser = useSelector<RootState, UserState>((state) => state.user);
  useEffect(() => {
    getApi("/api/users/bio", true, (error: any, res: ApiResponse) => {
      if (!error) {
        console.log("user profile: ", res.result);
        dispatch(setUser(res.result));
      }
    });
  }, []);
  type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ProfileScreen"
  >;
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  console.log("user profile from redux: ", infoUser);
  return (
    <View className="bg-black flex-1 px-3 py-10 mt-7">
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
            {infoUser?.user?.username || "Not find user"}
          </Text>
          <View>
            <View className="flex-row gap-3 items-center mt-2">
              <AntDesign name="mail" size={18} color="gray" />
              <Text className="text-gray-100">
                {infoUser?.user?.email || "Not find email"}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="absolute top-1 right-2"
          onPress={() => {
            navigation.navigate("ProfileInfoScreen");
          }}
        >
          <View>
            <AntDesign name="edit" size={23} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="mt-[50] w-full gap-5">
        <OptionProfile text={"Ticket"} nameIcon={"ticket-alt"} />
        <OptionProfile text={"Payment history"} nameIcon={"shopping-cart"} />
        <OptionProfile text={"Change language"} nameIcon={"language"} />
        <OptionProfile text={"Change password"} nameIcon={"lock"} />
      </View>
    </View>
  );
};

export default ProfileScreen;
