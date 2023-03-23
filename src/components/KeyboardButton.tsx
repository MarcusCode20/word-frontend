import Button from '@mui/material/Button'
import React from 'react'
import Letter from './Letter'

interface KeyboardButtonProp {
    value: String
}

const KeyboardButton = (prop: KeyboardButtonProp) => {
    return (
        <Button sx={{ margin: 0 }}>
            <Letter letter={prop.value} />
        </Button>
    )
}

export default KeyboardButton
