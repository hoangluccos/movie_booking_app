import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import OptionProfile from "../../../components/OptionProfile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchUser, logOut } from "../../../redux/slices/userSlice";
import { User } from "../../../data/Data";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/type";
import { deleteToken } from "../../../api/Api";

interface UserState {
  user: User | null;
}
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;
const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const infoUser = useSelector<RootState, UserState>((state) => state.user);
  const { loading, error } = useSelector((state: RootState) => state.user);
  const isLoggedOut = useSelector((state: RootState) => state.user.isLogOut);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log("user profile from redux: ", infoUser);

  const handleClickImage = () => {
    navigation.navigate("ProfileInfoScreen");
  };

  const handleLogOut = () => {
    deleteToken();
    dispatch(logOut());
    console.log("user profile from redux: ", infoUser);
    //handle of click back in android
    navigation.reset({
      index: 0,
      routes: [{ name: "LogInScreen" }],
    });
  };

  useEffect(() => {
    if (isLoggedOut && infoUser.user === null) {
      navigation.navigate("LogInScreen");
    }
  }, [navigation, isLoggedOut]);

  if (loading) {
    return (
      <View className="bg-black flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-2">Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View className="bg-black flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">Error: {error}</Text>
        <TouchableOpacity
          onPress={() => dispatch(fetchUser())}
          className="mt-4 bg-gray-700 p-2 rounded"
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          onPress={() => handleClickImage()}
        >
          <View>
            <AntDesign name="edit" size={23} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="mt-[50] w-full gap-5">
        {/* <OptionProfile text={"Ticket"} nameIcon={"ticket-alt"} />
        <OptionProfile text={"Payment history"} nameIcon={"shopping-cart"} />
        <OptionProfile text={"Change language"} nameIcon={"language"} /> */}
        <OptionProfile
          text={"Change password"}
          nameIcon={"lock"}
          navigateTo={{
            screen: "ChangePasswordScreen",
            params: { email: infoUser.user?.email || "" },
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleLogOut()}
          className="w-[200] px-3 py-3 mx-auto bg-red-500 mt-8 rounded-md justify-center flex flex-row gap-2 items-center "
        >
          <Ionicons name="log-out" size={24} color="black" />
          <Text className="text-white font-bold">Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
