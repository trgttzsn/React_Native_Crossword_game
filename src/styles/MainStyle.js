import { StatusBar, StyleSheet } from "react-native";
import { colWidth } from "../screens/CrossWordScreen";

const colWh = 30;

const styles = StyleSheet.create({
    mainContainer: {

    },
    container: {
      flex:1,
      backgroundColor: '#f2f2f2',
      padding: 10,
      paddingBottom: 0
    },
    header: {
      flexDirection: "row",
      height: 50,
      backgroundColor: "#476E89",
      borderBottomColor: "#13528A",
      borderBottomWidth: 3
    },
    headerText: {
      marginLeft: 20,
      color: "#fff",
      fontSize: 20,
      textAlign: "center",
      paddingTop: 10
    },
    levels: {
      textAlign: "left",
      fontSize: 15,
      color: "#0B284A",
      fontWeight: "bold"
    },
    points: {
      textAlign: "right",
      fontSize: 15,
      color: "#0B284A",
      fontWeight: "bold"
    },
    
    orangeButton: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 10,
      backgroundColor: "#FA7F08",
      borderColor: "#F24405",
    },
    startButton: {
      marginTop: 20,
      marginBottom: 50,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 10,
      backgroundColor: "#FA7F08",
      borderColor: "#F24405",
    },
    startButtonText: {
      textAlign: "center",
      fontWeight: "bold",
      color: "#fff"
    },
    wordButton: {
      width: 30,
      height: 30,
      backgroundColor: "#FA7F08",
      borderBottomColor: "#F24405",
      borderRightColor: "#F24405",
      borderTopColor: "#FAC143",
      borderLeftColor: "#FAC143",
      borderWidth: 3,
      borderStyle: "solid"
    },
    wordButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#2b2b2b",
      textAlign: "center"
    },
    crossWordMain: {
      marginTop: 5,
      padding: 0,
      borderWidth: 5,
      borderColor: "#0B284A",
      borderStyle: "solid"
    },
    crossWordColumn:{
      width: colWh,
      height: colWh,
      fontSize : 15,
      textAlign: "center",
      backgroundColor: "#FAF8F2",
      borderBottomWidth: 3,
      borderBottomColor: "#476E89",
      borderRightWidth: 3,
      borderRightColor: "#476E89",
      borderTopWidth: 3,
      borderTopColor: "#fff",
      borderLeftWidth: 3,
      borderLeftColor: "#fff"
    },
    crossWordTextView:{
      width: colWh,
      height: colWh,
      padding: 0,
      backgroundColor: "#476E89",
      borderBottomWidth: 3,
      borderBottomColor: "#13528A",
      borderRightWidth: 3,
      borderRightColor: "#13528A",
      borderTopWidth: 3,
      borderTopColor: "#A0B6BD",
      borderLeftWidth: 3,
      borderLeftColor: "#A0B6BD"
    },
    modalButton: {
      width: 100,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 10,
      backgroundColor: "#476E89",
      borderColor: "#13528A",
    },
    crossWordTextAnswer: {
      padding:10,
      fontSize : 17,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    crossWordText: {      
      fontSize : 17,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    crossWordTextWrong: {      
      fontSize : 17,
      color: "red",
      fontWeight: "bold",
      textAlign: "center",
    },
    crossWordPlaceHolder: {
      fontSize : 17,
      color: "#A0B6BD",
      fontWeight: "bold",
      textAlign: "center",
    }
  });

export default styles;