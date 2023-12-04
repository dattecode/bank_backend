import z from "zod";

const userSchema = z.object({
  name: z
    .string({
      invalid_type_error: "name format is incorrect",
      required_error: "name is required",
    })
    .min(5, { message: "name is too short" })
    .max(50, { message: "name is too long" }),
  email: z
    .string({
      invalid_type_error: "email format is incorrect",
      required_error: "email is required",
    })
    .email({ message: "invalid email" }),
  password: z
    .string({
      invalid_type_error: "password format is incorrect",
      required_error: "password is required",
    })
    .min(8, { message: "password must be at 8 characters" }),
});

export const extractData = (resultValidation) => {
  let errorMessage;
  let data;
  const hasError = !resultValidation.success;

  if (hasError) {
    errorMessage = JSON.parse(resultValidation.error.message);
  }
  if (!hasError) {
    data = resultValidation.data;
  }
  return {
    hasError,
    errorMessage,
    data,
  };
};

export function validateUser(data) {
  const result = userSchema.safeParse(data);
  const { hasError, errorMessage, data: userData } = extractData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
}

export function validatePartialUser(data) {
  const result = userSchema.partial().safeParse(data);
  const { hasError, errorMessage, data: userData } = extractData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
}
