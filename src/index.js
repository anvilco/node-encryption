// See
// https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
// http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/

const crypto = require('crypto')

const IVLength = 16 // For AES, this is always 16
const AESKeyLength = 32 // Must be 256 bits (32 characters)

//
// RSA
//

// Public: Encrypt with RSA algorithm
//
// RSA has an upper limit on how much data it can encrypt. So we create an AES
// key, encrypt the AES key with RSA, then encrypt the actual message with AES.
//
// * `publicKey` {String} RSA public key
// * `message` {String} Message to encrypt
//
// Returns a {String} like 'abcdef:abcdef:abcdef'
//   which is '<rsaEncryptedAESKey:aesIV:aesEncryptedMessage>'
function encryptRSA (publicKey, message) {
  const aesKey = generateAESKey()
  const enc = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.RSA_PKCS1_OAEP_PADDING,
  }, Buffer.from(aesKey))
  const encAesKey = enc.toString('base64')
  return `${encAesKey}:${encryptAES(aesKey, message)}`
}

// Public: Decrypt with RSA algorithm
//
// * `privateKey` {String} RSA public key
// * `message` {String} Encrypted message to decrypt
//
// Returns {String} decrypted message
function decryptRSA (privateKey, message) {
  const index = message.indexOf(':')
  const encAesKey = message.slice(0, index)
  const encryptedMessage = message.slice(index + 1)
  const enc = crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.RSA_PKCS1_OAEP_PADDING,
  }, Buffer.from(encAesKey, 'base64'))
  const aesKey = enc.toString()
  return decryptAES(aesKey, encryptedMessage)
}

//
// AES
//

// Public: Returns a {String} random AES key
function generateAESKey () {
  return Buffer.from(crypto.randomBytes(32)).toString('hex')
}

// Public: Encrypts with AES
//
// * `key` {String} AES key
// * `message` {String} Message to encrypt
//
// Returns {String} encrypted message
function encryptAES (key, message) {
  const iv = crypto.randomBytes(IVLength)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv)
  let encrypted = cipher.update(message)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

// Public: Decrypts with AES
//
// * `key` {String} AES key
// * `message` {String} Encrypted message to decrypt
//
// Returns {String} decrypted message
function decryptAES (key, message) {
  const textParts = message.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

module.exports = {
  IVLength,
  AESKeyLength,
  encryptRSA,
  decryptRSA,
  generateAESKey,
  encryptAES,
  decryptAES,
}
