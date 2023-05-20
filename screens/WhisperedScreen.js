import React from "react";

import { View, Text, Pressable, StyleSheet } from 'react-native'


const whisperDetail = (props) => {
    
    if(props.shouldRender) {
        return (
            <View>
                <Text>{ props.transcribedWhisper }</Text>
            </View>
        )
    }

    else {
        return (
            null
        )
    }

}

const styles = StyleSheet.create({

})

export default whisperDetail;