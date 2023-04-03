import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

// Define a type for the slice state
export interface GameState {
    levels: LevelData[];
    currentLevelNo: number;
    score: number;
    alive: boolean;
    loaded: boolean;
    started: boolean;
}

export interface GameData {
    hiddenWord: string;
    solutions: WordAndScore;
    inputLength: number;
}

//The the key is the word
//The value is the score
export interface WordAndScore {
    [word: string]: number;
}

export interface LevelData {
    hiddenWord: string;
    solutions: WordAndScore;
    userInput: string[];
    status: Status;
    time: number;
}

export enum Status {
    CORRECT = 'CORRECT',
    LOCKED = 'LOCKED',
    SKIPPED = 'SKIPPED',
    ACTIVE = 'ACTIVE'
}

export const API_BLANK = '_';
export const BLANK = '';
//5 levels, but indexed from 0 to 4
export const MAX_LEVEL = 4;
export const ONE_MINUTE = 60;

// Define the initial state using that type
const initialState: GameState = {
    levels: [],
    currentLevelNo: 0,
    score: 0,
    alive: false,
    loaded: false,
    started: false
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
            if (currentLevel.solutions[userWord]) {
                currentLevel.status = Status.CORRECT;
                state.score += currentLevel.solutions[userWord];

                if (state.currentLevelNo + 1 <= MAX_LEVEL) {
                    state.levels[state.currentLevelNo + 1].status = Status.ACTIVE;
                    state.currentLevelNo++;
                } else {
                    state.alive = false;
                }
            }
        },
        setGameData: (state, action: PayloadAction<GameData[]>) => {
            const levels: LevelData[] = [];
            for (let data of action.payload) {
                levels.push({
                    hiddenWord: data.hiddenWord,
                    solutions: data.solutions,
                    userInput: new Array(data.inputLength).fill(BLANK),
                    status: Status.LOCKED,
                    time: ONE_MINUTE
                });
            }
            state.levels = levels;
            state.loaded = true;
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
            state.levels[state.currentLevelNo].status = Status.SKIPPED;
            if (state.currentLevelNo + 1 <= MAX_LEVEL) {
                state.levels[state.currentLevelNo + 1].status = Status.ACTIVE;
                state.currentLevelNo++;
            } else {
                state.alive = false;
            }
        },
        startGame: (state) => {
            state.levels[0].status = Status.ACTIVE;
            state.alive = true;
            state.started = true;
        }
        //--------------------FIX------------------------//
    }
});

export const { setGameData, addLetter, checkUserWord, removeLetter, skipLevel, startGame } = gameSlice.actions;

export const getGameState = (state: RootState) => state.game;

export default gameSlice.reducer;
