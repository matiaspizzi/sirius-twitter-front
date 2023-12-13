import styled from 'styled-components';

export const StyledMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1rem;
    margin: 1rem 0;
    width: 100%;
    p {
        margin: 0;
        padding: 0;
    }
    .message-content {
        background-color: #f1f0f0;
        border-radius: 1rem;
        padding: 0.5rem 1rem;
    }
    .message-date {
        font-size: 0.8rem;
        color: #c4c4c4;
    }
    &.message-sent {
        align-items: flex-end;
        .message-content {
            background-color: #00b87c;
            color: white;
        }
    }
`;