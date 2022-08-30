import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Comic ({name, image}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Image style={styles.image} source={{uri:image}}/>
        </View>
    )
}

const styles = StyleSheet.container = ({
    container: {
        display: "flex",
        alignItems: "center",
        marginVertical: 10,
    },
    image: {
        height: 250,
        width: 180,
    },
    title: {
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    }

})