import { IMessage } from "chat/context/ChatProvider";
import io, { Socket } from "socket.io-client";
import envConfig from "../../../next-env-config";
let socket: Socket;
export const initiateSocket = (user: any, setSocketConnected: any) => {
  socket = io(`${envConfig?.apiUrl}`);
  socket.emit("setup", user);
  socket.on("connected", () => setSocketConnected(true));

  console.log(`Connecting socket...`);
  // if (socket && room) socket.emit("join", room);
};
export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
export const onTyping = (setIsTyping: any) => {
  socket.on("typing", () => setIsTyping(true));
};

export const onStopTyping = (setIsTyping: any) => {
  socket.on("stop typing", () => setIsTyping(false));
};

export const onMessageRecieved = (
  selectedChatCompare: any,
  // setMessages: any,
  cb: any
) => {
  socket.on("message recieved", (newMessageRecieved: IMessage) => {
    if (
      !selectedChatCompare || // if chat is not selected or doesn't match current chat
      selectedChatCompare._id !== newMessageRecieved.chat._id
    ) {
      // if (!notification.includes(newMessageRecieved)) {
      //   setNotification([newMessageRecieved, ...notification]);
      //   setFetchAgain(!fetchAgain);
      // }
    } else {
      // setMessages((old: any) => [...old, newMessageRecieved]);
      return cb(newMessageRecieved);
    }
  });
};

export const emitStopTyping = (id: any) => {
  socket.emit("stop typing", id);
};
export const emitTyping = (id: any) => {
  socket.emit("typing", id);
};
export const emitJoinChat = (id: any) => {
  socket.emit("join chat", id);
};

export const emitnewMessage = (data: any) => {
  socket.emit("new message", data);
};
// export const subscribeToChat = (cb: any) => {
//   if (!socket) return true;
//   socket.on("chat", (msg) => {
//     console.log("Websocket event received!");
//     return cb(null, msg);
//   });
// };
// export const sendMessage = (room: any, message: any) => {
//   if (socket) socket.emit("chat", { message, room });
// };
