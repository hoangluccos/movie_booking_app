import {Button, Pressable, Text} from 'react-native';

interface ButtonComponentProps {
  title: string;
  type?: 'default' | 'info';
  onClick: () => void;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const {onClick, title, type} = props;

  const handleCheckColor = () => {
    switch (type) {
      case 'info':
        return {
          bgColor: 'bg-[#000000]',
          borderColor: 'border-[#FFFFFF]',
          textColor: 'text-white',
        };
      default:
        return {
          bgColor: 'bg-[#FCC434]',
          borderColor: 'border-[#FCC434]',
          textColor: 'text-black',
        };
    }
  };

  const {bgColor, textColor, borderColor} = handleCheckColor();

  return (
    <Pressable
      className={`h-[50px] items-center justify-center rounded-full w-full border ${borderColor} ${bgColor}`}
      onPress={onClick}>
      <Text className={`text-xl font-base ${textColor}`}>{title}</Text>
    </Pressable>
  );
};

export default ButtonComponent;
