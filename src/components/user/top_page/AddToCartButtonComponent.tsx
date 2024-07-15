import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

interface AddToCartButtonComponentProps {
  title: string;
  action: () => void;
}
const AddToCartButtonComponent = ({
  title,
  action,
}: AddToCartButtonComponentProps) => {
  return (
    <div
      onClick={action}
      className="flex flex-row items-center bg-primary rounded-tl-[5px] rounded-tr-[25px] rounded-br-[25px] rounded-bl-[5px] h-[45px] hover:shadow-md shadow-gray-900 nav"
    >
      <div className="flex-1 text-[16px] text-center text-white">{title}</div>
      <div className="flex items-center justify-center bg-[#fff] rounded-full w-[35px] h-[35px] mr-[5px] text-primary">
        <ShoppingCartOutlinedIcon style={{ width: 20, height: 20 }} />
      </div>
    </div>
  );
};

export default AddToCartButtonComponent;
