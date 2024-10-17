import useFetch from "@/hooks/useFetch";
import { apiRoutes } from "@/utils/apiRoutes";
import { QueryKey } from "@/utils/queryKey";

const PrivacyPolicy = () => {
  const { data } = useFetch({
    endpoint: apiRoutes.PRIVACY_POLICY,
    key: QueryKey.PRIVACY_POLICY,
    enabled: true,
  });
  const html = data?.data[0].description_jp;
  return (
    <div
      className="container mx-auto w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default PrivacyPolicy;
