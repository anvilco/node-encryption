# Anvil Encryption

This library is a small wrapper around node's `crypto` library. It offers convenience methods for encrypting and decrypting arbitrary payloads in both AES and RSA.

For use encrypting / decrypting payloads in Anvil, you can generate an RSA keypair from your [organization's settings page](https://www.useanvil.com/docs/api/getting-started#encryption).

![Horizontal Lockupblack](https://user-images.githubusercontent.com/293079/169453889-ae211c6c-7634-4ccd-8ca9-8970c2621b6f.png#gh-light-mode-only)
![Horizontal Lockup copywhite](https://user-images.githubusercontent.com/293079/169453892-895f637b-4633-4a14-b997-960c9e17579b.png#gh-dark-mode-only)

[Anvil](www.useanvil.com/developers) provides easy APIs for all things paperwork.
1. [PDF filling API](https://www.useanvil.com/products/pdf-filling-api/) - fill out a PDF template with a web request and structured JSON data.
2. [PDF generation API](https://www.useanvil.com/products/pdf-generation-api/) - send markdown or HTML and Anvil will render it to a PDF.
3. [Etch E-sign with API](https://www.useanvil.com/products/etch/) - customizable, embeddable, e-signature platform with an API to control the signing process end-to-end.
4. [Anvil Workflows (w/ API)](https://www.useanvil.com/products/workflows/) - Webforms + PDF + E-sign with a powerful no-code builder. Easily collect structured data, generate PDFs, and request signatures.

Learn more about Anvil on our [Anvil developer page](https://www.useanvil.com/developers).

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

// Could grab the keys from file (or preferably from environment variables)
import fs from 'fs'
const privateKey = fs.readFileSync('path/to/privateKey.pem')
const publicKey = fs.readFileSync('path/to/publicKey.pem')


// RSA
const message = 'Super secret message'
const encryptedRSAMessage = encryptRSA(publicKey, message)
const origRSAMessage = decryptRSA(privateKey, encryptedRSAMessage)
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

This library does not have a way to generate RSA keys.

You could use openssl:
```sh
# This generates a 2048 bit private key to file
openssl genrsa -out privateKey.pem 2048

# This extracts the public key to file
openssl rsa -in privateKey.pem -outform PEM -pubout -out publicKey.pem
```


You could also use something like [node-rsa](https://github.com/rzcoder/node-rsa):

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
