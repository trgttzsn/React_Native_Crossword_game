
import { words } from "../Words";


const FindWords = (count: number) => {
    

    let list = [];
    let lastWord = "";
    let findings = [];

    for(let i = 0; i < count; i++){


        if(lastWord === ""){
            findings = words.filter(get => get.includes(''));
        }else{
            
            let lastChar = Array.from(lastWord)[2];

            findings = words.filter(get => Array.from(get)[0] === lastChar );

        }

        if(findings){
            const findIndex = Math.floor(Math.random() * findings.length);
            
            lastWord = findings[findIndex];
        }

        list.push(lastWord);
        if(lastWord === undefined){ list = []; lastWord = ""; i = 0; }

    }

    return list;    

}

export default FindWords;
