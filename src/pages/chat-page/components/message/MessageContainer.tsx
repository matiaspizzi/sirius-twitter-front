import React, { useEffect, useState } from "react";
import { useHttpRequestService } from "../../../../service/HttpRequestService";
import { useAppDispatch } from "../../../../redux/hooks";
import { setUser } from "../../../../redux/user";
import { useNavigate } from "react-router-dom";
import UserDataBox from "../../../../components/user-data-box/UserDataBox";
import {StyledMessageContainer} from "./StyledMessageContainer";
import Message from "../message/Message";

interface Message {
    content: string;
    createdAt: string;
    senderId: string;
    receiverId: string;
}

interface Contact {
    name: string;
    username: string;
    id: string;
    profilePicture: string;
}

interface MessageContainerProps {
    messages: Message[];
    contact: Contact | null;
}

const MessageContainer = ({ messages, contact }: MessageContainerProps) => {

    if (!contact) {
        return (
            <StyledMessageContainer>
                <h1>Message</h1>
                <p>Please select a contact</p>
            </StyledMessageContainer>
        );
    }

    return (
        <StyledMessageContainer>
            <h1>Message</h1>
            <UserDataBox
                name={contact.name}
                username={contact.username}
                profilePicture={contact.profilePicture}
                id={contact.id}
            />
            <div>
                {messages.map((message) => {
                    return (
                        <Message content={message.content} createdAt={message.createdAt} senderId={message.senderId} receiverId={message.receiverId} />
                    );
                })}
            </div>
        </StyledMessageContainer>
    );
}

export default MessageContainer;