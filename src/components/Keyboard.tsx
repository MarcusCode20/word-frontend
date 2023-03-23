import { Box } from '@mui/material'
import React from 'react'
import KeyboardButton from './KeyboardButton'

const Keyboard = () => {
    const rowOne = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const rowTwo = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const rowThree = ['#', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '#']

    const createRow = (row: string[]) => {
        const rowButtons = row.map((letter) => (
            <KeyboardButton>{letter}</KeyboardButton>
        ))

        return (
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
                {rowButtons}
            </Box>
        )
    }

    const rows = [rowOne, rowTwo, rowThree].map((row) => createRow(row))

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
            {rows}
        </Box>
    )
}

export default Keyboard
