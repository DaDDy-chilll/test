import DefaultUser from "@/assets/icons/default_user.svg";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type ItemProps = {
  item: {
    image: string;
    name: string;
    message: string;
    time: string;
  };
  onClick: () => void;
};

const NotiItem = ({ item, onClick }: ItemProps) => {
  const { imgUrl } = useSelector((state: RootState) => state.app);
  let profileImage;

  if (item.image) {
    if (item.image.startsWith("http")) {
      const imageArray = item.image.split("/");
      const imageName = imageArray[imageArray.length - 1];
      if (imageName) {
        profileImage = item.image;
      } else {
        profileImage = DefaultUser;
      }
    } else {
      profileImage = `${imgUrl}photo/${item.image}`;
    }
  } else {
    profileImage = DefaultUser;
  }

  return (
    <div
      className="flex items-center justify-between w-full my-1"
      onClick={onClick}
    >
      <div className="flex items-center justify-start gap-3">
        <div className="rounded-full  overflow-hidden">
          <img
            src={profileImage || DefaultUser}
            alt={item.name}
            className="w-10 h-10 object-cover rounded-full"
            crossOrigin="anonymous"
          />
        </div>
        <div className="w-52">
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.message}</p>
        </div>
      </div>
      <div className="text-end">
        <p className="text-xs text-muted-foreground">{item.time}</p>
      </div>
    </div>
  );
};

export default NotiItem;
