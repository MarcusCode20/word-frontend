import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface LevelState {
    levels: LevelData[]
    currentLevelNo: number
}

export interface WordData {
    missingWord: string
    potentialWords: string[]
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
        levelSkipped: (state, action: PayloadAction<string>) => {
            const currentLevel = state.levels[state.currentLevelNo++]
            currentLevel.status = Status.SKIPPED
        },
        levelPassed: (state, action: PayloadAction<string>) => {
            const currentLevel = state.levels[state.currentLevelNo++]
            currentLevel.status = Status.CORRECT
        },
        setLevelState: (state, action: PayloadAction<WordData[]>) => {
            for (let data of action.payload) {
                state.levels.push({
                    missingWord: data.missingWord,
                    potentialWords: data.potentialWords,
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

export const { levelPassed, levelSkipped, setLevelState, addLetter } =
    levelSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getCurrentLevel = (state: RootState) =>
    state.level.levels[state.level.currentLevelNo]

export const getLevels = (state: RootState) => state.level.levels

export default levelSlice.reducer
