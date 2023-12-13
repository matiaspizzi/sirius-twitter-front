import React, { useEffect, useState } from "react";
import { useHttpRequestService } from "../../../../service/HttpRequestService";
import { useAppDispatch } from "../../../../redux/hooks";
import { setUser } from "../../../../redux/user";
import { useNavigate } from "react-router-dom";
import UserDataBox from "../../../../components/user-data-box/UserDataBox";
import { StyledContactListContainer } from './ContactListContainer';
import { useTranslation } from "react-i18next";

interface Contact {
    name: string;
    username: string;
    id: string;
    profilePicture: string;
}

interface ContactListProps {
    handleContact: (contact: Contact) => void;
}

const ContactList = ({ handleContact }: ContactListProps) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const service = useHttpRequestService();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleContacts = async () => {
        try {
            const data = await service.getContacts();
            const mutualFollows: Contact[] = await service.getMutualFollows();
            const filteredContacts = [...data, ...mutualFollows]
            console.log(filteredContacts)
            setContacts(filteredContacts);
        } catch (e) {
            navigate("/sign-in");
        }
    }

    useEffect(() => {
        handleContacts().then();
    }, []);

    return (
        <>
            <StyledContactListContainer>
                <h5>{t("header.contacts")}</h5>

                {contacts.map((contact) => {
                    return (
                        <UserDataBox name={contact.name} id={contact.id} username={contact.username} profilePicture={contact.profilePicture} onClick={() => handleContact(contact)} />
                    );
                })}

            </StyledContactListContainer>
        </>
    );
}

export default ContactList;