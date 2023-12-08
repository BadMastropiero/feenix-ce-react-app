import styled, { createGlobalStyle } from 'styled-components';

export const StyledContent = styled.main`
  margin: auto;
  width: 100%;
  display: flex;
  height: calc(100vh - 100px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: ${(props) => [props.theme.layout.vGap, props.theme.layout.hGap].join(' ')};
`;

export const StyledGlobal = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.lighter.bg};
    color: ${(props) => props.theme.colors.lighter.contrast};
  }

  html {
    /* overflow-y: auto; */
    scrollbar-gutter: stable;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${(p) => p.theme.colors.lighter.bg};
    border-radius: ${(p) => p.theme.borderRadius.base};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.colors.lighter.contrast};
    border-radius: ${(p) => p.theme.borderRadius.base};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(p) => p.theme.colors.primary.base};
  }
`;
