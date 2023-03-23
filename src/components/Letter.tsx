import { Typography } from '@mui/material'
import React from 'react'

interface LetterProp {
    letter: String
}

const Letter = (prop: LetterProp) => {
    return (
        <Typography
            variant="h6"
            component="div"
            sx={{
                textAlign: 'center',
                lineHeight: '100%',
                maxHeight: '50px',
                margin: '0 1%',
                fontWeight: 'bold',
                fontSize: '40px',
            }}
        >
            {prop.letter}
        </Typography>
    )
}

export default Letter
