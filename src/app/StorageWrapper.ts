import { decrypt, encrypt } from './Security';

export enum StorageKey {
    GAME_SAVED = 'game',
    SCORE_SAVED = 'score',
    DATE_SAVED = 'date',
    USERNAME = 'username',
    TOKEN = 'token',
    DAILY_STATS = 'stats',
    DAILY_STATS_SAVED = 'stats_saved'
}

export class StorageWrapper {
    static setItem(key: string, item: any) {
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
        //Don't clear the token or daily stats
        localStorage.removeItem(StorageKey.GAME_SAVED);
        localStorage.removeItem(StorageKey.SCORE_SAVED);
        localStorage.removeItem(StorageKey.DATE_SAVED);
        localStorage.removeItem(StorageKey.USERNAME);
        localStorage.removeItem(StorageKey.DAILY_STATS_SAVED);
    }
}
