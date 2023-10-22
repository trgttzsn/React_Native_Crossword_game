
import { combineReducers } from '@reduxjs/toolkit';
import { WordState } from "../types/word";
import wordReducer from './reducers/wordReducer';


export interface AppState {
    word: WordState;
}

const rootReducer = combineReducers<AppState>({
    word: wordReducer,
})

export default rootReducer;