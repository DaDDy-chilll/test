

const FilterBar = () => {
    return (
        <div className="bg-white text-secondaryColor p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex gap-2 items-center">
                <input type="checkbox" id="livesInJapan" className="accent-primaryColor" />
                <label htmlFor="livesInJapan" className="text-sm">Lives in Japan</label>
            </div>
            <div className="flex gap-2 items-center">
                <input type="checkbox" id="livesInMyanmar" className="accent-primaryColor" />
                <label htmlFor="livesInMyanmar" className="text-sm">Lives in Myanmar</label>
            </div>
            <div className="flex gap-2 items-center">
                <input type="radio" name="gender" id="male" className="accent-primaryColor" />
                <label htmlFor="male">Male</label>
            </div>
            <div className="flex gap-2 items-center">
                <input type="radio" name="gender" id="female" className="accent-primaryColor" />
                <label htmlFor="female">Female</label>
            </div>
            <select className="bg-secondaryColor text-white p-2 rounded-md text-sm">
                <option value="" >Japanese</option>
                <option value="JLPT N4" >JLPT N4</option>
            </select>
            <select className="bg-secondaryColor text-white p-2 rounded-md text-sm">
                <option value="Bachelor"  >Bachelor</option>
            </select>


<select className="bg-secondaryColor text-white p-2 rounded-md text-sm w-[37%]">
                <option defaultValue={"Job Type"}  >Job Type</option>
            </select>
           
        </div>
    );
};

export default FilterBar;
