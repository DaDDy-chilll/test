import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { QueryKey } from "@/utils/queryKey";
import { Helmet } from "react-helmet";
import { jp } from "@/lang/jp";
import { Loading } from "@/components";
import { LOGO } from "@/assets/icons/LOGO";

const PrivacyPolicy = () => {
  const { data, isLoading } = useFetch({
    endpoint: apiRoutes.PRIVACY_POLICY,
    key: QueryKey.PRIVACY_POLICY,
    enabled: true,
  });
  const html = data?.data[0].description_jp || "";
  return (
    <>
      {isLoading && <Loading />}
      <Helmet>
        <title>{jp.privacyPolicy} - Japan Job</title>
      </Helmet>
      <main className="w-full bg-gray-200 relative">
        <header className="sticky top-0 flex items-center justify-between bg-white p-3 px-16">
          <LOGO className="w-14 h-14" />
        </header>
        <section className="container  w-full space-y-3 my-4 px-20">
          <h1 className="text-2xl font-bold text-center">{jp.privacyPolicy}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
        <footer className="text-start text-sm text-gray-500 pb-12 px-20">
          © {new Date().getFullYear()} Japan Job All rights reserved
        </footer>
      </main>
    </>
  );
};

export default PrivacyPolicy;
