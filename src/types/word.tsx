import { ThunkDispatch } from "redux-thunk";

export interface List{
    word: string,
    word_normal: string,
    meaning: string
}

export interface Word{
    madde : string;
    anlamlarListe: Meaning[];
}

export interface Meaning{
    anlam: string
}

export interface WordState{
    data: List[];
    loading: boolean;
    error: string;
}

interface GET_WORD_START {
    type: "GET_WORD_START";
}

interface GET_WORD_SUCCESS {
    type: "GET_WORD_SUCCESS";
    payload: List[];
}

interface GET_WORD_ERROR {
    type: "GET_WORD_ERROR";
}

export type WordAction = GET_WORD_START | GET_WORD_SUCCESS | GET_WORD_ERROR;
export type WordDispatch = ThunkDispatch<WordState, void, WordAction>;