import UserDataBox from "../../../../components/user-data-box/UserDataBox";
import {StyledMessageContainer} from "./StyledMessageContainer";
import Message from "../message/Message";
import { useTranslation } from "react-i18next";

interface iMessage {
    content: string;
    createdAt: string;
    from: string;
    to: string;
    id: string;
}

interface Contact {
    name: string;
    username: string;
    id: string;
    profilePicture: string;
}

interface MessageContainerProps {
    messages: iMessage[];
    contact: Contact | null;
}

const MessageContainer = ({ messages, contact }: MessageContainerProps) => {
    const { t } = useTranslation();

    if (!contact) {
        return (
            <StyledMessageContainer>
                <h4>{t("message.selectContact")}</h4>
            </StyledMessageContainer>
        );
    }

    return (
        <StyledMessageContainer>
            <UserDataBox
                name={contact.name}
                username={contact.username}
                profilePicture={contact.profilePicture}
                id={contact.id}
            />
            <div className="messages-div">
                {messages.length === 0 && <h4>{t("message.noMessages")}</h4>}
                {messages.map((message) => {
                    return (
                        <Message content={message.content} createdAt={message.createdAt} from={message.from} to={message.to} id={message.id} key={message.id}/>
                    );
                })}
            </div>
        </StyledMessageContainer>
    );
}

export default MessageContainer;