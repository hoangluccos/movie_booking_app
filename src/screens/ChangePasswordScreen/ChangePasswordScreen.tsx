import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import InputOtpComponent from "../../components/InputOtpComponent";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/type";
const ChangePasswordScreen = () => {
  const [isOpenOTP, setIsOpenOTP] = useState(false);
  const [valueOTP, setValueOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const route =
    useRoute<RouteProp<RootStackParamList, "ChangePasswordScreen">>();

  console.log("Route", route);

  const handleSubmit = () => {
    if (!isOpenOTP) {
      Alert.alert("Lỗi", "Vui lòng gửi và nhập mã OTP trước.");
      return;
    }

    if (valueOTP.length !== 6) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ mã OTP.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    // Gọi API để thay đổi mật khẩu ở đây
    const dataSend = {
      email: route.params.email,
      password: newPassword,
      passwordConfirm: confirmNewPassword,
      otp: valueOTP,
    };
    console.log("Dữ liệu gửi đi:", dataSend);
  };

  const handleChangeConfirmNewPassword = (value: string) => {
    setConfirmNewPassword(value);
  };

  const handleChangeNewPassword = (value: string) => {
    setNewPassword(value);
  };
  const handleChangeOtp = (value: string) => {
    console.log(value);
    setValueOTP(value);
  };
  const handleResendOTP = () => {
    console.log("Resend OTP");
  };
  const handleClickOTP = () => {
    console.log("Gửi mã OTP");
    setIsOpenOTP(true);
  };
  return (
    <View className="flex flex-1 bg-gray-900 mt-7 px-4 py-3">
      <View className="flex items-center mt-10 mb-5">
        <TouchableOpacity
          onPress={handleClickOTP}
          className="flex justify-center items-center bg-[#FCC434] min-h-[30] min-w-[80] rounded-md py-2"
        >
          <Text>Send OTP</Text>
        </TouchableOpacity>
      </View>

      {isOpenOTP && (
        <InputOtpComponent
          value={valueOTP}
          onChangeValue={handleChangeOtp}
          clickResentOtp={handleResendOTP}
        />
      )}

      {isOpenOTP && (
        <View>
          <TextInput
            placeholder="New Password"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={handleChangeNewPassword}
            className="bg-red-50 text-black text-2xl my-2 rounded-md border-blue-200 p-2"
            editable={valueOTP.length === 6} // Chỉ cho phép nhập khi OTP đủ 6 k tự
            style={{ opacity: valueOTP.length === 6 ? 1 : 0.5 }} // Sử dụng prop style
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Confirm New Password"
            secureTextEntry={true}
            value={confirmNewPassword}
            onChangeText={handleChangeConfirmNewPassword}
            className="bg-red-50 text-black text-2xl my-2 rounded-md p-2"
            editable={valueOTP.length === 6} // Chỉ cho phép nhập khi OTP đủ 6 ký tự
            style={{ opacity: valueOTP.length === 6 ? 1 : 0.5 }} // Sử dụng prop style
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className={`bg-[#FCC434] py-3 rounded-md items-center mt-5 ${
              valueOTP.length !== 6 ? "opacity-50" : ""
            }`}
            disabled={valueOTP.length !== 6} // Vô hiệu hóa nút gửi nếu OTP chưa đủ
          >
            <Text className="text-lg font-bold">Gửi</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChangePasswordScreen;
