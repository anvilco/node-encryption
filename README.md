# Anvil Encryption

This library is a small wrapper around node's `crypto` library. It offers convenience methods for encrypting and decrypting arbitrary payloads in both AES and RSA.

## Install

```sh
yarn add @anvilco/encryption
```

Then use it

```js
// For RSA functions
import { encryptRSA, decryptRSA } from '@anvilco/encryption'

// For AES functions
import { generateAESKey, encryptAES, decryptAES } from '@anvilco/encryption'


// RSA
const message = 'Super secret message'
const encryptedRSAMessage = encryptRSA('...public key....', message)
const origRSAMessage = decryptRSA('...private key....', encryptedRSAMessage)
console.log(origRSAMessage === message) // => true

// AES
const aesKey = generateAESKey()
const encryptedAESMessage = encryptAES(aesKey, message)
const origAESMessage = decryptAES(aesKey, encryptedAESMessage)
console.log(origAESMessage === message) // => true
```

## API

There are two functions for RSA: `encryptRSA`, `decryptRSA`, and three for AES: `generateAESKey`, `encryptAES`, `decryptAES`.

### AES

There are three functions for AES:

* `key = generateAESKey()`
* `encryptedMessage = encryptAES(key, plainMessage)`
* `plainMessage = decryptAES(key, encryptedMessage)`

`encryptAES` creates a unique [IV](https://en.wikipedia.org/wiki/Initialization_vector) for each message encrypted and prepends it to the resulting encrypted payload. So `encryptedMessage` will be in the format

```
<iv>:<aesEncryptedPayload>
```

### RSA

There are two functions for RSA:

* `encryptedMessage = encryptRSA(publicKey, plainMessage)`
* `plainMessage = decryptRSA(privateKey, encryptedMessage)`

These functions encrypt / decrypt with RSA _and_ AES. RSA has an upper limit on how much data it can encrypt. So we create an AES key, encrypt the AES key with RSA, then encrypt the actual message with AES.

Note the encrypted payload (result of `encryptRSA`) is in the format:

```
<rsaEncryptedAESKey>:<aesEncryptedMessage>
```

#### Generating RSA keys

This library does not have a way to generate RSA keys. You can use openssl or something like [node-rsa](https://github.com/rzcoder/node-rsa):

```js
// Example generating a RSA keypair with node-rsa
import NodeRSA from 'node-rsa'
function generateRSAKeypair () {
  const key = new NodeRSA()
  key.generateKeyPair(2048, 65537)
  return {
    publicKey: key.exportKey('pkcs8-public-pem'),
    privateKey: key.exportKey('pkcs8-private-pem'),
  }
}
```

## License

MIT
