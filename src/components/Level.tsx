import { Box, Card, CardContent, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Letter from './Letter'
import ScreenLetter from './ScreenLetter'
import { LevelData, Status } from '../features/levelSlice'

interface LevelProp {
    hiddenWordArray: string[]
    inputArray: string[]
    reagan: LevelData
}

const Level = (prop: LevelProp) => {
    const isCorrect = prop.reagan.status == Status.CORRECT

    const generateLetters = (wordArray: string[]) => {
        const letters: JSX.Element[] = []

        for (let i = 0, j = 0; i < wordArray.length; i++) {
            if (wordArray[i] == '_') {
                letters.push(
                    <ScreenLetter isInput={true}>
                        {prop.inputArray[j++]}
                    </ScreenLetter>
                )
            } else {
                letters.push(
                    <ScreenLetter isInput={false}>{wordArray[i]}</ScreenLetter>
                )
            }
        }

        return letters
    }

    const display = (
        <Box
            sx={{
                height: '100%',
                margin: '0 2%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: '3%',
            }}
        >
            {generateLetters(prop.hiddenWordArray)}
        </Box>
    )

    return (
        <Paper
            sx={{
                margin: '0 2%',
                padding: '0px',
                height: '15%',
                background: isCorrect ? 'green' : 'white',
            }}
            variant="outlined"
        >
            {display}
        </Paper>
    )
}

export default Level
