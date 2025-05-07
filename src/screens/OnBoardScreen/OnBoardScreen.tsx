import { Image, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
// import { useRecoilState, useSetRecoilState } from "recoil";
// import { StateSendOtpAtom } from "../../Atom/StateSendOtpAtom";
import { useState } from "react";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { GOOGLE_CLIENT_ID } from "@env";

const OnBoardScreen = ({ navigation }: any) => {
  // const [stateSendOtp, setStateSendOtp] = useRecoilState(StateSendOtpAtom);
  const handleClickSignin = () => {
    navigation.navigate("Login");
  };
  const handleClickSignUp = () => {
    navigation.navigate("VerifyEmailScreen");
    // setStateSendOtp("Register");
  };
  const handleLoginSuccess = (token: string) => {
    console.log("JWT Token:", token);
    // lưu vào Redux, AsyncStorage,...
  };
  return (
    <View className="w-full h-full flex-col justify-center items-center gap-y-5 bg-black">
      <View>
        <Image source={require("../../../assets/images/logo.png")} />
      </View>
      <View className="justify-center items-center space-y-3">
        <Text className="text-white text-xl font-base">LHBoking Hello</Text>
        <Text className="text-white font-base">Enjoy your favorite movies</Text>
      </View>
      <View className="w-full px-4">
        <ButtonComponent
          type="default"
          onClick={() => handleClickSignin()}
          title="Đăng nhập"
        />
      </View>
      <View className="w-full px-4">
        <ButtonComponent
          type="info"
          onClick={() => handleClickSignUp()}
          title="Đăng ký"
        />
      </View>
      <View className="justify-center items-center">
        <Text className="text-gray-400 text-sm font-base text-center">
          Bằng cách đăng nhập hoặc đăng ký, bạn đồng ý với Điều khoản dịch vụ
          Chính sách bảo mật của chúng tôi
        </Text>
      </View>
      {/* <TouchableOpacity
        onPress={handleLoginGoogle}
        className="flex flex-row items-center justify-center gap-x-2 p-3 bg-slate-400 rounded-[50]"
      >
        <AntDesign name="google" size={20} color="white" />
        <Text className="text-white">Login with Google</Text>
      </TouchableOpacity> */}
      {/* <GoogleLoginButton onLoginSuccess={handleLoginSuccess} /> */}
    </View>
  );
};

export default OnBoardScreen;
