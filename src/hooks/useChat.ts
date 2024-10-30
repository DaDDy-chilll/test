/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  query,
  where,
  collection,
  orderBy,
  onSnapshot,
  limit as firestoreLimit,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Chat } from "@/types/helperTypes";
import { useState } from "react";

type useChatProps = {
  id: number | string | undefined;
  limit?: number | null;
};

let isEnd: boolean | null = null;
let hasMore: boolean | null = null;
let LIMIT = 10;

/**
 * Custom hook for fetching chat messages.
 * @param {useChatProps} param0 - The chat parameters including id and limit.
 * @returns {object} - Contains chats, loading state, error, refetch function, refetching state, isEnd, and hasMore.
 * @author PSK
 */
const useChat = ({ id, limit }: useChatProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refetching, setRefetching] = useState<boolean>(false);

  /**
   * Effect hook to fetch chats when id changes.
   * @author PSK
   */
  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getChats();
  }, [id]);

  /**
   * Function to fetch chat messages from Firestore.
   * @author PSK
   */
  const getChats = () => {
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("company_id", "==", id), //company id
      orderBy("last_message_timestamp", "desc"),
      firestoreLimit(limit || LIMIT),
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedChats: Chat[] = [];
        querySnapshot.forEach((doc) =>
          fetchedChats.push({ id: doc.id, ...doc.data() } as Chat),
        );
        setChats(fetchedChats);
        if (fetchedChats.length !== LIMIT) {
          isEnd = true;
        } else {
          isEnd = false;
          hasMore = true;
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching chats:", error);
        setError("Failed to fetch chats. Please try again.");
      },
    );
    setRefetching(false);
    return () => unsubscribe();
  };

  /**
   * Function to refetch chat messages with increased limit.
   * @author PSK
   */
  const refetch = () => {
    if (!id || refetching || isEnd) return;
    setRefetching(true);
    setIsLoading(true);
    // setChats([]);
    LIMIT += 10;
    getChats();
  };

  return {
    chats,
    isLoading,
    error,
    refetch,
    refetching,
    isEnd,
    hasMore,
  };
};

export default useChat;
