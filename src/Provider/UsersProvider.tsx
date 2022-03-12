import axios from "axios";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";

type Category = {
  _id: string;
  name: string;
  ["picture_small"]: string;
};

type Subcategory = {
  _id: string;
  name: string;
};

type Items = {
  category: Category;
  subcategories: Subcategory[];
  description: string;
  certification: string[];
};

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  profilePic: string;
  isPremiun: boolean;
  address: {
    name: string;
    lat: number;
    lng: number;
  };
  preferences: {
    hideAddres: boolean;
  };
  rating: {
    description: string;
    score: string;
  };
  items: Items[];
  offers: any;
}

type usersContextType = {
  users: IUser[];
  status: string;
};

const usersContextDefaultValues: usersContextType = {
  users: [],
  status: "false",
};

const UsersContext = createContext<usersContextType>(usersContextDefaultValues);

export function useUsers() {
  return useContext(UsersContext);
}

type Props = {
  children: ReactNode;
};

export function UsersProvider({ children }: Props) {
  const [status, setStatus] = useState<string>("false");
  const { data: Session } = useSession();
  const [users, setUsers] = useState<IUser[]>([]);

  const fillData = async () => {
    try {
      setStatus("true");

      const { data } = await axios.get(
        Session?.address.name
          ? `/api/public/users?city=${Session.address.name}`
          : "/api/public/users"
      );
      setUsers(data.users);
      setStatus("null");
    } catch (err) {
      setStatus("null");
      throw new Error();
    }
  };

  useEffect(() => {
    if (users.length < 1) {
      fillData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    users,
    status,
  };
  return (
    <>
      <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    </>
  );
}
