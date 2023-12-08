import React from 'react';

import { StyledButton } from '../../../components/button.styles';
import { StyledCard, StyledContainer } from '../../../components/card.styles';
import { StyledForm } from '../../../components/form.styles';
import {
  StyledError,
  StyledFormGroup,
  StyledInput,
  StyledLabel,
} from '../../../components/input.styles';
import { useAuth } from '../../../contexts/auth';

const Login = () => {
  const auth = useAuth();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;
    auth?.login(email, password);
  };

  return (
    <StyledContainer>
      <StyledCard>
        <h3>Login</h3>
        <br />

        <StyledForm onSubmit={onSubmit}>
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
        </StyledForm>
      </StyledCard>
    </StyledContainer>
  );
};

export default Login;
