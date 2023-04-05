export type Message = {
  body: string;
  conversationId: string;
  createdAt: Date;
  messageId: string;
  senderId: string; // user id from client
};
