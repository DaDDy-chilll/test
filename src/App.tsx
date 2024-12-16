import { useEffect } from "react";
import Router from "./navigations/Router";
import { apiRoutes } from "@/utils/apiRoutes";
import useFetch from "@/hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setImgUrl } from "@/store";


/**
 * Main App component
 * @returns {JSX.Element} The main router component
 */
const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const { data,isSuccess } = useFetch({
    endpoint: apiRoutes.GUIDE_VIDEO,
    token: token || undefined,
  });

  /**
   * useEffect hook to initialize the app
   * @function
   */
  useEffect(() => {
    init();
  }, [isSuccess]);

  /**
   * This function is used to initialize the app
   * @async
   * @function
   * @returns {Promise<void>} An empty promise
   */
  const init =  () => {
    if(isSuccess){
      dispatch(setImgUrl(data.data[0].base_route))
    }
  };

  return <Router />;
};

export default App;
