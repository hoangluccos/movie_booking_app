import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import {useState} from 'react';
import InputInfoComponent from '../../components/InputInfoComponent';
import Icon from 'react-native-vector-icons/Entypo';
import DatePickerModal from './Modal/DatePickerModal';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import {postApi} from '../../api/Api';

const RegisterScreen = ({route, navigation}: any) => {
  const email = route.params?.email || 'No value';
  const otp = route.params?.otp || 'No value';
  const genderData: RadioButtonProps[] = [
    {
      id: '1',
      label: 'Nam',
      value: '1',
    },
    {
      id: '2',
      label: 'Nữ',
      value: '2',
    },
  ];

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [firstnameValue, setFirstnameValue] = useState('');
  const [lastnameValue, setLastnameValue] = useState('');
  const [dateOfBirthValue, setDateOfBirthValue] = useState(new Date());
  const [genderValue, setGenderValue] = useState(genderData[0].id);

  const [isShowPass, setIsShowPass] = useState(false);
  const [openDatePickerModal, setOpenDatePickerModal] = useState(false);

  const handleClickDone = () => {
    console.log('Date: ', dateOfBirthValue);
    if (
      usernameValue.trim() !== '' &&
      passwordValue.trim() !== '' &&
      firstnameValue.trim() !== '' &&
      lastnameValue.trim() !== ''
    ) {
      const params = {
        username: usernameValue,
        password: passwordValue,
        firstName: firstnameValue,
        lastName: lastnameValue,
        dateOfBirth: dateOfBirthValue,
        gender: Number(genderValue),
        email: email,
        avatar: '',
        otp: otp,
      };

      // console.log('Params: ', params);
      postApi('/api/users/', params, false, (error, response) => {
        if (error) {
          console.log('Error with post: ', error);
        } else {
          console.log('Reponse: ', response.result);
          navigation.navigate('Login');
        }
      });
    } else {
      console.log('Vui lòng nhập đầy đủ thông tin');
    }
  };
  const handleClickShowPassword = () => {
    setIsShowPass(!isShowPass);
  };

  const toggleDatePickerModal = () => {
    setOpenDatePickerModal(!openDatePickerModal);
  };

  const handleClickDateOfBirth = () => {
    setOpenDatePickerModal(true);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="bg-black w-full h-full px-4"
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View className="space-y-28">
            <View className="space-y-4">
              <View className="space-y-2">
                <InputInfoComponent
                  value={usernameValue}
                  onChangeValue={setUsernameValue}
                  placeholder=""
                  title="Username"
                />
                {/* input password cus */}
                <View className="relative border-b border-gray-400">
                  <Text className="text-[#FCC434] font-base text-base">
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
                    className="absolute right-4 top-10">
                    {isShowPass ? (
                      <Icon name="eye" size={24} color="white" />
                    ) : (
                      <Icon name="eye-with-line" size={24} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
                <InputInfoComponent
                  value={firstnameValue}
                  onChangeValue={setFirstnameValue}
                  placeholder=""
                  title="First Name"
                />
                <InputInfoComponent
                  value={lastnameValue}
                  onChangeValue={setLastnameValue}
                  placeholder=""
                  title="Last Name"
                />
              </View>

              {/* Select Date of birth */}
              <View className="space-y-4">
                <Text className="text-[#FCC434] font-base text-base">
                  Date of birth
                </Text>
                <Pressable
                  className="border border-gray-500 rounded-md px-4 py-2"
                  onPress={() => handleClickDateOfBirth()}>
                  <Text className="text-lg font-base text-white">
                    {dateOfBirthValue
                      ? new Date(dateOfBirthValue).toLocaleDateString('vi-VN')
                      : 'Select Date'}
                  </Text>
                </Pressable>
              </View>

              {/* Gender */}
              <View className="space-y-4">
                <Text className="text-[#FCC434] font-base text-nase">
                  Gender
                </Text>
                <View className="justify-between">
                  <RadioGroup
                    radioButtons={genderData.map(item => ({
                      ...item,
                      color: '#FCC434',
                      labelStyle: {
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: 'bold',
                      },
                    }))}
                    onPress={setGenderValue}
                    selectedId={genderValue}
                    layout="row"
                    containerStyle={{justifyContent: 'space-around'}}
                  />
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
      {
        <DatePickerModal
          dateValue={dateOfBirthValue}
          setDateValue={setDateOfBirthValue}
          toggleModal={toggleDatePickerModal}
          onOpen={openDatePickerModal}
        />
      }
    </>
  );
};

export default RegisterScreen;
