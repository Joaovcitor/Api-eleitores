const crypto = require("crypto");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const algorithm = "aes-256-ctr";

function encrypt(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

module.exports = encrypt;
