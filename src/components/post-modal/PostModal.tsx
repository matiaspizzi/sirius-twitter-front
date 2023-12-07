import React, { ReactNode } from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";

interface PostModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

export const PostModal = ({ onClose, show, children }: PostModalProps) => {
  const handleClickOutside = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {show && (
        <StyledBlurredBackground onClick={handleClickOutside}>
          <StyledTweetModalContainer onClick={e => e.stopPropagation()}>
            <ModalCloseButton onClick={onClose} />
            {children}
          </StyledTweetModalContainer>
        </StyledBlurredBackground>
      )}
    </>
  );
};
