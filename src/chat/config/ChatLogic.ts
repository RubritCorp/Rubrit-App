import { IUserChat } from "chat/context/ChatProvider";

export const getSender = (loggedUser: IUserChat, users: IUserChat[]) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser: IUserChat, users: IUserChat[]) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
