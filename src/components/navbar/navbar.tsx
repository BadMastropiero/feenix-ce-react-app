import styled from 'styled-components';

import { useAuth } from '../../contexts/auth';
import { StyledButton } from '../button.styles';

const StyledNavHeader = styled.header`
  display: flex;
  align-items: center;
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  background-color: ${(props) => props.theme.colors.lighter.base};
  height: 80px;
  z-index: 1000;
  position: sticky;
`;

const StyledNavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: auto;
  padding: ${(props) => [props.theme.layout.vGap, props.theme.layout.hGap].join(' ')};
  width: 100%;
`;

function Navbar() {
  const auth = useAuth();

  return (
    <StyledNavHeader>
      <StyledNavBar>
        <h1>Feenix Bot</h1>
        {auth?.user ? (
          <>
            <StyledButton
              onClick={() => {
                auth?.logout();
              }}
            >
              Logout
            </StyledButton>
          </>
        ) : (
          <>
            <StyledButton
              onClick={() => {
                auth?.isRegister(!auth.createRegister);
              }}
            >
              {!auth.createRegister ? 'Register' : 'Login'}
            </StyledButton>
          </>
        )}
      </StyledNavBar>
    </StyledNavHeader>
  );
}

export default Navbar;
