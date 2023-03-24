import { Box, Card, CardContent, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Letter from './Letter'
import ScreenLetter from './ScreenLetter'

interface LevelProp {
    hiddenWord: string
}

const Level = (prop: LevelProp) => {
    const countMissing = (word: string) => {
        let count = 0
        Array.from(word).forEach((letter) => {
            if (letter == '_') {
                count++
            }
        })

        return count
    }

    const [inputArray, setInputArray] = useState<String[]>(
        Array(countMissing(prop.hiddenWord)).fill('')
    )

    const generateLetters = (word: string) => {
        const wordArray = Array.from(word)

        const letters: JSX.Element[] = []

        for (let i = 0, j = 0; i < wordArray.length; i++) {
            if (wordArray[i] == '_') {
                letters.push(
                    <ScreenLetter isInput={true}>
                        {inputArray[j++]}
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
            {generateLetters(prop.hiddenWord)}
        </Box>
    )

    return (
        <Paper
            sx={{
                margin: '0 2%',
                padding: '0px',
                height: '15%',
            }}
            variant="outlined"
        >
            {display}
        </Paper>
    )
}

export default Level
