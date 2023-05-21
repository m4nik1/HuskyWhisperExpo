import React from "react";

import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'

const AudioModal = props => {

    function cancelModal() {
        props.modalCancel()
    }

    if(props.isVisible) {
        return ( 
            <Modal onRequestClose={() => cancelModal()} isVisible={props.isVisible} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>
                        {props.fileName}
                    </Text>
                    <Pressable style={{ textAlign: 'center' }} onPress={() => cancelModal()}>
                        <Text> Back </Text>
                    </Pressable>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({

})

export default AudioModal;