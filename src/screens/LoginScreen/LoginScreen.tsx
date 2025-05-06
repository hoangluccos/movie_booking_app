import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { loginApi } from "../../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { StateSendOtpAtom } from "../../Atom/StateSendOtpAtom";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/type";

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [stateSendOtp, setStateSendOtp] = useRecoilState(StateSendOtpAtom);

  const handleClickLogIn = () => {
    console.log("Click Log in");
    loginApi(username, password, (error, response) => {
      if (error) {
        console.log("Error with login: ", error);
      } else {
        console.log("Response: ", response);
        // console.log("Token: ", response.result.token);
        AsyncStorage.setItem("token", response.result.token);
        navigation.navigate("MainScreen");
      }
    });
  };
  const handleClickToOnboard = () => {
    navigation.navigate("OnBoardScreen");
  };

  const handleClickShowPassword = () => {
    setIsShowPass(!isShowPass);
  };

  const handleClickForgotPassword = () => {
    navigation.navigate("VerifyEmailScreen");
    setStateSendOtp("ForgotPassword");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full h-full items-center justify-center px-4 space-y-2">
          <View>
            <Image source={require("../../../assets/images/logo.png")} />
          </View>
          <View className="relative border-b border-gray-400 w-full my-1">
            <View className="flex-row justify-between">
              <Text className="text-[#FCC434] font-base text-base font-semibold ">
                Username
              </Text>
            </View>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder=""
              className="border-white text-white font-base text-lg w-full"
            />
          </View>
          <View className="relative border-b border-gray-400 w-full my-1">
            <View className="flex-row justify-between">
              <Text className="text-[#FCC434] font-base text-base font-semibold ">
                Password
              </Text>
            </View>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder=""
              secureTextEntry={!isShowPass}
              className="border-white text-white font-base text-lg w-full"
            />
            <TouchableOpacity
              onPress={() => handleClickShowPassword()}
              className="absolute right-4 top-10"
            >
              {isShowPass ? (
                <Entypo name="eye" size={24} color="white" />
              ) : (
                <Entypo name="eye-with-line" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View className="my-5 flex flex-row justify-end">
            <TouchableOpacity onPress={() => handleClickForgotPassword()}>
              <Text className="text-[#FCC434] font-base text-base underline">
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full items-center">
            <ButtonComponent onClick={handleClickLogIn} title="Log in" />
          </View>
          <TouchableOpacity
            className="mt-3 flex flex-row items-center gap-2"
            onPress={handleClickToOnboard}
          >
            <Ionicons name="arrow-back" color="white" size={26} />
            <Text className=" underline text-yellow-500">
              Back to OnBoardScreen
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
