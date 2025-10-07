import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY;
const EncryptData = (data: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY!).toString();
};

const DecryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY!);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export { EncryptData, DecryptData };
