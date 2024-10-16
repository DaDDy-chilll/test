import { jp } from "@/lang/jp";
import { FilterType } from "@/types/helperTypes";
import { Checkbox } from "@/components";
import { useRef } from "react";

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
  const maleType = useRef<boolean>(true);
  const femaleType = useRef<boolean>(true);

  const genderChange = () => {
    if (
      (maleType.current && femaleType.current) ||
      (!maleType.current && !femaleType.current)
    ) {
      return "";
    } else if (maleType.current && !femaleType.current) {
      return "0";
    } else {
      return "1";
    }
  };

  const defaultLocation = [
    { label: jp.liveInMyanmar, value: 2 },
    { label: jp.liveInJapan, value: 1 },
  ];

  return (
    <div
      className={`bg-white justify-end text-secondaryColor px-4 flex flex-col sm:flex-row sm:items-center gap-4 ${className}`}
    >
      <div className="flex gap-2 items-center">
        <Checkbox
          name="gender"
          id="male"
          defaultChecked={true}
          onChange={(checked) => {
            setCurrentPage(1);
            if (checked) {
              maleType.current = true;
            } else {
              maleType.current = false;
            }
            setFilter({ ...filter, gender: genderChange() });
          }}
        />
        <label htmlFor="male" className="cursor-pointer">
          {jp.male}
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox
          name="gender"
          id="female"
          defaultChecked={true}
          onChange={(checked) => {
            setCurrentPage(1);
            if (checked) {
              femaleType.current = true;
            } else {
              femaleType.current = false;
            }
            setFilter({ ...filter, gender: genderChange() });
          }}
        />
        <label htmlFor="female" className="cursor-pointer">
          {jp.female}
        </label>
      </div>

      <select
        aria-label="国"
        title="国"
        className="bg-secondaryColor text-white p-2 rounded-md text-sm w-fit cursor-pointer"
        onChange={(e) => {
          setCurrentPage(1);
          setFilter({ ...filter, live_in_japan: e.target.value });
        }}
      >
        <option value="" autoFocus>
          {jp.chooseCountry}
        </option>
        {defaultLocation.map((location: any) => (
          <option key={location.value} value={location.value}>
            {location.label}
          </option>
        ))}
      </select>

      <select
        aria-label="職種"
        title="職種"
        className="bg-secondaryColor text-white p-2 rounded-md text-sm w-fit cursor-pointer"
        onChange={(e) => {
          setCurrentPage(1);
          setFilter({ ...filter, job_type: e.target.value });
        }}
      >
        <option value="">{jp.jobType}</option>
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
