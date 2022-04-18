import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Session } from "next-auth/core/types";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

export type IMessage = {
  _id: string;
  sender: IUserChat;
  content: string;
  chat: IChat;
};
export type IUserChat = {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  token?: string;
};
export interface IChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: IUserChat[];
  groupAdmin?: IUserChat;
  latestMessage?: IMessage;
}

export type INotification = {
  _id: string;
  sender: IUserChat;
  content: string;
  chat: IChat;
};

type chatContextType = {
  user: IUserChat;
  // setUser: Dispatch<SetStateAction<IUserChat>>;
  setUser: any;
  selectedChat: IChat;
  // setSelectedChat: Dispatch<SetStateAction<IChat>>;
  setSelectedChat: any;
  chats: IChat[];
  // setChats: Dispatch<SetStateAction<IChat[]>>;
  setChats: any;
  notification: INotification[];
  setNotification: any;
};

export const chatContextDefaultValues: chatContextType = {
  user: { _id: "", name: "", email: "", profilePic: "" },
  setUser: null,
  selectedChat: { _id: "", chatName: "", isGroupChat: false, users: [] },
  setSelectedChat: null,
  chats: [],
  setChats: null,
  notification: [],
  setNotification: null,
};

const ChatContext = createContext<chatContextType>(chatContextDefaultValues);

type Props = {
  children: any;
};
const ChatProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUserChat>(chatContextDefaultValues.user);
  const [selectedChat, setSelectedChat] = useState<IChat>(
    chatContextDefaultValues.selectedChat
  );
  const [chats, setChats] = useState<IChat[]>([]);
  const [notification, setNotification] = useState([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && status === "authenticated") {
      setUser({
        _id: `${session._id}`,
        email: session.email,
        name: session.name,
        profilePic: session.image,
        token: session.token,
      });
    }
  }, [status, session]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
