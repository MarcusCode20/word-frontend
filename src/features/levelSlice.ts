import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface LevelState {
    levels: Level[]
    currentLevelNo: number
}

interface Level {
    missingWord: string
    potentialWords: string[]
    usersWord: string
    status: Status
}

enum Status {
    CORRECT = 'CORRECT',
    LOCKED = 'LOCKED',
    SKIPPED = 'SKIPPED',
    ACTIVE = 'ACTIVE',
}

const initialLevel: Level = {
    missingWord: '',
    potentialWords: [],
    usersWord: '',
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
            const currentLevel = state.levels[state.currentLevelNo]
            currentLevel.usersWord = action.payload
            currentLevel.status = Status.SKIPPED
        },
        levelPassed: (state, action: PayloadAction<string>) => {
            const currentLevel = state.levels[state.currentLevelNo]
            currentLevel.usersWord = action.payload
            currentLevel.status = Status.CORRECT
        },
    },
})

export const { levelPassed, levelSkipped } = levelSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default levelSlice.reducer
