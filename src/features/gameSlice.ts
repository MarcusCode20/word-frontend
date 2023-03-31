import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

// Define a type for the slice state
interface GameState {
    levels: LevelData[];
    currentLevelNo: number;
}

export interface GameData {
    hiddenWord: string;
    solutions: string[];
    inputLength: number;
}

export interface LevelData {
    hiddenWord: string;
    solutions: string[];
    userInput: string[];
    status: Status;
}

export enum Status {
    CORRECT = 'CORRECT',
    LOCKED = 'LOCKED',
    SKIPPED = 'SKIPPED',
    ACTIVE = 'ACTIVE'
}

export const API_BLANK = '_';
export const BLANK = '';

// Define the initial state using that type
const initialState: GameState = {
    levels: [],
    currentLevelNo: 0
};

export const gameSlice = createSlice({
    name: 'game',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        checkUserWord: (state) => {
            //Get current level
            const currentLevel = state.levels[state.currentLevelNo];

            //Generate the user's word from the hidden word and the user's input as an array
            const userWordArray = Array.from(currentLevel.hiddenWord);

            for (let i = 0, j = 0; i < userWordArray.length; i++) {
                if (userWordArray[i] == API_BLANK) {
                    userWordArray[i] = currentLevel.userInput[j++];
                }
            }

            //Now check if the user's word is correct
            const userWord = userWordArray.join(BLANK);
            if (currentLevel.solutions.includes(userWord)) {
                currentLevel.status = Status.CORRECT;
                state.currentLevelNo++;
            }
        },
        setGameData: (state, action: PayloadAction<GameData[]>) => {
            const levels: LevelData[] = [];
            for (let data of action.payload) {
                levels.push({
                    hiddenWord: data.hiddenWord,
                    solutions: data.solutions,
                    userInput: new Array(data.inputLength).fill(BLANK),
                    status: Status.LOCKED
                });
            }
            state.levels = levels;
        },
        addLetter: (state, action: PayloadAction<string>) => {
            const currentLevelInput = state.levels[state.currentLevelNo].userInput;

            for (let index in currentLevelInput) {
                //Reach the first blank space and replace with the typed letter
                //No effect takes places if the user runs out of blank spaces.
                if (currentLevelInput[index] == BLANK) {
                    currentLevelInput[index] = action.payload;
                    break;
                }
            }
        },
        removeLetter: (state) => {
            const currentLevelInput = state.levels[state.currentLevelNo].userInput;

            const index = currentLevelInput.indexOf(BLANK);

            if (index == -1) {
                //When the user has filled up all his inputs so remove the last one
                currentLevelInput[currentLevelInput.length - 1] = BLANK;
            } else if (index - 1 >= 0) {
                //When the user has at least one letter filled in his inputs
                //Since we get the index of the valid input space, remove the one before
                currentLevelInput[index - 1] = BLANK;
            }
        },
        skipLevel: (state) => {
            state.levels[state.currentLevelNo++].status = Status.SKIPPED;
        }
    }
});

export const { setGameData, addLetter, checkUserWord, removeLetter, skipLevel } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getLevels = (state: RootState) => state.game.levels;

export default gameSlice.reducer;
