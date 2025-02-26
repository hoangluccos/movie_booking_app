import {Image, TextInput, View} from 'react-native';

interface InputSearchComponentProps {
  value: string;
  onChangeValue: (value: string) => void;
}

const InputSearchComponent = (props: InputSearchComponentProps) => {
  const {onChangeValue, value} = props;

  return (
    <View className="flex-row items-center bg-[#1C1C1C] rounded-lg h-11 px-3">
      <Image
        source={require('../../assets/images/search_icon.png')}
        className="w-5 h-5 mr-3"
      />
      <TextInput
        className="flex-1 text-white"
        value={value}
        onChangeText={onChangeValue}
        placeholder="Search"
        placeholderTextColor="#8C8C8C"
      />
    </View>
  );
};

export default InputSearchComponent;
