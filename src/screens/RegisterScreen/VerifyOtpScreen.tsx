import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import InputOtpComponent from '../../components/InputOtpComponent';
import {useEffect, useState} from 'react';
import ButtonComponent from '../../components/ButtonComponent';
import {postApi} from '../../api/Api';
import {StateSendOtpAtom} from '../../Atom/StateSendOtpAtom';
import {useRecoilState} from 'recoil';

const VerifyOtpScreen = ({route, navigation}: any) => {
  const email = route.params?.email || 'No value';
  const [otpValue, setOtpValue] = useState('');
  const [stateSendOtp, setStateSendOtp] = useRecoilState(StateSendOtpAtom);

  const handleClickContinue = () => {
    console.log('Otp: ', otpValue);
    if (otpValue.length === 6) {
      const params = {
        email: email,
        otp: otpValue,
      };
      postApi('/api/verify/verifyOtp', params, false, (error, response) => {
        if (error) {
          console.log('Error with post: ', error);
        } else {
          console.log('Reponse: ', response.result);
          if (response.result === true) {
            if (stateSendOtp === 'Register') {
              navigation.navigate('Register', {otp: otpValue, email: email});
            } else if (stateSendOtp === 'ForgotPassword') {
              navigation.navigate('ForgotPassword', {
                otp: otpValue,
                email: email,
              });
            }
            setStateSendOtp('');
          }
        }
      });
    } else {
      console.log('Chưa nhập đủ giá trị otp');
    }
  };

  const handleClickResentOtp = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="bg-black w-full h-full px-4">
        <View className="space-y-4">
          <Text className="text-[#FCC434] font-base text-3xl">
            Confirm OTP code
          </Text>
          <Text className="text-white font-base pb-12">
            You just need to enter the OTP sent to the registered email {email}
          </Text>
        </View>
        <View className="pb-6">
          <InputOtpComponent
            value={otpValue}
            onChangeValue={setOtpValue}
            clickResentOtp={handleClickResentOtp}
          />
        </View>
        <View>
          <ButtonComponent
            type="default"
            onClick={() => handleClickContinue()}
            title="Continue"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOtpScreen;
