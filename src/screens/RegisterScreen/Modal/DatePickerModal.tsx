import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DatePickerModalProps {
  dateValue: Date;
  setDateValue: (date: Date) => void;
  onOpen: boolean;
  toggleModal: () => void;
}

const DatePickerModal = (props: DatePickerModalProps) => {
  const {dateValue, onOpen, setDateValue, toggleModal} = props;
  return (
    <>
      <DatePicker
        modal
        open={onOpen}
        date={dateValue}
        mode="date"
        onConfirm={date => {
          toggleModal();
          setDateValue(date);
        }}
        onCancel={() => {
          toggleModal();
        }}
      />
    </>
  );
};

export default DatePickerModal;
