const encryption = require('../src/index')

describe('encryption', function () {
  describe('AES', function () {
    it('encrypts and decrypts', async function () {
      const key = encryption.generateAESKey()
      const text = 'some things and other things'
      const cipher = encryption.encryptAES(key, text)
      expect(encryption.decryptAES(key, cipher)).to.equal(text)
    })
  })

  describe('RSA', function () {
    it('encrypts and decrypts', async function () {
      const text = 'some things and other things'
      const cipher = encryption.encryptRSA(rsaPublicKey, text)
      expect(encryption.decryptRSA(rsaPrivateKey, cipher)).to.equal(text)
    })
  })
})

const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAniCxJvDN8EvaplGic0oH
0rLqdMAmIU3yvjE/nrpSByHdcRs1zt9ibf5egMhnI/v9bwaZ4v8niZ74ggKmyjUn
FC4hG21w7VDSf3IGiNz1XWI1ZPAjD5nDFK93ebEqubeMepHq7/G/p8w09zn5HER3
RPUx98XGmlpN2rKjtKv+nLFICxs91332jvDxTIkDZUk6SrDhT11hWRTJjbobLCll
W/dLblqno8NsUP2zZmIp1+X5z+4Pgvui/Bx/iO5aBPDsZXfC4/lw5wsNACa8orej
tHHMLAFQnsqkjiwt4r/16u2z9oMddlhvlEao2vtf605VllY+6g6ajEJS25X2xsYD
+wIDAQAB
-----END PUBLIC KEY-----`

const rsaPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeILEm8M3wS9qm
UaJzSgfSsup0wCYhTfK+MT+eulIHId1xGzXO32Jt/l6AyGcj+/1vBpni/yeJnviC
AqbKNScULiEbbXDtUNJ/cgaI3PVdYjVk8CMPmcMUr3d5sSq5t4x6kerv8b+nzDT3
OfkcRHdE9TH3xcaaWk3asqO0q/6csUgLGz3XffaO8PFMiQNlSTpKsOFPXWFZFMmN
uhssKWVb90tuWqejw2xQ/bNmYinX5fnP7g+C+6L8HH+I7loE8Oxld8Lj+XDnCw0A
Jryit6O0ccwsAVCeyqSOLC3iv/Xq7bP2gx12WG+URqja+1/rTlWWVj7qDpqMQlLb
lfbGxgP7AgMBAAECggEBAItJQMKMWtrP9kmKnw3up/VwpBUzLGMpxijCOMgYVyjx
K5312e/f1VQOPDA0VqXb0eF6bxMErk8LONtMep6jM0kTWRZP0Kk6CDE6v4bPG1Km
r2G6JSgYyT3vUc5fwMLWa2eMIOY6jBfCSOV8q3G63VRgpyMZk1djNDDwKkN7PUvH
epiEce6RkGaeTZx7VyZI78GNX7cg9pK8cPQ0OK4jzAZa/T+5l3WD5RjLkdnszBL5
P0m5mEzWwrIy4t/O9qj4I5oySFCZ3Rqv2DBNabfVydjBDBHtXA60hrUaNyzQaQbg
NWmf4LNUneZ47sa6ardieLr+5ZtRPJoFo364q+jZ6AECgYEAzrva4Q0eNnK40Bi/
udnZdprHGKhtl1nNxq1MIDp6hJoq8sR4XQ/1AAKL4m8fqswbTzqPr9XItUPFfQHP
b1h4v49oH5AvCpM2FmbMDe/Pj46z/2uH27EVCySgGRcRnkr6MnQN/45RHAwiRgbT
9sG+AeSQAmcKVm/6XfMfPLPRoDkCgYEAw8+KG5Ip1JRZY1qhCmOPdCw8goe20tmW
dnT7sCYP99fDP5HM5widxd1FWipaKwnIB/Hsad2Fu7qoFk/XAx4SOvIPxM32eNN9
m1ouSsXsnL0/6DKYwZNiECVJMEtdEx9XtWdmmLZomRaD7+K6xlD0lWiWaTz0jNvY
bcsbJlecndMCgYA2UEBnFA01/Nn1QitM5qEteeiI3+c69ksLwYfYh8Schex2r4t3
17Nkd0bNDKjjNJCQNjB938rFZLLD7u/Srwm6OjD+6eCSBK8XH5bIqpJ7guBjYJrm
6xU+QjcVoGvujIBDNR5gX8GLftyaTTzu/WOwF56GIxAiOXUrra4tQoj2cQKBgA9p
OC9vU4d9nYNqUJ5ms5WrHaAQWl1B7sun7V8xv7P78UwBh6TvUquN/LVZ+/rDLFEj
wz2Zx7q8uBn5cqy2Iy0se/07UJi13H7rnBUaesLjSjJWORuTI/atWJNKeyrUHq0S
VErUoGrcEMpCh/yvxnAz6RKjT4P+kYwiniJoZtUtAoGAVjquNJOTHjXf6wTWoiga
MP76Ltf//7rybXkz90XSWlOhLdybMibdnSuOy0vUjendTLjp1n0hsYNydk1ne37k
AeOr99cv4aLjjfiNArteDBym4i7LnABCstifO1rDjmA9CNiMTc1M13qW9feSVm5f
tAEbWvM5NIjXZ40HKMvsttE=
-----END PRIVATE KEY-----`
