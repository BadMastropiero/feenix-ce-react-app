import styled from 'styled-components';

export const StyledLabel = styled.label`
  all: unset;
  padding: calc(${(p) => p.theme.layout.vGap} / 4) calc(${(p) => p.theme.layout.hGap} / 4);
  border-radius: ${(p) => p.theme.borderRadius.base};
  box-shadow: ${(p) => p.theme.shadows.base};
  background-color: ${(props) => props.theme.colors.lighter.base};
`;
export const StyledInput = styled.input`
  all: unset;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  box-shadow: ${(p) => p.theme.shadows.base};
  background-color: ${(props) => props.theme.colors.lighter.bg};
`;

export const StyledArea = styled.textarea`
  all: unset;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  box-shadow: ${(p) => p.theme.shadows.base};
  background-color: ${(props) => props.theme.colors.lighter.base};
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  padding: ${(p) => p.theme.layout.vGap} 0;
  width: 100%;
  align-items: start;
  justify-content: start;
  gap: ${(p) => p.theme.layout.vGap};
`;
