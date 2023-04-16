const SALT = 'sosihuy228';

export function encode(str: string): string {
  let encoded = '';
  for (let i = 0; i < str.length; i++) {
    const saltIndex = i % SALT.length;
    const charCode = str.charCodeAt(i) + SALT.charCodeAt(saltIndex);
    encoded += String.fromCharCode(charCode);
  }
  return encoded;
}

export function decode(str: string): string {
  let decoded = '';
  for (let i = 0; i < str.length; i++) {
    const saltIndex = i % SALT.length;
    const charCode = str.charCodeAt(i) - SALT.charCodeAt(saltIndex);
    decoded += String.fromCharCode(charCode);
  }
  return decoded;
}
