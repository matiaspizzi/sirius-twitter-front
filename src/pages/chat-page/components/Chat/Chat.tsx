import React, { useEffect, useState } from "react";
import { useHttpRequestService } from "../../../../service/HttpRequestService";
import { StyledChatContainer } from "./ChatContainer";
import { UserDataBox } from "../../../../components/user-data-box/UserDataBox";
import MessageContainer from "../message/MessageContainer";
import InputMessage from "../inputMessage/InputMessage";
import io from 'socket.io-client'

interface Contact {
    name: string;
    username: string;
    id: string;
    profilePicture: string;
}

interface Message {
    content: string;
    createdAt: string;
    senderId: string;
    receiverId: string;
}

interface ChatProps {
    contact: Contact | null;
}

const Chat = ({ contact }: ChatProps) => {
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const service = useHttpRequestService();
    const token = localStorage.getItem("token");
    const socket = io("http://localhost:8080", {
        auth: {
            token: token
            }
        })

    const handleMessages = async () => {
        try {
            if(!contact) return console.log("No contact")
            const data = await service.getChat(contact.id);
            setMessages(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (contact) {
            handleMessages().then();
            socket.on("message", (message) => {
                if (!messages.includes(message)) {
                    setMessages((messages) => [...messages, message])
                }
            })
        }
    }, [contact])


    const handleSubmit = (content: string) => {
        console.log(content)
        if(socket){
            socket?.emit('message', {to: contact!.id, content})
            setMessage('')
        }
    }


    return (
        <StyledChatContainer>
            <MessageContainer messages={messages} contact={contact} />
            <InputMessage handleSendMessage={handleSubmit}/>
        </StyledChatContainer>
    );
}

export default Chat;