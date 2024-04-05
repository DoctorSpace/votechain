import CryptoJS from "crypto-js";

export const genHash = () => {
  const now = new Date();

  const arr = [now.getMinutes(), now.getSeconds(), now.getMilliseconds()]
  
  const arrayString = arr.join("");
  const hash = CryptoJS.SHA256(arrayString).toString(CryptoJS.enc.Hex);
  const shortenedHash = hash.substr(0, 10);


  return shortenedHash;
};
