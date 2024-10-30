import moment from "moment";

type Props = {
  year: number;
  onYearSelect: (year: number) => void;
};

/**
 * This component renders a dropdown for selecting a year.
 * @param {number} year - The currently selected year.
 * @param {function} onYearSelect - Callback function to handle year selection.
 * @returns A dropdown component for year selection.
 * @author PSK
 */
const SelectYear = ({ year, onYearSelect }: Props) => {
  const currentYear = moment().year();
  const countYear = 5;
  let years = [];
  for (let i = currentYear - countYear; i <= currentYear + countYear; i++) {
    years.push(
      <option value={i} key={`year-${i}`}>
        {i}
      </option>,
    );
  }

  /**
   * This function handles the change event for the year dropdown.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event object.
   * @author PSK
   */
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value, 10);
    onYearSelect(selectedYear); // Call the function to update the year
  };

  return (
    <div className="flex justify-center items-center">
      <select
        className="bg-secondaryColor text-white px-2 rounded-md py-1"
        value={year}
        onChange={handleYearChange}
      >
        {years}
      </select>
    </div>
  );
};

export default SelectYear;
