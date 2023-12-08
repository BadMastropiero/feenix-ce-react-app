import styled from 'styled-components';

export const StyledButton = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  box-shadow: ${(p) => p.theme.shadows.base};
  background-color: ${(props) => props.theme.colors.primary.base};
  color: ${(props) => props.theme.colors.primary.contrast};
  text-align: center;
  transition: all 0.3s ${(p) => p.theme.easings.base};

  &:hover:not(:disabled) {
    cursor: pointer;
    box-shadow: ${(p) => p.theme.shadows.hover};
    background-color: ${(props) => props.theme.colors.primary.highlight};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.colors.lighter.contrast};
  }
`;
