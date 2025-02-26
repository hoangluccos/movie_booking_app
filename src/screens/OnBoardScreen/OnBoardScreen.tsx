import {Image, Text, View} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {StateSendOtpAtom} from '../../Atom/StateSendOtpAtom';
import {useState} from 'react';

const OnBoardSceeen = ({navigation}: any) => {
  const [stateSendOtp, setStateSendOtp] = useRecoilState(StateSendOtpAtom);
  const handleClickSignin = () => {
    navigation.navigate('Login');
  };

  const handleClickSignUp = () => {
    navigation.navigate('VerifyEmail');
    setStateSendOtp('Register');
  };

  return (
    <View className="w-full h-full justify-center items-center space-y-4 bg-black">
      <View>
        <Image source={require('../../../assets/images/logo.png')} />
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
          Bằng cách đăng nhập hoặc đăng ký, bạn đồng ý với Điều khoản dịch vụ và
          Chính sách bảo mật của chúng tôi
        </Text>
      </View>
    </View>
  );
};

export default OnBoardSceeen;
