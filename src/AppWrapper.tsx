import { useEffect, useState } from 'react';
import { getTokenRequest } from './app/requests';
import { StorageWrapper, StorageKey } from './app/storageWrapper';
import App from './App';
import TokenScreenError from './components/error/TokenScreenError';
import FlipScreenError from './components/error/FlipScreenError';

const AppWrapper = () => {
    const [tokenValid, setTokenValid] = useState(false);
    const [isScreenValid, setIsScreenValid] = useState(false);

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

    const checkScreenSize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;
        //Size defined in App.css
        console.log('height: ' + height + ' width: ' + width);
        if (height <= 600 || width <= 320) {
            setIsScreenValid(false);
        } else {
            setIsScreenValid(true);
        }
    };

    const detectSize = () => {
        checkScreenSize();
        let portrait = window.matchMedia('(orientation: portrait)');
        portrait.addEventListener('change', function (e) {
            console.log('Changing');
            checkScreenSize();
        });
    };

    useEffect(authToken, []);
    useEffect(detectSize, []);

    return <>{tokenValid ? isScreenValid ? <App /> : <FlipScreenError /> : <TokenScreenError />}</>;
};

export default AppWrapper;
