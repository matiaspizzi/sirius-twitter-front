import styled from "styled-components";

export const StyledInputMessage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${(props) => props.theme.colors.containerLine};
    padding: 1rem;
    width: 100%;
    
    input {
        width: 100%;
        border: none;
        background-color: transparent;
        font-size: 1rem;
        padding: 0.5rem;
        color: ${(props) => props.theme.colors.text};
        &::placeholder {
        color: ${(props) => props.theme.colors.text};
        }
    }
    
    button {
        background-color: transparent;
        border: none;
        color: ${(props) => props.theme.colors.primary};
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
    }
    `;