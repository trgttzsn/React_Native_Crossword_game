import { Button, Text, View, Dimensions, Image, Alert, BackHandler } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"; 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import RNExitApp from "react-native-exit-app";

import { AppState } from "../store";
import styles from '../styles/MainStyle';
import FindWords from "../components/FindWords";
import { getWord } from "../store/actions/wordAction";
import WriteCrossWord from "../components/WriteCrossWord";


const CrossWordScreen = () => {


    const [answers, setAnswers] = useState([] as any);

    const startCount = 6;
    const [lastCount, setLastCount] = useState(0);
    const [count, setCount] = useState(startCount);
    const [points, setPoints] = useState(0);
    const [lastPoints, setLastPoints] = useState(0);

    const selectedWord = useSelector( (state: AppState) => state.word.data);
    const loading = useSelector( (state: AppState) => state.word.loading);


    const dispatch = useDispatch<any>();

    useEffect(() => {

        if(count <= 0){
            if(lastCount !== 0){ setCount(lastCount); setLastCount(0); setPoints(lastPoints); setLastPoints(0); }else{ setCount(startCount); setPoints(1); }
        }

        let words = [];
        do{
            words = FindWords(count);
        }while(words.length < count);


        dispatch(getWord(words, count));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    useEffect(() => {
        
        if(selectedWord.length > 0 && selectedWord.length < count){ setLastCount(count); setCount(0); setPoints(1); setLastPoints(points); }
        

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedWord]);

    const unsubscribe = NetInfo.addEventListener(state => {
        (state.isInternetReachable === false) &&
        Alert.alert("Bağlantı Hatası","İnternet bağlantınızı kontrol ediniz!", 
            [
                {text: 'Uygulamayı Kapat', onPress: () => RNExitApp.exitApp()}
            ],
        { cancelable: false })
    });

    
    useEffect(() => {
        unsubscribe();
    })

    return(
        <SafeAreaView style = {{ flex: 1}}>
            <View style = { styles.header }>
                <Image source={ require('../img/logo.png')} style ={{ marginLeft: 10, alignSelf: "center", marginTop: 5, width: 40, height: 40}}  />
                <Text style = { styles.headerText }>Basamak Bulmaca</Text>
            </View>
            <View style = { styles.container }>
                {
                    WriteCrossWord(selectedWord, count, setCount, points, setPoints, lastCount, startCount, answers, setAnswers, loading)
                }
            </View>
        </SafeAreaView>
    )
}

export default CrossWordScreen;