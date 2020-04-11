// TODO: remove this file

/* global CONFIG */
import { JSEncrypt } from "jsencrypt";
import * as sha1 from "sha1";

const { cryptoUtils } = CONFIG;
const { publicKey } = cryptoUtils;

export const encryption = value => {
  if (!publicKey) {
    throw new Error(`Missing 'cryptoUtils.publicKey' config`);
  }
  // set sha1
  value = sha1(value || "");

  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encrypted = encrypt.encrypt(value);
  return encrypted;
};
