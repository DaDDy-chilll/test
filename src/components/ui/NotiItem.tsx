import DefaultUser from "@/assets/icons/default_user.svg";
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
  const profileImage = item.image
    ? `https://api.japanjob.exbrainedu.com/v1/file/photo/${item.image}`
    : DefaultUser;
  console.log("profileImage", profileImage);
  return (
    <div className="flex items-center justify-between w-full" onClick={onClick}>
      <div className="flex items-center justify-start gap-3">
        <div className="rounded-full  overflow-hidden">
          <img
            src={profileImage || DefaultUser}
            alt={item.name}
            className="w-10 h-10 object-cover rounded-full"
            crossOrigin="anonymous"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.message}</p>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{item.time}</p>
      </div>
    </div>
  );
};

export default NotiItem;
