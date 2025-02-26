import {
  Button,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import InputComponent from '../../components/InputComponent';
import {useEffect, useState} from 'react';
import ButtonComponent from '../../components/ButtonComponent';
import Icon from 'react-native-vector-icons/Entypo';
import {postApi} from '../../api/Api';
import {useRecoilState} from 'recoil';
import {StateSendOtpAtom} from '../../Atom/StateSendOtpAtom';

const VerifyEmailScreen = ({navigation}: any) => {
  const [emailValue, setEmailValue] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [stateSendOtp, setStateSendOtp] = useRecoilState(StateSendOtpAtom);

  useEffect(() => {
    console.log('State Send: ', stateSendOtp);
  });

  const handleClickContinue = () => {
    Keyboard.dismiss();
    if (emailValue.trim() !== '') {
      if (emailRegex.test(emailValue)) {
        const params = {
          email: emailValue,
        };

        const url =
          stateSendOtp === 'Register'
            ? '/api/verify/registration'
            : stateSendOtp === 'ForgotPassword'
            ? '/api/verify/forgotPassword'
            : '';

        console.log('Url: ', url);

        postApi(url, params, false, (error, response) => {
          if (error) {
            console.log('Error with post: ', error);
          } else {
            console.log('Reponse: ', response.result);
            navigation.navigate('VerifyOtp', {email: emailValue});
          }
        });
      } else {
        console.log('Email không hợp lệ');
      }
    } else {
      console.log('Email không được để trống');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="w-full h-full bg-black px-4 pt-10 justify-between">
        <View className="space-y-4">
          <View className="flex-row border-b-[1px] border-gray-400">
            <View className="justify-center items-center mr-2">
              <Icon name="mail" color="white" size={30} />
            </View>
            <InputComponent
              placeholder=""
              value={emailValue}
              onChangeValue={setEmailValue}
            />
          </View>
          <View className="h-[10px]" />
          <ButtonComponent
            type="default"
            onClick={() => handleClickContinue()}
            title="Continue"
          />
        </View>
        {stateSendOtp === 'Register' ? (
          <View className="space-y-4">
            <View className="flex-row justify-center items-center">
              <View className="bg-white flex-1 h-[1px]" />
              <Text className="text-white flex-1 font-base text-center">
                Or continue with
              </Text>
              <View className="bg-white flex-1 h-[1px]" />
            </View>
            <View className="h-[50px] w-full bg-[#1A1A1A] justify-center items-center rounded-full flex-row space-x-2">
              <View>
                <Image
                  source={require('../../../assets/images/facebook_icon.png')}
                />
              </View>
              <Text className="text-white font-base">Facebook</Text>
            </View>
            <View className="h-[50px] w-full bg-[#1A1A1A] justify-center items-center rounded-full flex-row space-x-2">
              <View>
                <Image
                  source={require('../../../assets/images/google_icon.png')}
                />
              </View>
              <Text className="text-white font-base">Google</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-sm font-base text-center py-6">
                By sign in or sign up, you agree to our Terms of Service and
                Privacy Policy
              </Text>
            </View>
          </View>
        ) : (
          <></>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default VerifyEmailScreen;
