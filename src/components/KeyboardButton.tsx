import Button from '@mui/material/Button'
import React, { PropsWithChildren } from 'react'
import Letter from './Letter'
import { addLetter, validateInput, removeLetter } from '../features/levelSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks'

interface KeyboardButtonProp {
    letter: string
}

const KeyboardButton = (prop: PropsWithChildren<KeyboardButtonProp>) => {
    const dispatch = useAppDispatch()

    const sendLetter = () => {
        if (prop.letter == '#') {
            dispatch(validateInput())
        } else if (prop.letter == '@') {
            dispatch(removeLetter())
        } else {
            dispatch(addLetter(prop.letter))
        }
    }

    return (
        <Button sx={{ margin: 0 }} variant="outlined" onClick={sendLetter}>
            <Letter>{prop.letter}</Letter>
        </Button>
    )
}

export default KeyboardButton
