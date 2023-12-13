import React, {useState} from "react";
import { StyledInputMessage } from "./StyledInputMessage";


interface InputMessageProps {
    handleSendMessage: (message: string) => void;
}

const InputMessage = ({ handleSendMessage }: InputMessageProps) => {
    const [message, setMessage] = useState<string>("");

    return (
        <StyledInputMessage>
            <input type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)} value={message}/>
            <button onClick={() => handleSendMessage(message)}>Send</button>
        </StyledInputMessage>
    );
}

export default InputMessage;