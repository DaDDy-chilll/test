import { FilterType } from "@/types/helperTypes";

type FilterBarProps = {
  className?: string;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

const FilterBar = ({ className, filter, setFilter }: FilterBarProps) => {
  return (
    <div
      className={`bg-white text-secondaryColor p-4 flex flex-col sm:flex-row sm:items-center gap-4 ${className}`}
    >
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="livesInJapan"
          className="accent-primaryColor"
          onChange={() => {
            setFilter({ ...filter, livesInJapan: !filter.livesInJapan });
          }}
        />
        <label htmlFor="livesInJapan" className="text-sm">
          Lives in Japan
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="livesInMyanmar"
          className="accent-primaryColor"
          onChange={() => {
            setFilter({ ...filter, livesInMyanmar: !filter.livesInMyanmar });
          }}
        />
        <label htmlFor="livesInMyanmar" className="text-sm">
          Lives in Myanmar
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="gender"
          id="male"
          className="accent-primaryColor"
          onChange={() => {
            setFilter({ ...filter, gender: "male" });
          }}
        />
        <label htmlFor="male">Male</label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="gender"
          id="female"
          className="accent-primaryColor"
          onChange={() => {
            setFilter({ ...filter, gender: "female" });
          }}
        />
        <label htmlFor="female">Female</label>
      </div>
      <select
        className="bg-secondaryColor text-white p-2 rounded-md text-sm"
        onChange={(e) => {
          setFilter({ ...filter, language: e.target.value });
        }}
      >
        <option value="Japanese" defaultValue="Japanese">Japanese</option>
        <option value="N5" >N5</option>
        <option value="N4" >N4</option>
        <option value="N3" >N3</option>
        <option value="N2" >N2</option>
        <option value="N1" >N1</option>
      </select>
      <select
        className="bg-secondaryColor text-white p-2 rounded-md text-sm"
        onChange={(e) => {
          setFilter({ ...filter, education: e.target.value });
        }}
      >
        <option value="" defaultValue="">Education</option>
        <option value="Bachelor">Bachelor</option>
        <option value="Master">Master</option>
        <option value="Diploma">Diploma</option>
      </select>

      <select
        className="bg-secondaryColor text-white p-2 rounded-md text-sm w-[36%]"
        onChange={(e) => {
          setFilter({ ...filter, jobType: e.target.value });
        }}
      >
        <option defaultValue={"Job Type"} >Job Type</option>
        <option value="IT">IT</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
      </select>
    </div>
  );
};

export default FilterBar;
