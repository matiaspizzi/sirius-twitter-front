import styled from "styled-components";

export const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: content-fit;
  border-right: 1px solid grey;

  h5 {
    color: var(--grayscale-black, #000);
    /* H5 */
    font-size: 20px;
    font-family: "Inter", sans-serif;
    font-weight: 900;
    line-height: 110%;
    letter-spacing: -0.1px;
    padding: 16px;
    margin-top: 0;
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    .tweet-box-container {
      display: none;
    }
  }
`;