import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${(p) => p.theme.layout.vGap};
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  background-color: ${(props) => props.theme.colors.lighter.base};
  gap: ${(p) => p.theme.layout.vGap};
`;
