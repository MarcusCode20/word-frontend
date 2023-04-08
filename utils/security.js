import CryptoJS from 'crypto-js';

const key = 'super secure secret key';

export function encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

export function decrypt(data) {
    const decrypt = CryptoJS.AES.decrypt(data, key);
    return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
}
