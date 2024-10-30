import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  selected: any;
  setInterview: (interview: any) => void;
};

const InterviewDatePicker = ({ selected, setInterview }: Props) => {
  return (
    <DatePicker
      className="w-full text-sm border rounded p-1 border-gray-500 font-semibold text-center"
      selected={selected}
      onChange={setInterview}
      popperPlacement="bottom-start"
    />
  );
};

export default InterviewDatePicker;
