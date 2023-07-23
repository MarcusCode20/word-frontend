import { useEffect, useState } from 'react';
import { getTokenRequest } from './app/requests';
import { StorageWrapper, StorageKey } from './app/storageWrapper';
import App from './App';
import TokenScreenError from './components/error/TokenScreenError';
import FlipScreenError from './components/error/FlipScreenError';

const AppWrapper = () => {
    const [responseRecieved, setResponseRecieved] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);
    const [isScreenValid, setIsScreenValid] = useState(true);

    const authToken = () => {
        getTokenRequest().then((data: any) => {
            const token = data.token as number;
            const savedToken = StorageWrapper.getItem(StorageKey.TOKEN);
            if (!savedToken || Number(savedToken) != token) {
                StorageWrapper.clear();
            }
            StorageWrapper.setItem(StorageKey.TOKEN, token + '');
            setTokenValid(true);
            setResponseRecieved(true);
        });
    };

    const checkScreenSize = () => {
        //Add delay since IOS Chrome is slow on the screen size
        setTimeout(() => {
            let height = window.outerHeight;
            let width = window.outerWidth;
            //Size defined in App.css
            if (height <= 600 || width <= 320) {
                setIsScreenValid(false);
            } else {
                setIsScreenValid(true);
            }
        }, 100);
    };

    const detectSize = () => {
        checkScreenSize();
        window.addEventListener('resize', function (e) {
            checkScreenSize();
        });
    };

    useEffect(authToken, []);
    useEffect(detectSize, []);

    return (
        <>
            {responseRecieved ? (
                tokenValid ? (
                    isScreenValid ? (
                        <App />
                    ) : (
                        <FlipScreenError />
                    )
                ) : (
                    <TokenScreenError />
                )
            ) : (
                <div></div>
            )}
        </>
    );
};

export default AppWrapper;
