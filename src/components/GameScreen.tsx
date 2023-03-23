import { Box, Card } from '@mui/material'
import React from 'react'
import Level from './Level'

const GameScreen = () => {
    return (
        <Box
            sx={{
                margin: '0px',
                width: '100vw',
                height: '75vh',
                backgroundColor: 'red',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'stretch',
            }}
        >
            <Level word="D_G"></Level>
            <Level word="AP_LE"></Level>
            <Level word="ABSTRACT"></Level>
            <Level word="_KAY"></Level>
            <Level word="D_N_"></Level>
        </Box>
    )
}

export default GameScreen
