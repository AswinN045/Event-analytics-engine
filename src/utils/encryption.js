import crypto from "crypto";
import { secretKey } from "../config/config.js";

const IV_LENGTH = 16;
const hashKey = crypto.createHash("sha256").update(secretKey).digest(); 

export const encryptApiKey = () => {
    const apiKey = crypto.randomBytes(32).toString("hex");
    const iv = crypto.randomBytes(IV_LENGTH); 
    const cipher = crypto.createCipheriv("aes-256-cbc", hashKey, iv);
    let encrypted = cipher.update(apiKey, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted; 
};

export const decryptApiKey = (encryptedKey) => {
    const [ivHex, encrypted] = encryptedKey.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", hashKey, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
