import { List, Word } from "../../types/word";
import { WordDispatch } from "../../types/word";
import dictionary from "../../utils/dictionary";


export const getWord = (word: string[], count: number) => async (dispatch: WordDispatch) => {
    dispatch({ type: "GET_WORD_START"});
    try{
        const wordList = [] as List[];

        for(const item of word){

            const response = await dictionary().get<Word []>("gts?ara="+item);
            if(response.data[0] === undefined){ continue; }

            const dat = response.data[0];
            if(dat.anlamlarListe === undefined){ continue; }

            const obj = { "word_normal": dat.madde, "word": item.replace(/\s+/g, ''), "meaning": dat.anlamlarListe[0].anlam};

            wordList.push(obj);

        }

        dispatch({ type: "GET_WORD_SUCCESS", payload: wordList});

    } catch {
        dispatch({ type: "GET_WORD_ERROR"});
    }
}