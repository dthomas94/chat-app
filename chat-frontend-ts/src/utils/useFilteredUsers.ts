import { AppContext } from "App/context";
import { useContext } from "react";
import { User } from "types/User";

export const useFilteredUsers = (): User[] => {
  const { currentUser, users } = useContext(AppContext);
  return users.filter((u) => u.userId !== currentUser?.userId);
};
