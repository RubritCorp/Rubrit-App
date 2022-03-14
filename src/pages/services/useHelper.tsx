import { IUser, useUsers } from "Provider/UsersProvider";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const useHelper = (category: string) => {
  const { users } = useUsers();
  const { data: Session } = useSession();
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [cat, setCat] = useState<any>();

  useEffect(() => {
    if (users.length && Object.keys(category).length > 0) {
      var info = JSON.parse(category);
      setCat(info.category[0]);
      setFilteredUsers(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, users]);

  return { cat, users, Session, filteredUsers };
};

export default useHelper;
