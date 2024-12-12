import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  selected: any;
  setInterview: (interview: any) => void;
};

const InterviewDatePicker = ({ selected, setInterview }: Props) => {
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
  };
  return (
    <DatePicker
      className="w-full text-sm border rounded p-1 border-gray-500 font-semibold text-center"
      selected={selected}
      onChange={setInterview}
      popperPlacement="bottom-start"
      filterDate={isWeekday}
    />
  );
};

export default InterviewDatePicker;
