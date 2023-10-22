import { ScrollView, Text, View, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/MainStyle";


const HowToPlay = () => {

    return(
        <SafeAreaView style = {{ flex: 1}}>
        <View style = { styles.header }>
            <Image source={ require('../img/logo.png')} style ={{ marginLeft: 10, alignSelf: "center", marginTop: 5, width: 40, height: 40}}  />
            <Text style = { styles.headerText }>Basamak Bulmaca</Text>
        </View>
        <View style = { styles.container }>
            <ScrollView>
            <View style = {{ marginTop: 10 }}>
                <Text style = {{ fontSize: 15, fontWeight: "bold", color: "#000"  }}>Nasıl Oynanır?</Text>
                <View style = {{ marginLeft: 10 }}>
                    <Text style = {{ marginBottom: 5, color: "#000" }}>● Bulmaca rastgele seçilmiş altı adet kelime ile başlar</Text>
                    <Text style = {{ marginBottom: 5, color: "#000" }}>● Her kelimenin TDK sözlüğünde bulunan anlamları verilir ve tahmin edilmeye çalışılır</Text>
                    <Text style = {{ marginBottom: 5, color: "#000" }}>● Bulmaca tamamlandıktan sonra kelime sayısı bir artarak yeni bulmacanın sorulduğu diğer seviyeye geçilir</Text>
                    <Text style = {{ marginBottom: 5, color: "#000" }}>● Harf açtırma jokeri ile kelimenin sıralı olarak bir harfi açılabilir</Text>
                    <Text style = {{ marginBottom: 5, color: "#000" }}>● Kelime açtırma jokeri ile kelimenin tamamı açılabilir</Text>
                </View>
                
                <Text style = {{ fontSize: 15, fontWeight: "bold" }}>Puanlama</Text>
                <View style = {{ marginLeft: 10 }}>
                    <Text style = {{ marginBottom: 5, color: "#000" }}>● Her bir kelime içerdiği harf sayısı kadar puana sahiptir</Text>
                    <Text style = {{ marginBottom: 5, color: "#000" }}>● Doğru yazılan her bir harf için bir puan kazanırsınız</Text>
                    <Text style = {{ marginBottom: 5, color: "#000" }}>● Harf açtırma jokeri ile toplam puanınızdan bir puan eksilir</Text>
                    <Text style = {{ marginBottom: 5, color: "#000" }}>● Kelime açtırma jokeri kullanılan kelimeden puan kazanılmaz</Text>
                </View>
            </View>
            </ScrollView>
        </View>
        </SafeAreaView>
    )
}

export default HowToPlay;