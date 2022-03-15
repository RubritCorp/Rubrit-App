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

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  profilePic: string;
  isPremiun: boolean;
  address: {
    name: string;
    city: string;
    country: string;
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
  workerData: {
    images: string[];
    certification: string[];
    rangeCoverage: number;
    items: Items[];
  };
  requests: {
    recibed: string[];
    send: string[];
  };
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
  const { data: Session, status: auth } = useSession();
  const [users, setUsers] = useState<IUser[]>([]);

  const fillData = async (route: string) => {
    try {
      setStatus("true");

      const { data } = await axios.get(`${route}`);

      setUsers(data.users);
      setStatus("null");
    } catch (err) {
      setStatus("null");
      console.log(err);

      throw new Error();
    }
  };

  useEffect(() => {
    if (Session && auth === "authenticated" && Session.address.lat) {
      fillData(
        `/api/public/users?city=${Session.address.name}&lat=${Session.address.lat}&lng=${Session.address.lng}&searchRange=${Session.address.searchRange}`
      );
    } else {
      fillData(
        `/api/public/users?city=Cordoba Capital, Cordoba, Argentina&lat=-31.4198303&lng=-64.1903709&searchRange=100`
      );
    }
  }, [Session, auth, users.length]);

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
