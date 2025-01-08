import bcrypt from "bcrypt";

export function hashPin(pin: string): string {
  return bcrypt.hashSync(pin, 10);
}

export function verifyPin(pin: string, hashedPin: string): boolean {
  return bcrypt.compareSync(pin, hashedPin);
}
