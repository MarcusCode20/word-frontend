import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import Letter from './Letter';
import ScreenLetter from './ScreenLetter';
import { API_BLANK, LevelData, Status } from '../features/gameSlice';

interface LevelProp {
    data: LevelData;
}

const Level = (prop: LevelProp) => {
    const hiddenWordArray = Array.from(prop.data.hiddenWord);
    const userInput = prop.data.userInput;
    const isCorrect = prop.data.status == Status.CORRECT;

    //Generate the letters to be shown on screen
    const generateLetters = (wordArray: string[]) => {
        const letters: JSX.Element[] = [];

        for (let i = 0, j = 0; i < wordArray.length; i++) {
            if (wordArray[i] == API_BLANK) {
                //If blank then refence the redux array, allowing the value to be rendered again
                //when a user action takes place, like typing.
                letters.push(<ScreenLetter isInput={true}>{userInput[j++]}</ScreenLetter>);
            } else {
                letters.push(<ScreenLetter isInput={false}>{wordArray[i]}</ScreenLetter>);
            }
        }

        return letters;
    };

    const display = (
        <Box
            sx={{
                height: '100%',
                margin: '0 2%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: '3%'
            }}
        >
            {generateLetters(hiddenWordArray)}
        </Box>
    );

    return (
        <Paper
            sx={{
                margin: '0 2%',
                padding: '0px',
                height: '15%',
                background: isCorrect ? 'green' : 'white'
            }}
            variant="outlined"
        >
            {display}
        </Paper>
    );
};

export default Level;
