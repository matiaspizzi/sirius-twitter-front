import React from "react";
import { StyledMessage } from "./StyledMessage";

interface MessageProps {
    content: string;
    createdAt: string;
    senderId: string;
    receiverId: string;
}


const Message = ({ content, createdAt, senderId, receiverId}: MessageProps) => {
    return (
        <StyledMessage className={senderId === receiverId ? "message-received" : "message-sent"}>
            <p className="message-content">{content}</p>
            <p className="message-date">{createdAt}</p>
        </StyledMessage>
    );
}

export default Message;