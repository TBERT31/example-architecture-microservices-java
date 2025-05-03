import Cryptr from "cryptr";

export function encrypt(text: String) {
  const secretKey = process.env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secretKey as string);

  const encryptedString = cryptr.encrypt(text as string);
  return encryptedString; 
}

export function decrypt(encryptedString: String) {
    const secretKey = process.env.NEXTAUTH_SECRET;
    const cryptr = new Cryptr(secretKey as string);
  
    const text = cryptr.decrypt(encryptedString as string);
    return text;
}