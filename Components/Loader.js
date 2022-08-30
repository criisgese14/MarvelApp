import { Image, StyleSheet, View } from "react-native";

export default function Loader () {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('./loader.gif')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        marginHorizontal: 100
    },
    container: {
        flex: 1,
        backgroundColor: "#191919"
    }
})