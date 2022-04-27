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

type IRating = {
  averageScore: number;
  comments: [
    {
      userComment: { name: string; profilePic: string; email: string };
      description: string;
      score: number;
      date: string;
    }
  ];
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
  phone: {
    diallingCode: string;
    number: string;
  };
  description: string;
  profilePic: string;
  isPremium: boolean;
  role: string;
  statusAccount: string;
  address: {
    name: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    searchRange: number;
  };
  isAuthenticated: boolean;
  preferences: {
    hideAddres: boolean;
  };
  rating: IRating;
  workerData: {
    images: string[];
    certification: string[];
    rangeCoverage: number;
    items: Items[];
    workerDescription: string;
  };
  requests: {
    completed: number;
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
  children: any;
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
        `/api/public/users?city=${Session.address.city}&country=${Session.address.country}&lat=${Session.address.lat}&lng=${Session.address.lng}&searchRange=${Session.address.searchRange}`
      );
    } else {
      fillData(
        `/api/public/users?city=Cordoba&country=Argentina&lat=-31.4198303&lng=-64.1903709&searchRange=100`
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
