import useFetch from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import {RootState} from "@/store/store"

const Guide = () => {
  const {token} = useSelector((state: RootState) => state.auth)
  console.log(token)
  const videoUrl = "https://www.youtube.com/embed/6R4ioDuG2xY";

  return (
    <main className="w-full h-[90vh] p-4">
      <iframe
        className="w-full h-full"
        src={videoUrl}
        title="ミャンマー、カンボジア、インドンネシア、バングラディッシュからの技能実習、特定技能のことなら学文協同組合へ"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </main>
  );
};

export default Guide;
