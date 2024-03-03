export interface AuthResponse<T> {
  accessToken: string;
  user: T;
}
export interface BaseAuthService<T, V, R> {
  /**
   * Creates a new account.
   * @param dto The DTO containing information to create the account.
   * @returns A promise that resolves to the created account.
   */
  createAccount(dto: V, repo: R): Promise<AuthResponse<T>>;

  /**
   * Logs in a user.
   * @param dto The DTO containing login credentials.
   * @returns A promise that resolves to the logged-in user.
   */
  login(dto: V): Promise<T>;

  /**
   * Sends a reset password link to the user's email.
   * @param dto The DTO containing user information to reset the password.
   * @returns A promise that resolves when the reset password link is sent.
   */
  forgotPassword(dto: V): Promise<void>;

  /**
   * Resets the user's password.
   * @param dto The DTO containing the new password and reset token.
   * @returns A promise that resolves when the password is successfully reset.
   */
  resetPassword(dto: V): Promise<void>;

  /**
   * Updates the user's password.
   * @param dto The DTO containing the old and new password.
   * @returns A promise that resolves when the password is successfully updated.
   */
  updatePassword(dto: V): Promise<void>;

  /**
   * Generates a token for authentication purposes.
   * @returns A promise that resolves to the generated token.
   */
  //   generateToken(): Promise<string>;
}
