import axios from "axios";


function dictionary(){
    
    return axios.create({
        baseURL: "https://sozluk.gov.tr/"
    });
}

export default dictionary;