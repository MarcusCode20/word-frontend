import Button from '@mui/material/Button'
import React, { PropsWithChildren } from 'react'
import Letter from './Letter'

interface KeyboardButtonProp {
    value: String
}

const KeyboardButton = (prop: PropsWithChildren) => {
    return (
        <Button sx={{ margin: 0 }}>
            <Letter>{prop.children}</Letter>
        </Button>
    )
}

export default KeyboardButton
