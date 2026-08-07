import { validateHeaderValue } from "http";

function getEncryptionKey(key: string): string {
    const value = process.env[key]

    if (!value) {
        throw new Error(`Missing encrypting key in compilance level: ${key}`)
    }

    return value;
}

export const EncryptionTransformerConfig = {
    key: getEncryptionKey('ENCRYPTION_KEY'),
    algorithm: 'aes-256-cbc',
    ivLength: 16
};