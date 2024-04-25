//SSL Certificate and Key Environment Variables
module.exports = {
    privateKeyPath: process.env.PRIVATE_KEY_PATH || "./SoftwareCertificates/private.key",
    certificatePath: process.env.CERTIFICATE_PATH || "./SoftwareCertificates/certificate.crt",
    passphrase: process.env.PRIVATE_KEY_PASSPHRASE || "password",
    port: process.env.PORT || 4001
};