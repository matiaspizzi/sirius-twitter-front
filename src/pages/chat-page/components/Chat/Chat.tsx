import React, { useEffect, useState } from "react";
import { useHttpRequestService } from "../../../../service/HttpRequestService";
import { StyledChatContainer } from "./ChatContainer";
import MessageContainer from "../message/MessageContainer";
import InputMessage from "../inputMessage/InputMessage";
import io from "socket.io-client";
import { useTranslation } from "react-i18next";

interface Contact {
  name: string;
  username: string;
  id: string;
  profilePicture: string;
}

interface Message {
  content: string;
  createdAt: string;
  from: string;
  to: string;
  id: string;
}

interface ChatProps {
  contact: Contact | null;
}

const Chat = ({ contact }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const service = useHttpRequestService();
  const t = useTranslation().t;
  const token = localStorage.getItem("token")?.split(" ")[1];
  const socket = io(`http://localhost:8080?token=${token}`);

  const handleMessages = async () => {
    try {
      if (!contact) return console.log("No contact");
      const data = await service.getChat(contact.id);
      setMessages(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (contact) {
      handleMessages().then();
      socket.on("message", (message) => {
        if (!messages.includes(message)) {
          setMessages((messages) => [...messages, message]);
        }
      });
    }
  }, [contact]);

  const handleSubmit = (content: string) => {
    if (socket) {
      socket?.emit("message", { to: contact!.id, content });
    }
  };

  return (
    <StyledChatContainer>
      <h5>{t("header.messages")}</h5>

      <MessageContainer messages={messages} contact={contact} />
      {contact && <InputMessage handleSendMessage={handleSubmit} />}
    </StyledChatContainer>
  );
};

export default Chat;
