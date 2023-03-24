import { Box, Card } from '@mui/material'
import React from 'react'
import Level from './Level'

const GameScreen = () => {
    return (
        <Box
            sx={{
                margin: '0px',
                width: '100vw',
                height: '60%',
                backgroundColor: 'red',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'stretch',
            }}
        >
            <Level hiddenWord="D_G"></Level>
            <Level hiddenWord="AP_LE"></Level>
            <Level hiddenWord="ABSTRACT"></Level>
            <Level hiddenWord="_KAY"></Level>
            <Level hiddenWord="D_N_"></Level>
        </Box>
    )
}

export default GameScreen
