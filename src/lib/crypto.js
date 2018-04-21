/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "sha1" }] */
import { random, pbkdf2, cipher, util, sha1 } from 'node-forge';
import base64url from 'base64-url';

const randomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

const aes256CbcEncrypt = (password, plaintext) => {
  const keylen = 32;

  // generate a random 256 bits salt
  const salt = random.getBytesSync(32);

  // generate a random number of iterations between 16000 and 64000
  const iterations = randomInt(16000, 64000);

  // derive key
  const key = pbkdf2(password, salt, iterations, keylen);

  // generate a random initialization vector of keylen bytes
  const iv = random.getBytesSync(keylen);

  // encrypt
  const engine = cipher.createCipher('AES-CBC', key);
  engine.start({ iv });
  engine.update(util.createBuffer(plaintext));
  engine.finish();
  const ciphertext = engine.output.getBytes();

  // Encodings:
  // base64url.encode vs base64url.decode
  // util.encode64 vs util.decode64
  // util.bytesToHex vs util.hexToBytes
  return {
    ciphertext: base64url.encode(ciphertext + iv),
    salt: base64url.encode(salt),
    iterations
  };
};

const aes256CbcDecrypt = (password, ciphertext, salt, iterations) => {
  const keylen = 32;

  // decode salt
  const decodedSalt = base64url.decode(salt);

  // decode ciphertext + iv
  const ciphertextIv = base64url.decode(ciphertext); // or util.decode64
  const iv = ciphertextIv.substring(ciphertextIv.length - keylen);
  const decpdedCiphertext = ciphertextIv.substring(0, ciphertextIv.length - keylen);

  // derive key
  const key = pbkdf2(password, decodedSalt, iterations, keylen);

  // decrypt
  const engine = cipher.createDecipher('AES-CBC', key);
  engine.start({ iv });
  engine.update(util.createBuffer(decpdedCiphertext));
  engine.finish();
  const plaintext = engine.output.toString();

  return plaintext;
};

export {
  aes256CbcEncrypt,
  aes256CbcDecrypt
};
