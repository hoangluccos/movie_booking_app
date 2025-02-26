import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

interface InputOtpComponentProps {
  value: string;
  onChangeValue: (value: string) => void;
  clickResentOtp: () => void;
}

const InputOtpComponent = (props: InputOtpComponentProps) => {
  const {onChangeValue, value, clickResentOtp} = props;
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View>
      <OTPTextView
        inputCount={6}
        autoFocus
        defaultValue={value}
        handleTextChange={onChangeValue}
        textInputStyle={styles.otpInput}
        tintColor={'#FCC434'}
        offTintColor={'#FCC434'}
      />
      <View className="items-end mt-2">
        {timeLeft > 0 ? (
          <Text className="text-lg font-base text-white">{formatTime()}</Text>
        ) : (
          <TouchableOpacity onPress={clickResentOtp}>
            <Text className="text-lg font-base text-white underline">
              Gửi lại mã
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpInput: {
    width: 50,
    height: 60,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'base-Bold',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: '#261D08',
  },
});

export default InputOtpComponent;
