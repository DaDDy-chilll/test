

const FilterBar = () => {
    return (
        <div className="bg-black text-white p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex gap-2 items-center">
                <input type="checkbox" id="livesInJapan" className="accent-white" />
                <label htmlFor="livesInJapan">Lives in Japan</label>
            </div>
            <div className="flex gap-2 items-center">
                <input type="checkbox" id="livesInMyanmar" className="accent-white" />
                <label htmlFor="livesInMyanmar">Lives in Myanmar</label>
            </div>
            <select className="bg-gray-800 text-white p-2 rounded-md">
                <option value="">Japanese</option>
                <option value="JLPT N4">JLPT N4</option>
            </select>
            <select className="bg-gray-800 text-white p-2 rounded-md">
                <option value="Bachelor">Bachelor</option>
            </select>
            <input 
                type="text" 
                placeholder="Job Type" 
                className="bg-gray-800 text-white p-2 rounded-md flex-grow" 
            />
            <div className="flex gap-2 items-center">
                <input type="radio" name="gender" id="male" className="accent-white" />
                <label htmlFor="male">Male</label>
            </div>
            <div className="flex gap-2 items-center">
                <input type="radio" name="gender" id="female" className="accent-white" />
                <label htmlFor="female">Female</label>
            </div>
            <div className="p-2 rounded-md bg-gray-800 text-white flex justify-center items-center cursor-pointer">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M3.75 2.25a.75.75 0 0 1 .75.75v4.79l2.02-2.02a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.02 2.02V3a.75.75 0 0 1 .75-.75zm16.5 0a.75.75 0 0 1 .75.75v4.79l2.02-2.02a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.02 2.02V3a.75.75 0 0 1 .75-.75zM3.75 18.75a.75.75 0 0 1-.75-.75v-4.79l-2.02 2.02a.75.75 0 0 1-1.06-1.06l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06l-2.02-2.02v4.79a.75.75 0 0 1-.75.75zm16.5 0a.75.75 0 0 1-.75-.75v-4.79l-2.02 2.02a.75.75 0 0 1-1.06-1.06l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06l-2.02-2.02v4.79a.75.75 0 0 1-.75.75zM8.5 19.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7z" clipRule="evenodd"/>
                </svg>
            </div>
        </div>
    );
};

export default FilterBar;
