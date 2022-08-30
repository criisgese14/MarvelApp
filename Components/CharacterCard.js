import * as React from 'react';
import { Text, View,  Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function CharacterCard({image, name, id}) {
    const navigation = useNavigation();
    return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detail', {id})}>
			<Image
				style={styles.image}
				source={{uri: image}}
			/>
      <Text 
        style={styles.text}
      >{name}</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.container = ({
    container: {
        display: "flex",
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: "center",
        width: 186
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 15,
    },
    text: {
      fontWeight: "bold",
      paddingTop: 10,
      color: "white"
    }
})