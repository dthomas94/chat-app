import { createContext } from "react";
import { Channel } from "types/Channel";
import { Conversation } from "types/Conversation";
import { Message } from "types/Message";
import { User } from "types/User";

export interface IAppContext {
  conversations: Conversation[];
  currentUser?: User;
  messages: Message[];
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
  channels: Channel[];
}

const defaultAppContext: IAppContext = {
  conversations: [],
  messages: [],
  setCurrentUser: () => null,
  setUsers: () => null,
  users: [],
  channels: [],
};
export const AppContext = createContext<IAppContext>(defaultAppContext);
