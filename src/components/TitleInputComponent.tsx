import { Text, TextInput, View } from "react-native";

type TitleInputComponent = {
  title: string;
  placeholder: string;
  setState: any;
  value: string;
};
const TitleInputComponent = (props: TitleInputComponent) => {
  return (
    <>
      <View className="text-white my-2 border-b border-gray-400">
        <Text className="text-yellow-500 text-lg">{props.title}</Text>
        <TextInput
          value={props.value}
          onChangeText={props.setState}
          placeholder={props.placeholder}
          className="border-white text-white font-base text-lg"
        />
      </View>
    </>
  );
};

export default TitleInputComponent;
