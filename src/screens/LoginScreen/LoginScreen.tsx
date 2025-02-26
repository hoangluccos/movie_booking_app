import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import InputComponent from "../../components/InputComponent";
import { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { loginApi } from "../../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import InputInfoComponent from "../../components/InputInfoComponent";
import Icon from "react-native-vector-icons/Entypo";
import { useRecoilState } from "recoil";
import { StateSendOtpAtom } from "../../Atom/StateSendOtpAtom";

const LoginScreen = ({ navigation }: any) => {
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
        navigation.navigate("Main");
      }
    });
  };

  const handleClickShowPassword = () => {
    setIsShowPass(!isShowPass);
  };

  const handleClickForgotPassword = () => {
    navigation.navigate("VerifyEmail");
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
        <View className="w-full h-full items-center justify-center px-4 space-y-6">
          <View>
            <Image source={require("../../../assets/images/logo.png")} />
          </View>
          <View className="w-full">
            <InputInfoComponent
              value={username}
              onChangeValue={setUsername}
              placeholder=""
              title="Username"
            />
          </View>
          <View className="relative border-b border-gray-400 w-full mb-20">
            <View className="flex-row justify-between">
              <Text className="text-[#FCC434] font-base text-base">
                Password
              </Text>
              <TouchableOpacity onPress={() => handleClickForgotPassword()}>
                <Text className="text-[#FCC434] font-base text-base underline">
                  Forgot your password?
                </Text>
              </TouchableOpacity>
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
                <Icon name="eye" size={24} color="white" />
              ) : (
                <Icon name="eye-with-line" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View className="w-full items-center">
            <ButtonComponent onClick={handleClickLogIn} title="Log in" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
