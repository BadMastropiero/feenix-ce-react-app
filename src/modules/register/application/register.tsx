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

const Register = () => {
  const auth = useAuth();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstName = (event.target as HTMLFormElement).firstName.value;
    const lastName = (event.target as HTMLFormElement).lastName.value;
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    auth?.register(firstName, lastName, email, password);
  };
  return (
    <StyledContainer>
      <StyledCard>
        <h3> Register </h3>
        <br />

        <StyledForm onSubmit={onSubmit} autoComplete="off">
          <StyledFormGroup>
            <StyledLabel htmlFor="First Name">First Name</StyledLabel>
            <StyledInput type="text" id="firstName" name="firstName" />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel htmlFor="Last Name">Last Name</StyledLabel>
            <StyledInput type="text" id="lastName" name="lastName" />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInput type="email" id="email" name="email" />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput type="password" id="password" name="password" />
          </StyledFormGroup>

          {auth?.error && <StyledError>{auth?.error}</StyledError>}
          <br />

          <StyledButton disabled={auth.loading} type="submit">
            Register
          </StyledButton>
        </StyledForm>
      </StyledCard>
    </StyledContainer>
  );
};

export default Register;
