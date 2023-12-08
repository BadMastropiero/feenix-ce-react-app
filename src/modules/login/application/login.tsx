import React from 'react';
import styled from 'styled-components';

import { StyledButton } from '../../../components/button.styles';
import {
  StyledError,
  StyledFormGroup,
  StyledInput,
  StyledLabel,
} from '../../../components/input.styles';
import { useAuth } from '../../../contexts/auth';
import { slideInAnim } from '../../../styles/mixins';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${(p) => p.theme.layout.vGap};
`;

const StyledLoginCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  padding: ${(p) => p.theme.layout.vGap} ${(p) => p.theme.layout.hGap};
  border-radius: ${(p) => p.theme.borderRadius.base};
  background-color: ${(props) => props.theme.colors.lighter.base};
  gap: ${(p) => p.theme.layout.vGap};
  ${slideInAnim}
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
          <StyledFormGroup>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInput type="email" id="email" name="email" autoComplete="email" />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput
              type="password"
              id="password"
              name="password"
              autoComplete="current_password"
            />
          </StyledFormGroup>

          {auth?.error && <StyledError>{auth?.error}</StyledError>}
          <br />

          <StyledButton disabled={auth.loading} type="submit">
            Login
          </StyledButton>
        </StyledLoginForm>
      </StyledLoginCard>
    </StyledLogin>
  );
};

export default Login;
