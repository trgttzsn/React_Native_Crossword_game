import { ScrollView, Text, View, Image } from "react-native"
import styles from "../styles/MainStyle";
import { SafeAreaView } from "react-native-safe-area-context";


const About = () => {

    return(
        <SafeAreaView style = {{ flex: 1}}>
        <View style = { styles.header }>
            <Image source={ require('../img/logo.png')} style ={{ marginLeft: 10, alignSelf: "center", marginTop: 5, width: 40, height: 40}}  />
            <Text style = { styles.headerText }>Basamak Bulmaca</Text>
        </View>
        <ScrollView style = { styles.container }>
            
        <View style = {{ marginTop: 10 }}>
            <Text style = {{ textAlign:"center", margin:20, marginBottom:10, fontSize: 15, fontWeight: "bold", color: "#000" }}>Basamak Bulmaca v1.0</Text>
            
            <Text style = {{ textAlign:"center", margin:20, marginBottom:10, fontSize: 15, fontWeight: "bold", color: "#000"  }}>By Turgut T.</Text>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default About;