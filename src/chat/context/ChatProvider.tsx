import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

export type IUserChat = {
  _id: string;
  name: string;
  email: string;
  pic: string;
  token?: string;
};
interface IChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: IUserChat[];
  groupAdmin?: IUserChat;
}

type chatContextType = {
  user: IUserChat;
  setUser: Dispatch<SetStateAction<IUserChat>>;
  selectedChat: IChat;
  setSelectedChat: Dispatch<SetStateAction<IChat>>;
  chats: IChat[];
  setChats: Dispatch<SetStateAction<IChat[]>>;
};

const chatContextDefaultValues: chatContextType= {
  user: { _id: "", name: "", email: "", pic: "" },
  setUser:
  selectedChat: { _id: "", chatName: "", isGroupChat: false, users: [] },
  chats: [],
};

const ChatContext = createContext<chatContextType>(chatContextDefaultValues);

type Props = {
  children: ReactNode;
};
const ChatProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUserChat>(chatContextDefaultValues.user);
  const [selectedChat, setSelectedChat] = useState<IChat>(
    chatContextDefaultValues.selectedChat
  );
  const [chats, setChats] = useState<IChat[]>([]);

  const router = useRouter();

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(info ? info : '""');
    setUser(userInfo);

    // if (userInfo) {
    //   router.push("/chat/chats");
    // }
  }, [router]);
  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
