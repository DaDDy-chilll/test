import { useEffect } from "react";
import Router from "./navigations/Router";

/**
 * Main App component
 * @returns {JSX.Element} The main router component
 */
const App = () => {
  /**
   * useEffect hook to initialize the app
   * @function
   */
  useEffect(() => {
    init();
  }, []);

  /**
   * This function is used to initialize the app
   * @async
   * @function
   * @returns {Promise<void>} An empty promise
   */
  const init = async () => {};

  return <Router />;
};

export default App;
