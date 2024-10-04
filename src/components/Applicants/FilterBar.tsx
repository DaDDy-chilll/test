import { jp } from "@/lang/jp";
import { FilterType } from "@/types/helperTypes";

type FilterBarProps = {
  className?: string;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  jobTypes: any;
  setCurrentPage: (currentPage: number) => void;
};

const FilterBar = ({
  className,
  filter,
  setFilter,
  jobTypes,
  setCurrentPage,
}: FilterBarProps) => {
  return (
    <div
      className={`bg-white justify-start text-secondaryColor p-4 flex flex-col sm:flex-row sm:items-center gap-4 ${className}`}
    >
      <div className="flex gap-2 items-center cursor-pointer">
        <input
          type="radio"
          name="live_in_japan"
          id="livesInJapan"
          className="accent-primaryColor cursor-pointer"
          onChange={() => {
            setCurrentPage(1);
            setFilter({ ...filter, live_in_japan: "1" });
          }}
        />
        <label htmlFor="livesInJapan" className="text-sm cursor-pointer">
          {jp.liveInJapan}
        </label>
      </div>
      <div className="flex gap-2 items-center cursor-pointer">
        <input
          type="radio"
          name="live_in_japan"
          id="livesInMyanmar"
          checked={filter.live_in_japan === "0"}
          className="accent-primaryColor cursor-pointer"
          onChange={() => {
            setCurrentPage(1);
            setFilter({ ...filter, live_in_japan: "0" });
          }}
        />
        <label htmlFor="livesInMyanmar" className="text-sm cursor-pointer">
          {jp.liveInMyanmar}
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="gender"
          id="male"
          checked={filter.gender === "0"}
          className="accent-primaryColor cursor-pointer"
          onChange={() => {
            setCurrentPage(1);
            setFilter({ ...filter, gender: "0" });
          }}
        />
        <label htmlFor="male" className="cursor-pointer">{jp.male}</label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="gender"
          id="female"
          checked={filter.gender === "1"}
          className="accent-primaryColor cursor-pointer"
          onChange={() => {
            setCurrentPage(1);
            setFilter({ ...filter, gender: "1" });
          }}
        />
        <label htmlFor="female" className="cursor-pointer">{jp.female}</label>
      </div>
      {/* <select
        className="bg-secondaryColor text-white p-2 rounded-md text-sm"
        onChange={(e) => {
          setCurrentPage(1)
          setFilter({ ...filter, language: e.target.value });
        }}
      >
        <option value="Japanese" defaultValue="Japanese">
          Japanese
        </option>
        <option value="N5">N5</option>
        <option value="N4">N4</option>
        <option value="N3">N3</option>
        <option value="N2">N2</option>
        <option value="N1">N1</option>
      </select> */}
      {/* <select
        className="bg-secondaryColor text-white p-2 rounded-md text-sm"
        onChange={(e) => {
          setCurrentPage(1)
          setFilter({ ...filter, education: e.target.value });
        }}
      >
        <option value="" defaultValue="">
          Education
        </option>
        <option value="Bachelor">Bachelor</option>
        <option value="Master">Master</option>
        <option value="Diploma">Diploma</option>
      </select> */}

      <select
        className="bg-secondaryColor text-white p-2 rounded-md text-sm w-96 cursor-pointer"
        onChange={(e) => {
          setCurrentPage(1);
          setFilter({ ...filter, job_type: e.target.value });
        }}
      >
        <option value="" >{jp.jobType}</option>
        {jobTypes &&
          jobTypes.data.length > 0 &&
          jobTypes.data.map((jobType: any) => (
            <option key={jobType.id} value={jobType.id}>
              {jobType.job_type_jp}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterBar;
