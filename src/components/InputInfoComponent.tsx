import {Text, View} from 'react-native';
import InputComponent from './InputComponent';

interface InputInfoComponentProps {
  placeholder: string;
  value: string;
  onChangeValue: (value: string) => void;
  title: string;
}

const InputInfoComponent = (props: InputInfoComponentProps) => {
  const {onChangeValue, placeholder, title, value} = props;
  return (
    <View className="py-2">
      <Text className="text-[#FCC434] font-base text-base">{title}</Text>
      <View className="border-b-[1px] border-gray-400">
        <InputComponent
          value={value}
          onChangeValue={onChangeValue}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

export default InputInfoComponent;
