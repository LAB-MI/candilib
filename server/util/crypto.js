import bcrypt from 'bcryptjs';

const iterations = 8192;
const keyLength = 32;
const digest = 'sha512';

export function getHash(password) {
  return bcrypt.hashSync(password, 8);
}

export function compareToHash(original, password) {
  return bcrypt.compareSync(original, password)
}
