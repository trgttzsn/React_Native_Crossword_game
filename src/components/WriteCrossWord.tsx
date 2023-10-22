import React,{ useEffect, useState } from "react";
import { List } from "../types/word";
import { Button, ScrollView, Text, View, TextInput, Pressable, Alert, Modal, Image, BackHandler, TouchableOpacity } from "react-native";
import styles from "../styles/MainStyle";

import IconAD from 'react-native-vector-icons/AntDesign';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";


const WriteCrossWord = (list: List[], count: number, setCount: Function, points: number, setPoints: Function, lastCount: number, startCount:number, answers: [], setAnswers: Function, loading: boolean) => {


    const [start, setStart] = useState(0);
    const [firstLevel, setFirstLevel] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({} as any);
    const [levelPoint, setLevelPoint] = useState(0);
    const [wait, setWait] = useState(false);

    let xCoords = [0] as number[];
    let yCoords = [0] as number[];
    let letterCoords = [{"wordCount": 0, "letter": "", "letterCount": 0, "x": 9999, "y": 9999}];

    let xMax = 0;
    let yMax = 0;
    let wordCount = 0;
    let tp = 0;

    (list.length > 0) && list.forEach( (item, index) => {
        if(index % 2 === 0){
            
            Array.from(item.word).forEach( (letter, i) => {
                xCoords.push(i + wordCount + 1);
                yCoords.push(wordCount);
                letterCoords.push({"wordCount": index+1 ,"letter": letter, "letterCount": i+1, "x": i+wordCount, "y": wordCount});
            })
            wordCount++;


        }else{
        
            Array.from(item.word).forEach( (letter, i) => {
                xCoords.push(wordCount + 1);
                yCoords.push(i + wordCount - 1 + 1);
                letterCoords.push({"wordCount": index+1 ,"letter": letter, "letterCount": i+1, "x": wordCount + 1, "y": i + wordCount - 1});
            })
            wordCount++;
        }

        tp += Array.from(item.word).length;
        
    });

    useEffect(() => {
        setLevelPoint(tp);
        setWait(false);
    },[tp])

    
    xMax = Math.max(...xCoords);
    yMax = Math.max(...yCoords);


    
    const handleTextChange = (text: string, wordIndex:number) => {

        let answersArray = [] as any;
        answersArray = [...answers];
        
        answersArray[wordIndex] = text.toLocaleLowerCase('tr-TR');

        if(Array.from(text)[Array.from(text).length-1] === " "){
            answersArray[wordIndex] = text.replace(/\s/g, '');
        }

            if(wordIndex !== 0 && (answersArray[wordIndex - 1] === "" || answersArray[wordIndex - 1] === undefined || Array.from(answersArray[wordIndex - 1])[0] === "-")){
                answersArray[wordIndex - 1] = "--" + Array.from(text)[0].toLocaleLowerCase('tr-TR');
            }

            setAnswers(answersArray);
            
        
        
    }

    const openLetter = (text: string, index: number) => {

        let answersArray = [] as any;
        answersArray = [...answers];

        if(Array.from(list[index].word).length > Array.from(text).length){
            text = text + Array.from(list[index].word)[Array.from(text).length];
            
            setLevelPoint(levelPoint - 1);

            if(index !== 0 && (answersArray[index - 1] === "" || answersArray[index - 1] === undefined || Array.from(answersArray[index - 1])[0] === "-")){
                answersArray[index - 1] = "--" + Array.from(text)[0].toLocaleLowerCase('tr-TR');
            }
            answersArray[index] = text;
            setAnswers(answersArray);
        }


    }

    
    const openWord = (index: number) => {

        let answersArray = [] as any;
        answersArray = [...answers];
        
        if(answersArray[index] !== list[index].word){

            let text = list[index].word;

            if(index !== 0 && (answersArray[index - 1] === "" || answersArray[index - 1] === undefined || Array.from(answersArray[index - 1])[0] === "-")){
                answersArray[index - 1] = "--" + Array.from(text)[0].toLocaleLowerCase('tr-TR');
            }
            
            answersArray[index] = text;
            
            setLevelPoint(levelPoint - Array.from(list[index].word).length);

            setAnswers(answersArray);
        }


    }
    
    const checkForFinish = () => {
        
        let err = 0;
        list.forEach((item, index) => {
            if(answers[index] !== item.word){ err = 1; }
        });

        if(err === 0){
            setFirstLevel(0);
            setStart(0);
        }

    }
     
    let colCount = 0;

    let r = <></>;
    if(xMax !== 0 && yMax !== 0){
                
        return (
            
            (wait) ? <View><Image source={require('../img/loading.gif')} style={{ alignSelf: "center", marginTop: 50, marginBottom: 50, width: 100, height: 100 }} /><Text style = {{ color: "#13528A", fontSize: 20, textAlign: "center"}}>Bulmaca hazırlanırken lütfen bekleyiniz</Text></View>  :
            
            (start === 0 && firstLevel === 1) ? 
                <ScrollView>
                    <View style = {{ marginTop: 10 }}>
                        <Text style = {{ marginBottom:15, fontSize: 25, fontWeight: "bold", color: "#000"  }}>Oynamaya Başlayın</Text>
                        <Text style = {{ marginLeft:20, marginRight: 20, marginBottom:10, fontSize: 15, fontWeight: "bold", color: "#000"  }}><IconAD name="caretright" size={12} style = {{ color: "#0B284A" }} /> Bulmacaları çözerek bir sonraki seviyeye geçin</Text>
                        <Text style = {{ marginLeft:20, marginRight: 20, marginBottom:10, fontSize: 15, fontWeight: "bold", color: "#000"  }}><IconAD name="caretright" size={12} style = {{ color: "#0B284A" }} /> Her seviyede fazladan bir harf ile ilerleyin</Text>
                        <Text style = {{ marginLeft:20, marginRight: 20, marginBottom:10, fontSize: 15, fontWeight: "bold", color: "#000" }}><IconAD name="caretright" size={12} style = {{ color: "#0B284A" }} /> Gerektiğinde "Harf Aç" ve "Kelimeyi Aç" jokerleri ile yardım alın</Text>
                    </View>
                    <TouchableOpacity style= { styles.startButton } onPress={ () => setStart(1) }><Text style={ styles.startButtonText }>Başlamak için tıklayınız</Text></TouchableOpacity>
                </ScrollView>
            :

            (start === 0) ? 
            
                <>

                <View style = {{ flexDirection: "row" }}>

                    <Image source={require('../img/confety.gif')} style={{ alignSelf: "center", width: 100, height: 100 }} />
                    <TouchableOpacity onPress={() => { setWait(true); setStart(1); setAnswers([]); setPoints(levelPoint + points); setModalVisible(false); setCount(count+1); }}><Text style = {{marginTop: 10, marginLeft: 5, color: "green", fontWeight: "bold", fontSize: 20, textAlign: "center"}}>Tebrikler{"\n"}sonraki seviyeye geçelim{"\n"}<IconAD name="arrowright" size={30} ></IconAD></Text></TouchableOpacity>
                </View>
            
        
                <ScrollView>
                <ScrollView horizontal= {true} >
                    <View style = { styles.crossWordMain }>
                        <View>
                            {
                                
                                Array.from(Array(yMax).keys()).map( y => {
                                    return(

                                        <View key={y} style = {{ flexDirection: "row" }}>
                                            {
                                                Array.from(Array(xMax).keys()).map( x => {
                                                    colCount++;
                                                    let found = 0;
                                                    letterCoords.forEach( (item, lindex) => {
                                        
                                                        let pHolder = 0;
                                                        if(x === item.x && y === item.y){
                                                            if(item.letterCount === 3){ pHolder = item.wordCount + 1; }
                                                            if(item.letterCount === 1 && item.wordCount === 1){ pHolder = 1; }
                                                            if(item.wordCount === list.length){ pHolder = 0; }


                                                            if(item.wordCount === 1 || (item.wordCount !== 0 && item.wordCount !== 1 && item.letterCount !== 1)){
                                                                found = 1;
                                        
                                                                r = <View style= { styles.crossWordTextView } id={"text-" + x.toString() + "-" + y.toString()} key={colCount} >
                                                                        
                                                                        {
                                                                            (answers[item.wordCount - 1]) && 
                                                                                (Array.from(answers[item.wordCount - 1])[item.letterCount - 1] !== "" && Array.from(answers[item.wordCount - 1])[item.letterCount - 1] !== "-") ?
                                                                                    (Array.from(answers[item.wordCount - 1])[item.letterCount - 1] === item.letter) ? 
                                                                                        <Text style= { styles.crossWordText }>{ item.letter }</Text> 
                                                                                    :
                                                                                        <Text style= { styles.crossWordTextWrong }>{ Array.from<string>(answers[item.wordCount - 1])[item.letterCount - 1] }</Text>
                                                                                :
                                                                                <Text style= { styles.crossWordPlaceHolder }>{(pHolder !== 0) ? pHolder.toString() : "" }</Text>
                                                                        }
                                                                        
                                                                    </View>;
                                                            }


                                                        }
                                        
                                                    });
                                        
                                                    if(found === 0){
                                                        r = <View style= { styles.crossWordColumn } key={colCount} id="div" ></View>;
                                                    }

                                                    return r;

                                                })
                                            }
                                        </View>
                                    );
                                })

                            }
                        </View>
                    </View>
                </ScrollView>
                </ScrollView>
            </> 
            
            :

            (!wait) &&

            <>
            <View style = {{ flexDirection: "row"}}> 
                <View style = {{ flex: 0.5 }}>
                    <Text style = { styles.levels }>{count-5}. Seviye</Text>
                </View>
                <View style = {{ flex: 0.5 }}>
                    <Text style = { styles.points }>Toplam Puan: { points }</Text>
                </View>
            </View>
            <View style = {{ flexDirection: "row", marginTop: 10 }} >

                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
                    
                    <SafeAreaProvider>
                    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
                    <View style={{ flexDirection: "row", height:40, backgroundColor: "#A0B6BD", borderBottomColor: "#A0B6BD", borderBottomWidth: 3}}>
                        <View style = {{ flex: 1}}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", paddingTop:5, paddingLeft: 10}}>Kelime: {modalData.wordIndex + 1}</Text>
                        </View>
                        <View style={{ paddingTop:5, paddingRight: 10, alignContent: "flex-end" }}>
                            <TouchableOpacity onPress={() => {checkForFinish(); setModalVisible(!modalVisible)}}>
                                <IconAD name="closesquare" size={30} style = {{ color: "#0B284A" }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 10}}>
                        <Text style = {{ margin: 20, fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#000" }}>{modalData.meaning}</Text>
                        <Text style = {{ marginBottom: 10, height:25, fontSize: 18, fontWeight: "bold", textAlign: "center", color: "#000" }}>
                            {
                                (answers[modalData.wordIndex] && Array.from(answers[modalData.wordIndex])[0] !== "-") ? 
                                    Array.from(answers[modalData.wordIndex]).map((letter, index) => {

                                        if(letter === Array.from(list[modalData.wordIndex].word)[index])
                                            return <Text key={index} style = {{ color: "green" }}>{ Array.from(list[modalData.wordIndex].word)[index] }</Text>;
                                        else
                                            return <Text key={index} style = {{ color: "red" }}>-</Text>;
                                        
                                    })
                                : ""
                            }
                        </Text>
                        <Text style={{ color: "#000" }} >{ modalData.word && Array.from(modalData.word).length} harf: </Text>
                            <View style = {{ marginBottom: 20, backgroundColor: "#0B284A"}}>
                                <TextInput onChangeText={text => { handleTextChange(text, modalData.wordIndex);} } value={ (answers[modalData.wordIndex] && Array.from(answers[modalData.wordIndex])[0] !== "-") ? answers[modalData.wordIndex] : ""} style = { styles.crossWordTextAnswer } maxLength={ (modalData.word) ? Array.from(modalData.word).length : 1 } autoCapitalize='none'></TextInput>
                            </View>
                            <View style= {{ flexDirection: "row", marginBottom: 20}}>
                                <View style={{ flex: 0.5, padding: 10}}>
                                    <TouchableOpacity style = { styles.modalButton } onPress={() => { openLetter((answers[modalData.wordIndex] && Array.from(answers[modalData.wordIndex])[0] !== "-") ? answers[modalData.wordIndex] : "", modalData.wordIndex) }}><Text style = {{ color: "#fff", textAlign: "center" }}>Harf Aç</Text></TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.5, padding: 10}}>
                                    <TouchableOpacity style = { styles.modalButton } onPress={() => { openWord(modalData.wordIndex) }}><Text style = {{ color: "#fff", textAlign: "center" }}>Kelimeyi Aç</Text></TouchableOpacity>
                                </View>
                            </View>
                        <TouchableOpacity style = { styles.modalButton } onPress={() => { checkForFinish(); setModalVisible(!modalVisible); }}><Text style = {{ color: "#fff", textAlign: "center" }}>Tamam</Text></TouchableOpacity>
                    </ScrollView>
                    
                </SafeAreaView>
                </SafeAreaProvider>
                </Modal>
                <ScrollView horizontal= {true} >
                {
                    list.map( (item, index) => {
                        const mData = {"wordIndex": index, "word": item.word, "word_normal": item.word_normal, "meaning": item.meaning}
                        return(
                            <TouchableOpacity key={index} style = { styles.wordButton } onPress={() => { setModalVisible(true); setModalData(mData) } }><Text style = { styles.wordButtonText }>{ index + 1}</Text></TouchableOpacity>
                        )
                    })
                }
                </ScrollView>
            </View>
                <ScrollView>
                <ScrollView horizontal= {true} >
                    <View style = { styles.crossWordMain }>
                        <View>
                            {
                                
                                Array.from(Array(yMax).keys()).map( y => {
                                    return(

                                        <View key={y} style = {{ flexDirection: "row" }}>
                                            {
                                                Array.from(Array(xMax).keys()).map( x => {
                                                    colCount++;
                                                    let found = 0;
                                                    letterCoords.forEach( (item, lindex) => {
                                        
                                                        let pHolder = 0;
                                                        if(x === item.x && y === item.y){
                                                            if(item.letterCount === 3){ pHolder = item.wordCount + 1; }
                                                            if(item.letterCount === 1 && item.wordCount === 1){ pHolder = 1; }
                                                            if(item.wordCount === list.length){ pHolder = 0; }


                                                            if(item.wordCount === 1 || (item.wordCount !== 0 && item.wordCount !== 1 && item.letterCount !== 1)){
                                                                found = 1;
                                        
                                                                r = <View style= { styles.crossWordTextView } id={"text-" + x.toString() + "-" + y.toString()} key={colCount} >
                                                                        
                                                                        {
                                                                            (answers[item.wordCount - 1]) && 
                                                                                (Array.from(answers[item.wordCount - 1])[item.letterCount - 1] !== "" && Array.from(answers[item.wordCount - 1])[item.letterCount - 1] !== "-") ?
                                                                                    (Array.from(answers[item.wordCount - 1])[item.letterCount - 1] === item.letter) ? 
                                                                                        <Text style= { styles.crossWordText }>{ item.letter }</Text> 
                                                                                    :
                                                                                        <Text style= { styles.crossWordTextWrong }>{ Array.from<string>(answers[item.wordCount - 1])[item.letterCount - 1] }</Text>
                                                                                :
                                                                                <Text style= { styles.crossWordPlaceHolder }>{(pHolder !== 0) ? pHolder.toString() : "" }</Text>
                                                                        }
                                                                        
                                                                    </View>;
                                                            }


                                                        }
                                        
                                                    });
                                        
                                                    if(found === 0){
                                                        r = <View style= { styles.crossWordColumn } key={colCount} id="div" ></View>;
                                                    }

                                                    return r;

                                                })
                                            }
                                        </View>
                                    );
                                })

                            }
                        </View>
                    </View>
                </ScrollView>
                </ScrollView>
            </>
        )
    }
}

export default WriteCrossWord;
