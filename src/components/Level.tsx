import { Box, Card, CardContent, Paper, Typography } from '@mui/material'
import React from 'react'
import Letter from './Letter'

interface LevelProp {
    word: string
}

const Level = (prop: LevelProp) => {
    const letters = Array.from(prop.word).map((letter) => (
        <Letter>{letter}</Letter>
    ))

    const display = (
        <Box
            sx={{
                height: '100%',
                margin: '0px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: '3%',
            }}
        >
            {letters}
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
