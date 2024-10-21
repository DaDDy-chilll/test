/* eslint-disable react-hooks/exhaustive-deps */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import NotiItem from "../ui/NotiItem";
import { jp } from "@/lang/jp";
import Burgermenu from "@/assets/icons/Burgermenu";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import useChat from "@/hooks/useChat";
import { setNotification } from "@/store";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/utils/apiRoutes";
import { fetchServer } from "@/utils/helper";
import { QueryKey } from "@/utils/queryKey";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
export interface Notification {
  id: number;
  title: string;
  photo: string;
  description_company: string;
  type: string;
  created_at: string;
}
import { useNavigate, useLocation } from "react-router-dom";
import RouteName from "@/navigations/routes";
import { Chat } from "@/types/helperTypes";
const Header = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.auth);
  const wsURL = `wss://api.japanjob.exbrainedu.com/ws/?token=${token}&type=client`;

  let { title, name, notification } = useSelector(
    (state: RootState) => state.navigation,
  );
  let { user } = useSelector((state: RootState) => state.auth);
  const { chats, isLoading: isChatLoading } = useChat({ id: user?.id });
  const [noti, setNoti] = useState<{ [key: string]: number }>({});
  const [hasApiNotification, setHasApiNotification] = useState(false);
  const chatNoti = chats.filter((chat) => notification[chat.id] === 1);

  // websocket connection
  useEffect(() => {
    const ws = new WebSocket(wsURL);

    ws.onopen = () => {
      // console.log("WebSocket is open now.");
    };
    ws.onmessage = (event) => {
      setHasApiNotification(true);
      queryClient.invalidateQueries({ queryKey: [QueryKey.NOTIFICATION] });
    };
  }, []);

  // fetch notification
  const { data: apiNotification} = useQuery(
    {
      queryKey: [QueryKey.NOTIFICATION],
      queryFn: () => {
        return fetchServer({
          endpoint: `${apiRoutes.NOTIFICATION}`,
          method: "GET",
          token: token,
        });
      },
    },
  );

  const handleChatClick = (chat: Chat) =>
    navigate(RouteName.CHAT, { state: chat });

  const handleProfileClick = () => {
    if (location.pathname !== RouteName.PROFILE) {
      navigate(RouteName.PROFILE);
    }
  };
  // useEffect(() => {
  //   console.log(hasApiNotification);
  // }, [hasApiNotification]);

  const combinedNotifications = useMemo(() => {
    const chatNotifications = chatNoti.map((chat) => ({
      id: chat.id,
      type: "chat",
      name: chat.jobfinder_name,
      image: chat.jobfinder_profile_image,
      message: chat.last_message,
      time: moment(chat.last_message_timestamp.toDate()).fromNow(),
      timestamp: chat.last_message_timestamp.toDate().getTime(),
    }));

    const apiNotifications =
      apiNotification?.data?.map((noti: Notification) => ({
        id: noti.id,
        type: "api",
        name: noti.title,
        image: noti.photo,
        message: noti.description_company,
        time: moment(noti.created_at).fromNow(),
        timestamp: moment(noti.created_at).valueOf(),
      })) || [];
    return [...chatNotifications, ...apiNotifications].sort(
      (a, b) => b.timestamp - a.timestamp,
    );
  }, [chatNoti, apiNotification]);



  // update favicon
  // useEffect(() => {
  //   const updateFavicon = () => {
  //     const favicon = document.getElementById("favicon") as HTMLLinkElement;
  //     const notificationCount = combinedNotifications.length;

  //     if (notificationCount > 0) {
  //       const canvas = document.createElement('canvas');
  //       canvas.width = 32;
  //       canvas.height = 32;
  //       const ctx = canvas.getContext('2d');
        
  //       if (ctx) {
  //         // Draw the original favicon
  //         const img = new Image();
  //         img.src = './src/assets/icons/JapanJobLogo.png'; // Update this path to your actual favicon
  //         img.onload = () => {
  //           ctx.drawImage(img, 0, 0, 32, 32);

  //           // Draw the notification badge
  //           ctx.beginPath();
  //           ctx.arc(24, 8, 8, 0, 2 * Math.PI);
  //           ctx.fillStyle = 'red';
  //           ctx.fill();

  //           // Draw the notification count
  //           ctx.font = 'bold 12px Arial';
  //           ctx.fillStyle = 'white';
  //           ctx.textAlign = 'center';
  //           ctx.textBaseline = 'middle';
  //           ctx.fillText(notificationCount.toString(), 24, 8);

  //           // Update the favicon
  //           favicon.href = canvas.toDataURL('image/png');
  //         };
  //       }
  //     } else {
  //       // Reset to the original favicon
  //       favicon.href = './src/assets/icons/JapanJobLogo.png'; // Update this path to your actual favicon
  //     }
  //   };

  //   updateFavicon();
  // }, [combinedNotifications]);


  useEffect(() => {
    const messageListeners: any[] = [];

    chats.forEach((chat) => {
      const messagesRef = collection(db, "messages");

      const q = query(
        messagesRef,
        where("chat_id", "==", chat.id),
        where("sender_id", "!=", Number(`2${user?.id}`)),
        where("read", "==", false),
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const unreadCount = snapshot.docs.length;
        setNoti((prev) => {
          if (!prev[chat.id] || prev[chat.id] == 0) {
            return {
              ...prev,
              [chat.id]: unreadCount,
            };
          }
          return prev;
        });

        dispatch(setNotification(noti));
      });

      messageListeners.push(unsubscribe);
    });
    return () => {
      messageListeners.forEach((unsubscribe) => unsubscribe());
    };
  }, [chats, user?.id]);

  return (
    <nav className="flex sticky items-center px-5 justify-between w-full top-0 h-14 z-50 bg-white">
      <div className="flex items-center gap-2 b">
        <span className="cursor-pointer mr-5  flex items-center justify-center">
          <Burgermenu />
        </span>
        <h1 className="text-xl text-gray-900 font-semibold">{title}</h1>
      </div>
      <div className="flex gap-5">
        <div className="cursor-pointer" onClick={handleProfileClick}>
          <p
            className={` underline bg-none font-semibold ${location.pathname === RouteName.PROFILE ? "text-gray-500" : "text-primaryColor"}`}
          >
            {jp.myPage}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={() => setHasApiNotification(false)}
            className=" z-50 relative"
            title="Notifications"
          >
            <div>
              <svg
                className="cursor-pointer hover:text-red-500"
                width="18"
                height="18"
                viewBox="0 0 24 30"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.70843 25.7192C1.48359 25.7192 1.2957 25.6426 1.14476 25.4896C0.993815 25.3365 0.917814 25.1481 0.916759 24.9243C0.915703 24.7006 0.991703 24.5127 1.14476 24.3607C1.29781 24.2087 1.4857 24.1332 1.70843 24.1342H3.47543V11.5895C3.47543 9.52061 4.12987 7.70136 5.43876 6.13175C6.74765 4.56214 8.40698 3.58417 10.4168 3.19783V2.33333C10.4168 1.89317 10.5703 1.5195 10.8775 1.21233C11.1847 0.904111 11.5578 0.75 11.9969 0.75C12.436 0.75 12.8102 0.904111 13.1195 1.21233C13.4288 1.52056 13.5834 1.89422 13.5834 2.33333V3.19783C15.5932 3.58311 17.2525 4.56108 18.5614 6.13175C19.8703 7.70242 20.5248 9.52167 20.5248 11.5895V24.1342H22.2918C22.5166 24.1342 22.7045 24.2102 22.8554 24.3622C23.0074 24.5142 23.0834 24.7027 23.0834 24.9275C23.0834 25.1523 23.0074 25.3402 22.8554 25.4912C22.7034 25.6421 22.5155 25.7176 22.2918 25.7176L1.70843 25.7192ZM11.9953 29.8596C11.2902 29.8596 10.6886 29.6089 10.1903 29.1075C9.69212 28.6061 9.44301 28.0044 9.44301 27.3025H14.5572C14.5572 28.0097 14.3065 28.6124 13.8051 29.1107C13.3026 29.6089 12.6994 29.8596 11.9953 29.8596Z"
                  fill="#211E1E"
                />
              </svg>
            </div>
            {chatNoti.length ||
              (hasApiNotification && (
                <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"></div>
              ))}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[350px] z-50">
            <DropdownMenuLabel>{jp.notifications}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {combinedNotifications.length > 0 ? (
              combinedNotifications.map((item) => (
                <DropdownMenuItem key={item.id}>
                  <NotiItem
                    onClick={() => handleChatClick(item)}
                    item={{
                      name: item.name,
                      image: item.image,
                      message: item.message,
                      time: item.time,
                    }}
                  />
                </DropdownMenuItem>
              ))
            ) : (
              <div className="flex flex-col w-full items-center justify-center gap-y-2 p-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
                  />
                </svg>

                <h1>{jp.noNotifications}</h1>
              </div>
            )}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        <div>
          <h1>{name}</h1>
        </div>
      </div>
    </nav>
  );
};

export default Header;
