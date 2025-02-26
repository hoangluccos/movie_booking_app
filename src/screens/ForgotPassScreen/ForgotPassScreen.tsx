import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { putApi } from "../../api/Api";

const ForgotPassScreen = ({ route, navigation }: any) => {
  const email = route.params?.email || "No value";
  const otp = route.params?.otp || "No value";

  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);

  const handleClickShowPassword = () => {
    setIsShowPass(!isShowPass);
  };

  const handleClickShowConfirmPassword = () => {
    setIsShowConfirmPass(!isShowConfirmPass);
  };

  const handleClickDone = () => {
    if (passwordValue.trim() !== "" && confirmPasswordValue.trim() !== "") {
      if (passwordValue === confirmPasswordValue) {
        const params = {
          email: email,
          password: passwordValue,
          passwordConfirm: confirmPasswordValue,
          otp: otp,
        };
        // console.log('Params: ', params);
        putApi(
          "/api/users/changePassword",
          params,
          false,
          (error, response) => {
            if (error) {
              console.log("Error with post: ", error);
            } else {
              console.log("Reponse: ", response.message);
              navigation.navigate("Login");
            }
          }
        );
      } else {
        console.log("Xác nhận mật khẩu không trùng khớp");
      }
    } else {
      console.log("Vui lòng nhập đầy đủ thông tin");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        className="bg-black w-full h-full px-4"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="space-y-28">
          <View className="space-y-4">
            <View className="space-y-4">
              {/* input password cus */}
              <View className="relative border-b border-gray-400">
                <Text className="text-[#FCC434] font-base text-2xl">
                  Password
                </Text>
                <TextInput
                  value={passwordValue}
                  onChangeText={setPasswordValue}
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

              {/* input password cus */}
              <View className="relative border-b border-gray-400">
                <Text className="text-[#FCC434] font-base text-2xl">
                  Confirm Password
                </Text>
                <TextInput
                  value={confirmPasswordValue}
                  onChangeText={setConfirmPasswordValue}
                  placeholder=""
                  secureTextEntry={!isShowConfirmPass}
                  className="border-white text-white font-base text-lg w-full"
                />
                <TouchableOpacity
                  onPress={() => handleClickShowConfirmPassword()}
                  className="absolute right-4 top-10"
                >
                  {isShowConfirmPass ? (
                    <Icon name="eye" size={24} color="white" />
                  ) : (
                    <Icon name="eye-with-line" size={24} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <ButtonComponent
              type="default"
              onClick={() => handleClickDone()}
              title="Done"
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassScreen;
