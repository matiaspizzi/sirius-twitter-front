import React, { useEffect, useState, useRef } from "react";
import { useHttpRequestService } from "../../../../service/HttpRequestService";
import { StyledChatContainer } from "./ChatContainer";
import MessageContainer from "../message/MessageContainer";
import InputMessage from "../inputMessage/InputMessage";
import io, { Socket } from "socket.io-client";
import { useTranslation } from "react-i18next";
import Loader from "../../../../components/loader/Loader";

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
  const socketRef = useRef<Socket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleMessages = async () => {
    try {
      if (!contact) return console.log("No contact");
      const data = await service.getChat(contact.id);
      setMessages(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    socketRef.current = io(`http://localhost:8080?token=${token}`);

    if (contact) {
      handleMessages().then();
      socketRef.current.on("message", (message) => {
        if (!messages.includes(message)) {
          setMessages((messages) => [...messages, message]);
        }
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [contact]);

  const handleSubmit = (content: string) => {
    if (socketRef.current) {
      socketRef.current?.emit("message", { to: contact!.id, content });
    }
  };

  return (
    <StyledChatContainer>
      <h5>{t("header.messages")}</h5>
      {<MessageContainer messages={messages} contact={contact} loading={loading}/>}
      {!loading && contact && <InputMessage handleSendMessage={handleSubmit} />}
    </StyledChatContainer>
  );
};

export default Chat;
