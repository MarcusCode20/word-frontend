import { Box } from '@mui/material'
import React from 'react'
import KeyboardButton from './KeyboardButton'

const Keyboard = () => {
    const rowOne = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(
        (letter) => <KeyboardButton>{letter}</KeyboardButton>
    )
    const rowTwo = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(
        (letter) => <KeyboardButton>{letter}</KeyboardButton>
    )
    const rowThree = ['#', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '#'].map(
        (letter) => <KeyboardButton>{letter}</KeyboardButton>
    )

    return (
        <Box
            sx={{
                margin: '0px',
                width: '100vw',
                height: '25vh',
                backgroundColor: 'green',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    margin: '0px',
                    width: '100vw',
                    height: '30%',
                    backgroundColor: 'orange',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                {rowOne}
            </Box>
            <Box
                sx={{
                    margin: '0px',
                    width: '100vw',
                    height: '30%',
                    backgroundColor: 'pink',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                {rowTwo}
            </Box>
            <Box
                sx={{
                    margin: '0px',
                    width: '100vw',
                    height: '30%',
                    backgroundColor: 'purple',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                {rowThree}
            </Box>
        </Box>
    )
}

export default Keyboard
