import { useDispatch } from "react-redux";
import { setSideBar } from "@/store/features/NavigationSlice";

const Burgermenu = () => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(setSideBar());

  return (
    <button onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        viewBox="0 -960 960 960"
        width="30px"
        fill="#000000"
      >
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg>
    </button>
  );
};

export default Burgermenu;
