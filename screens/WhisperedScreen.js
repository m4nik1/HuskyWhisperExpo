import React from "react";

import { View, Text, Pressable, StyleSheet } from 'react-native'


const whisperDetail = (props) => {
    
    return (
        <View>
            <Text>{ props.transcribedWhisper }</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default whisperDetail;