import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface LevelState {
    levels: LevelData[]
    currentLevelNo: number
}

export interface WordData {
    missingWord: string
    solutions: string[]
    inputLength: number
}

export interface LevelData {
    missingWord: string
    potentialWords: string[]
    usersInput: string[]
    status: Status
}

enum Status {
    CORRECT = 'CORRECT',
    LOCKED = 'LOCKED',
    SKIPPED = 'SKIPPED',
    ACTIVE = 'ACTIVE',
}

const initialLevel: LevelData = {
    missingWord: '',
    potentialWords: [],
    usersInput: [],
    status: Status.LOCKED,
}

// Define the initial state using that type
const initialState: LevelState = {
    levels: [],
    currentLevelNo: 0,
}

export const levelSlice = createSlice({
    name: 'level',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        validateInput: (state) => {
            const currentLevel = state.levels[state.currentLevelNo]

            const userWord = Array.from(currentLevel.missingWord)

            for (let i = 0, j = 0; i < userWord.length; i++) {
                if (userWord[i] == '_') {
                    userWord[i] = currentLevel.usersInput[j++]
                }
            }

            if (currentLevel.potentialWords.includes(userWord.join(''))) {
                currentLevel.status = Status.CORRECT
                state.currentLevelNo++
            }
        },
        setLevelState: (state, action: PayloadAction<WordData[]>) => {
            for (let data of action.payload) {
                state.levels.push({
                    missingWord: data.missingWord,
                    potentialWords: data.solutions,
                    usersInput: new Array(data.inputLength).fill(''),
                    status: Status.LOCKED,
                })
            }
        },
        addLetter: (state, action: PayloadAction<string>) => {
            const currentLevelInput =
                state.levels[state.currentLevelNo].usersInput

            for (let index in currentLevelInput) {
                if (currentLevelInput[index] == '') {
                    currentLevelInput[index] = action.payload
                    break
                }
            }
        },
    },
})

export const { setLevelState, addLetter, validateInput } = levelSlice.actions

// Other code such as selectors can use the imported `RootState` type

export const getLevels = (state: RootState) => state.level.levels

export default levelSlice.reducer
