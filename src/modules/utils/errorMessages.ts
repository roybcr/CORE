export const usernameAlreadyExistsError = 'Someone already has that username. Try another?';
export const emailAlreadyExistsError = "It looks like there's already an account with this email.";
export const emailNotConfirmedError = 'Please confirm your email before going forward';
export const incorrectCredentialsError = 'Incorrect email or password';

export const shortInputError = (path: string, min: number): string => {
  return `${path} must be longer than or equal to ${min} characters}`;
};

export const longInputError = (path: string, max: number): string => {
  return `${path} must be shorter than or equal to ${max} characters}`;
};

export const invalidInputError = (path: string): string => {
  return `${path} is not valid`;
};
