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
            const allContacts = [...data, ...mutualFollows];
            const removedDuplicates = allContacts.filter((contact, index, self) =>
                index === self.findIndex((t) => (
                    t.id === contact.id
                ))
            )
            console.log(removedDuplicates)
            setContacts(removedDuplicates);
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
                {contacts.length === 0 && <h4>{t("message.noContacts")}</h4>}
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