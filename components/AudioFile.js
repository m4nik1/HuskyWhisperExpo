import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native'

const AudioFile = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Pressable onPress={() => props.select(props.fileName)}>
                    <Text>{ props.fileName }</Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 5
    },

    card: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        padding: 15,
        borderRadius: 20
    }
})

export default AudioFile;