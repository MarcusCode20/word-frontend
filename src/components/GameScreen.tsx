import { Box, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Level from './Level';
import { setGameData, getLevels, LevelData } from '../features/gameSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

const GameScreen = () => {
    const dispatch = useAppDispatch();
    const sendGameRequest = () => {
        axios
            .get('http://localhost:3000/api/words')
            .then(function (response) {
                dispatch(setGameData(response.data));
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    };
    //In React StrictMode useEffect is run twice as screen is rendered twice to spot bugs
    useEffect(sendGameRequest, []);
    const levels = useAppSelector(getLevels).map((level) => <Level data={level}></Level>);

    return (
        <Box
            sx={{
                margin: '0 auto 0 auto',
                width: '100vw',
                maxWidth: '750px',
                height: '60%',
                backgroundColor: 'red',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'stretch'
            }}
        >
            {levels}
        </Box>
    );
};

export default GameScreen;
