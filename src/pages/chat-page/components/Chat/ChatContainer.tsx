import styled from "styled-components";

export const StyledChatContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100%;
flex: 2;
height: content-fit;
border-right: 1px solid ${(props) => props.theme.colors.containerLine};

@media (max-width: 600px) {
  .tweet-box-container {
    display: none;
  }
}
`;