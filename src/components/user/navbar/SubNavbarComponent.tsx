import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { subNavItemsProp } from "@/models/dataModel";
const SubNavbarComponent = ({
  subNavItems,
  text,
}: {
  subNavItems: Array<subNavItemsProp>;
  text: string;
}) => {
  const navigate = useNavigate();
  const redirect = ({ route, state }: any) => {
    navigate(route, {
      state,
    });
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center bg-[#F7F7F7] w-full text-[14px] rounded-[10px] text-black font-semibold py-[10px] px-[50px]">
        <div>{text}</div>
        <div className="flex flex-row justify-between items-center">
          {subNavItems.map(
            ({ Title, route }: subNavItemsProp, index: number) => {
              return (
                <div
                  key={index}
                  onClick={route ? () => redirect({ route }) : () => {}}
                  className={`${index === 0 && " text-primary "}  ${
                    route === null ? "text-gray-500 cursor-not-allowed" : "nav"
                  }`}
                >
                  {typeof Title === "string" ? Title : <Title />}
                  {index !== subNavItems.length - 1 && (
                    <ArrowForwardIosIcon
                      style={{ fontSize: 15 }}
                      className={`${
                        index == subNavItems.length - 2 && "text-gray-500"
                      } mx-3 text-black`}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};
export default SubNavbarComponent;
