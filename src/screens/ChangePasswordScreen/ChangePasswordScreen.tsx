import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import InputOtpComponent from "../../components/InputOtpComponent";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  changePassword,
  sendOTP,
  updateVariablePw,
} from "../../redux/slices/userSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

const OTP_LENGTH = 6;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChangePasswordScreen = () => {
  const [isOpenOTP, setIsOpenOTP] = useState(false);
  const [valueOTP, setValueOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigation = useNavigation<NavigationProp>();
  const route =
    useRoute<RouteProp<RootStackParamList, "ChangePasswordScreen">>();
  console.log("Route", route);

  const dispatch = useDispatch<AppDispatch>();
  const { loading: isSendingOTP, error: otpError } = useSelector(
    (state: RootState) => state.user
  );
  const [otpSentSuccessfully, setOtpSentSuccessfully] = useState(false);
  const { changePasswordSuccess } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (otpError) {
      Alert.alert("Lỗi", `Gửi OTP thất bại: ${otpError}`);
      setIsOpenOTP(false);
    } else if (isSendingOTP === false && isOpenOTP && !otpError) {
      setOtpSentSuccessfully(true);
      Alert.alert("Thông báo", "Mã OTP đã được gửi đến email của bạn.");
    }
  }, [otpError, isSendingOTP, isOpenOTP]);

  useEffect(() => {
    if (changePasswordSuccess) {
      Alert.alert("Bạn đã đổi mật khẩu thành công");
      navigation.goBack();
      dispatch(updateVariablePw(false));
    }
  }, [changePasswordSuccess]);

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
    dispatch(changePassword(dataSend));
  };

  const handleChangeConfirmNewPassword = (value: string) => {
    setConfirmNewPassword(value);
  };

  const handleChangeNewPassword = (value: string) => {
    setNewPassword(value);
  };
  const handleChangeOtp = (value: string) => {
    setValueOTP(value);
  };

  const handleResendOTP = () => {
    console.log("Resend OTP");
  };

  const handleClickOTP = () => {
    if (route.params.email) {
      dispatch(sendOTP(route.params.email));
    }
    setIsOpenOTP(true);
  };
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View className="flex flex-1 bg-gray-900 mt-7 px-4 py-3">
      <TouchableOpacity onPress={handleBack}>
        <Ionicons
          className="relative top-2 left-2"
          name="arrow-back"
          size={36}
          color="white"
        />
      </TouchableOpacity>
      <View className="flex items-center mt-10 mb-5">
        <TouchableOpacity
          onPress={handleClickOTP}
          className="flex justify-center items-center bg-[#FCC434] min-h-[30] min-w-[80] rounded-md py-2"
        >
          <Text>{isSendingOTP ? "Đang gửi OTP..." : "Send OTP"}</Text>
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
            editable={valueOTP.length === OTP_LENGTH}
            style={{ opacity: valueOTP.length === OTP_LENGTH ? 1 : 0.5 }}
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Confirm New Password"
            secureTextEntry={true}
            value={confirmNewPassword}
            onChangeText={handleChangeConfirmNewPassword}
            className="bg-red-50 text-black text-2xl my-2 rounded-md p-2"
            editable={valueOTP.length === OTP_LENGTH}
            style={{ opacity: valueOTP.length === OTP_LENGTH ? 1 : 0.5 }}
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className={`bg-[#FCC434] py-3 rounded-md items-center mt-5 ${
              valueOTP.length !== OTP_LENGTH ? "opacity-50" : ""
            }`}
            disabled={valueOTP.length !== OTP_LENGTH}
          >
            <Text className="text-lg font-bold">Gửi</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChangePasswordScreen;
