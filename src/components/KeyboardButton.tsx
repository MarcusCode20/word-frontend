import Button from '@mui/material/Button'
import React, { PropsWithChildren } from 'react'
import Letter from './Letter'

const KeyboardButton = (prop: PropsWithChildren) => {
    return (
        <Button sx={{ margin: 0 }} variant="outlined">
            <Letter>{prop.children}</Letter>
        </Button>
    )
}

export default KeyboardButton
