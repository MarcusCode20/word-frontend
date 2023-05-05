import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { toast } from 'react-toastify';

export interface GameState {
    games: Record<Mode, GameData>;
    currentMode: Mode;
}

export interface GameData {
    levels: LevelData[];
    currentLevelNo: number;
    alive: boolean;
    loaded: boolean;
    started: boolean;
    date?: string;
    ended: boolean;
    completed: boolean;
}

export interface RawData {
    hiddenWord: string;
    solutions: WordAndScore;
    inputLength: number;
}

export interface RawDataPayload {
    data: RawData[];
    //Daily mode will supply the date to which is it valid for
    date?: number[];
    mode: Mode;
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
    usersWord: string;
    score: number;
}

export enum Mode {
    DAILY = 'DAILY',
    PRACTICE = 'PRACTICE'
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
const intitalGameData: GameData = {
    levels: [],
    currentLevelNo: 0,
    alive: false,
    loaded: false,
    started: false,
    ended: false,
    completed: false
};

const initialState: GameState = {
    games: {
        [Mode.DAILY]: intitalGameData,
        [Mode.PRACTICE]: intitalGameData
    },
    currentMode: Mode.DAILY
};

export const gameSlice = createSlice({
    name: 'game',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        checkUserWord: (state) => {
            const currentGame = state.games[state.currentMode];
            //Get current level
            const currentLevel = currentGame.levels[currentGame.currentLevelNo];
            if (currentLevel.status == Status.ACTIVE) {
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
                    currentLevel.score = currentLevel.solutions[userWord];
                    currentLevel.usersWord = userWord;

                    if (currentGame.currentLevelNo + 1 <= MAX_LEVEL) {
                        currentGame.levels[currentGame.currentLevelNo + 1].status = Status.ACTIVE;
                        currentGame.currentLevelNo++;
                    } else {
                        currentGame.alive = false;
                        currentGame.ended = !currentGame.alive && currentGame.started && currentGame.loaded;
                        currentGame.completed = currentGame.levels.reduce(
                            (completed, level) => completed && level.status == Status.CORRECT,
                            true
                        );
                    }
                } else {
                    toast('Not a valid word!');
                }
            }
        },
        setGameData: (state, action: PayloadAction<[RawDataPayload, Mode]>) => {
            const gameData = action.payload[0];
            const mode = action.payload[1];

            const game = state.games[mode];
            const levels: LevelData[] = [];
            for (let data of gameData.data) {
                levels.push({
                    hiddenWord: data.hiddenWord,
                    solutions: data.solutions,
                    userInput: new Array(data.inputLength).fill(BLANK),
                    status: Status.LOCKED,
                    time: ONE_MINUTE,
                    usersWord: BLANK,
                    score: 0
                });
            }
            if (mode == Mode.DAILY && gameData.mode == Mode.DAILY) {
                game.date = (gameData.date as number[]).toString();
            }
            game.levels = levels;
            game.currentLevelNo = 0;
            game.alive = false;
            game.started = false;
            game.loaded = true;
        },
        addLetter: (state, action: PayloadAction<string>) => {
            const currentGame = state.games[state.currentMode];
            const currentLevel = currentGame.levels[currentGame.currentLevelNo];
            if (currentLevel.status == Status.ACTIVE) {
                const currentLevelInput = currentLevel.userInput;
                for (let index in currentLevelInput) {
                    //Reach the first blank space and replace with the typed letter
                    //No effect takes places if the user runs out of blank spaces.
                    if (currentLevelInput[index] == BLANK) {
                        currentLevelInput[index] = action.payload;
                        break;
                    }
                }
            }
        },
        removeLetter: (state) => {
            const currentGame = state.games[state.currentMode];
            const currentLevel = currentGame.levels[currentGame.currentLevelNo];
            if (currentLevel.status == Status.ACTIVE) {
                const currentLevelInput = currentLevel.userInput;

                const index = currentLevelInput.indexOf(BLANK);

                if (index == -1) {
                    //When the user has filled up all his inputs so remove the last one
                    currentLevelInput[currentLevelInput.length - 1] = BLANK;
                } else if (index - 1 >= 0) {
                    //When the user has at least one letter filled in his inputs
                    //Since we get the index of the valid input space, remove the one before
                    currentLevelInput[index - 1] = BLANK;
                }
            }
        },
        skipLevel: (state) => {
            const currentGame = state.games[state.currentMode];
            currentGame.levels[currentGame.currentLevelNo].status = Status.SKIPPED;
            if (currentGame.currentLevelNo + 1 <= MAX_LEVEL) {
                currentGame.levels[currentGame.currentLevelNo + 1].status = Status.ACTIVE;
                currentGame.currentLevelNo++;
            } else {
                currentGame.alive = false;
                currentGame.ended = !currentGame.alive && currentGame.started && currentGame.loaded;
            }
        },
        startGame: (state, action: PayloadAction<Mode>) => {
            const game = state.games[action.payload];
            game.levels[0].status = Status.ACTIVE;
            game.alive = true;
            game.started = true;
        },
        setMode: (state, action: PayloadAction<Mode>) => {
            state.currentMode = action.payload;
        },
        loadCachedDaily: (state, action: PayloadAction<GameData>) => {
            state.games[Mode.DAILY] = action.payload;
        },
        setLoading: (state, action: PayloadAction<[boolean, Mode]>) => {
            state.games[action.payload[1]].loaded = !action.payload[0];
        }
        //--------------------FIX------------------------//
    }
});

export const {
    setGameData,
    addLetter,
    checkUserWord,
    removeLetter,
    skipLevel,
    startGame,
    setMode,
    loadCachedDaily,
    setLoading
} = gameSlice.actions;

export const getCurrentGame = (state: RootState) => state.game.games[state.game.currentMode];

export const getCurrentMode = (state: RootState) => state.game.currentMode;

export const getDailyGame = (state: RootState) => state.game.games[Mode.DAILY];

export default gameSlice.reducer;
