import { useEffect } from "react";
import Router from "./navigations/Router";
import mutations, { MutationType } from "@/networks/mutations";


export type GlobalProps = {
  mutations: MutationType;
};

const App = () => {
  const globalProps: GlobalProps = {
    mutations,
  };

  useEffect(() => {
    init();
  });

  const init = async () => {};
return(

  <Router globalProps={globalProps} /> 

)};

export default App;
