import { useDispatch } from "react-redux";
import { setSideBar } from "@/store/features/NavigationSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Burgermenu = () => {
  const { sideBar } = useSelector((state: RootState) => state.navigation);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setSideBar());

  return (
    <button onClick={handleClick}>
      {sideBar ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
    </button>
  );
};

export default Burgermenu;
