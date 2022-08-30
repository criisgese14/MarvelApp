import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default function Information({image, name, description}){
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: `${image}`}}/>
            <Text style={styles.name}>{name}</Text>
            {description ? 
            <View>
                <Text style={styles.title}>Description</Text>
                <Text style={styles.description}>{description}</Text>
            </View> : <Text style={styles.error}>Description is not available</Text>}
        </View>
    )
}

const styles = StyleSheet.container = ({
    container: {
        flex: 1, 
        backgroundColor:"#191919"
    },
    image: {
        display: "flex",
        marginVertical: 20,
        marginLeft: 70,
        height: 250,
        width: 250,
        borderRadius: 10,
    },
    name: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },
    title: {
        textAlign: "center",
        fontSize: 17,
        marginVertical: 20,
        color: "white"
    },
    description: {
        margin: 6,
        color: "white",
        textAlign: "justify",
        letterSpacing: 1,
        lineHeight: 20,
        fontSize: 15
    },
    error: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 20,
        color: "white"
    }
    
}) 