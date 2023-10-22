import { List, WordAction } from "../../types/word";
import { WordState } from "../../types/word";


const defaultState: WordState = {
    data: {} as List[],
    loading: false,
    error: ""
}

const wordReducer = (state: WordState = defaultState, action: WordAction) => {
    switch(action.type){
        case "GET_WORD_START": return {...state, loading: true, error: ""};
        case "GET_WORD_SUCCESS": return {...state, loading: false, data: action.payload};
        case "GET_WORD_ERROR": return {...state, loading:false, error: "Error fetchind data."};

        default: return state;
    }
}

export default wordReducer;