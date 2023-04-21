import { decrypt, encrypt } from './Security';

export enum StorageKey {
    GAME_SAVED = 'game',
    SCORE_SAVED = 'score',
    DATE_SAVED = 'date',
    USERNAME = 'username'
}

export class StorageWrapper {
    static setItem(key: string, item: string) {
        localStorage.setItem(key, encrypt(item));
    }

    static getItem(key: string) {
        const encryptedItem = localStorage.getItem(key);
        if (encryptedItem) {
            return decrypt(encryptedItem);
        }
        return null;
    }

    static clear() {
        localStorage.clear();
    }
}
