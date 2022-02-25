import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(
  password?: string,
  hashedPassword?: string
) {
  //compare method return a boolean
  if (password && hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  }
}
