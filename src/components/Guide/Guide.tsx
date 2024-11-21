import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { apiRoutes } from "@/utils/apiRoutes";
import {Loading} from "@/components";
import { setTitle } from "@/store";
import { useDispatch } from "react-redux";
import {jp} from "@/lang/jp";


const Guide = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data,isLoading } = useFetch({
    endpoint: apiRoutes.GUIDE_VIDEO,
    token: token || undefined,
  });

  useEffect(() => {dispatch(setTitle(jp.guide))});
  
  const videoUrl = `https://www.youtube.com/embed/${data?.data[0]?.client_guide_url.split('/').pop()}`
  return (
    <main className="w-full h-[90vh] p-4">
      {isLoading ? (
        <Loading />
      ) : (
        <iframe
        className="w-full h-full"
        src={videoUrl}
        title="ミャンマー、カンボジア、インドンネシア、バングラディッシュからの技能実習、特定技能のことなら学文協同組合へ"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        ></iframe>
      )}
    </main>
  );
};

export default Guide;


