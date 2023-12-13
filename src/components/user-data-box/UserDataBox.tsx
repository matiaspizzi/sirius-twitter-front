import React from "react";
import Avatar from "../common/avatar/Avatar";
import icon from "../../assets/icon.jpg";
import { useNavigate } from "react-router-dom";
import { StyledUserDataBoxContainer } from "./UserDataBoxContainer";

interface UserDataBoxProps {
  name?: string;
  username?: string;
  profilePicture?: string;
  id: string;
  onClick?: () => void;
}
export const UserDataBox = ({
  name,
  username,
  profilePicture,
  id,
  onClick,
}: UserDataBoxProps) => {
  const navigate = useNavigate();
  return (
    <StyledUserDataBoxContainer onClick={() => onClick ? onClick() : navigate(`/profile/${id}`)}>
        <Avatar
          src={profilePicture ?? icon}
          alt={name ?? "Name"}
        />
        <div>
          <p>{name ?? "Name"}</p>
          <p style={{ color: "#566370" }}>{"@" + username ?? "@Username"}</p>
        </div>
    </StyledUserDataBoxContainer>
  );
};

export default UserDataBox;
