import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.layout.vGap};
`;
