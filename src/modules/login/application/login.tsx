import React from 'react';
import styled from 'styled-components';

import { StyledButton } from '../../../components/botton.styles';
import { StyledInput, StyledLabel } from '../../../components/input.styles';
import { useAuth } from '../../../contexts/auth';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${(p) => p.theme.layout.vGap};
`;

const StyledLoginCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  background-color: ${(props) => props.theme.colors.lighter.base};
  gap: ${(p) => p.theme.layout.vGap};
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.layout.vGap};
`;

const Login = () => {
  const auth = useAuth();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;
    auth?.login(email, password);
  };

  return (
    <StyledLogin>
      <StyledLoginCard>
        <h3>Login</h3>
        <br />

        <StyledLoginForm onSubmit={onSubmit}>
          <div>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInput type="email" id="email" name="email" />
          </div>

          <div>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput type="password" id="password" name="password" />
          </div>

          <br />

          <StyledButton type="submit">Login</StyledButton>
        </StyledLoginForm>
      </StyledLoginCard>
    </StyledLogin>
  );
};

export default Login;
