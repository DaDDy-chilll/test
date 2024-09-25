import { useEffect } from "react";
import {
  query,
  where,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Chat } from "@/types/helperTypes";
import { useState } from "react";

type useChatProps = {
  id: number | string | undefined;
}

const useChat = ({ id }: useChatProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // setIsLoading(true);
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("company_id", "==", id), //company id
      orderBy("last_message_timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedChats: Chat[] = [];
        querySnapshot.forEach((doc) => {
          fetchedChats.push({ id: doc.id, ...doc.data() } as Chat);
        });
        setChats(fetchedChats);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching chats:", error);
        setError("Failed to fetch chats. Please try again.");
      }
    );

    return () => unsubscribe();

  }, [id]);
  return { chats, isLoading, error };
}

export default useChat;