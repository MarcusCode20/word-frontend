import { Box, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Level from './Level'

interface Data {
    missingWord: string
    solutions: string[]
}

const GameScreen = () => {
    const [data, setData] = useState<Data[]>([])

    const sendRequest = () => {
        axios
            .get('/api/words') //http://localhost:3000/   --In dev mode this runs twice due to React StrictMode https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
            .then(function (response) {
                setData(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error)
            })
            .finally(function () {
                // always executed
            })
    }

    useEffect(sendRequest, [])

    const levels = data.map((level) => (
        <Level key={level.missingWord} hiddenWord={level.missingWord}></Level>
    ))

    return (
        <Box
            sx={{
                margin: '0 auto 0 auto',
                width: '100vw',
                maxWidth: '750px',
                height: '60%',
                backgroundColor: 'red',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'stretch',
            }}
        >
            {levels}
        </Box>
    )
}

export default GameScreen
