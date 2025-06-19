import api from "../api/api";

/**
 * Handles user login
 * @param form - Object containing email and password
 * @returns Promise with login response
 */
export const loginService = (form: { email: string; password: string }) => {
  return api.post("/api/v1/auth/login", form, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

/**
 * Handles user registration
 * @param form - Registration form data
 * @returns Promise with registration response
 */
export const registerService = (form: unknown) => {
  return api.post("/api/v1/auth/register", form, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

/**
 * Checks if an email is already in use
 * @param email - Email to check
 * @returns Promise with check response
 */
export const emailInUse = (email: string) => {
  return api.get(`/api/v1/auth/email-in-use/${email}`);
};

/**
 * Checks if a CPF is already in use
 * @param cpf - CPF to check
 * @returns Promise with check response
 */
export const cpfInUse = (cpf: string) => {
  return api.get(`/api/v1/auth/cpf-in-use/${cpf}`);
};

/**
 * Sends verification code to user's email
 * @param email - User's email
 * @returns Promise with send code response
 */
export const sendCodeService = (email: string) => {
  return api.get(`/api/v1/auth/send-code-verification/${email}`);
};

/**
 * Verifies the code sent to user's email
 * @param email - User's email
 * @param code - Verification code
 * @returns Promise with verification response
 */
export const verifyCodeService = (email: string, code: string) => {
  return api.post(
    "/api/v1/auth/verify-code",
    { email, code },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};
