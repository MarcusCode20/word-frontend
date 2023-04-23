import { useEffect, useState } from 'react';
import { getTokenRequest } from './app/Requests';
import { StorageWrapper, StorageKey } from './app/StorageWrapper';
import App from './App';

const TokenLayer = () => {
    const [tokenValid, setTokenValid] = useState(false);

    const authToken = () => {
        getTokenRequest().then((data: any) => {
            const token = data.token as number;
            const savedToken = StorageWrapper.getItem(StorageKey.TOKEN);
            if (!savedToken || Number(savedToken) != token) {
                StorageWrapper.clear();
            }
            StorageWrapper.setItem(StorageKey.TOKEN, token + '');
            setTokenValid(true);
        });
    };

    useEffect(authToken, []);

    return <>{tokenValid ? <App /> : <></>}</>;
};

export default TokenLayer;
