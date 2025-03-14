import { Text, TouchableOpacity, View } from "react-native";
import InputComponent from "./InputComponent";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

interface InputInfoComponentProps {
  placeholder: string;
  value?: string;
  onChangeValue: (value: string) => void;
  title: string;
  isInfoUser?: boolean;
  isDob?: boolean;
  valueDate?: Date | null | string;
}

const InputInfoComponent = (props: InputInfoComponentProps) => {
  const {
    onChangeValue,
    placeholder,
    title,
    value,
    isInfoUser = false,
    isDob = false,
    valueDate,
  } = props;

  // Hàm chuyển chuỗi "dd-mm-yyyy" thành Date
  const parseDateFromString = (dateString: string): Date => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Tháng trong JS bắt đầu từ 0
  };
  // Chuyển đổi valueDate thành Date nếu là string
  const initialDate = valueDate
    ? typeof valueDate === "string"
      ? parseDateFromString(valueDate) //xu ly dd-mm-yyyy
      : valueDate
    : new Date();

  const [showPickerDate, setShowPickerDate] = useState(false);
  const [date, setDate] = useState<Date>(initialDate);

  const transStringToDate = (stringDate: string) => {
    const parts = stringDate.split("/");
    const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return dateObject;
  };

  const transDateToString = (date: Date | string) => {
    console.log("date", date);
    if (typeof date === "string") {
      const [day, month, year] = date.split("-");
      return `${day}/${month}/${year}`; // "02-09-1998" -> "02/09/1998"
    }
    return date.toLocaleDateString("en-GB");
  };
  const onChangePickerDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPickerDate(false);
    setDate(currentDate);
    // In selectedDate rõ ràng hơn
    if (selectedDate) {
      // In object Date dưới dạng chi tiết
      console.log("selectedDate (object): ", {
        date: selectedDate.toString(), // Dạng đầy đủ
        day: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1, // Tháng bắt đầu từ 0
        year: selectedDate.getFullYear(),
        hours: selectedDate.getHours(),
        minutes: selectedDate.getMinutes(),
        seconds: selectedDate.getSeconds(),
      });
    } else {
      console.log("selectedDate: undefined");
    }
    onChangeValue(transDateToString(currentDate));
  };
  return (
    <View className="py-2 flex gap-y-2 mx-2">
      <Text className="text-[#FCC434] font-base text-lg font-bold">
        {title}
      </Text>
      <View
        className={
          isInfoUser
            ? "border-[1px] border-gray-400 rounded-lg"
            : "border-b-[1px] border-gray-400"
        }
      >
        {!isDob ? (
          <InputComponent
            value={value}
            onChangeValue={onChangeValue}
            placeholder={placeholder}
          />
        ) : !showPickerDate ? (
          <TouchableOpacity onPress={() => setShowPickerDate(true)}>
            <Text className="text-white text-lg p-3">
              {/* {date ? transDateToString(date) : placeholder} */}
              {date ? transDateToString(date) : placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <RNDateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangePickerDate}
          />
        )}
      </View>
    </View>
  );
};

export default InputInfoComponent;
