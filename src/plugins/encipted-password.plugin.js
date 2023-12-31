import bcrypt from "bcrypt";

export const encryptedPassword = async (password) => {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

