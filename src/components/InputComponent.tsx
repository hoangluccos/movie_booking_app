import {TextInput, View} from 'react-native';

interface InputComponentProps {
  placeholder: string;
  value: string;
  onChangeValue: (value: string) => void;
}

const InputComponent = (props: InputComponentProps) => {
  const {onChangeValue, placeholder, value} = props;

  return (
    <TextInput
      className="border-white text-white font-base text-lg w-full"
      value={value}
      onChangeText={onChangeValue}
      placeholder={placeholder}
      placeholderTextColor="gray"
    />
  );
};

export default InputComponent;
