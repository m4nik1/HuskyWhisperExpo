import React, { useEffect } from "react";

import { VStack, Text, Button, Box } from "native-base";
import { View, StyleSheet, Dimensions, Modal } from 'react-native'

import Card from "./Card"


const RecordModal = props => {

    function cancelModal() {
        props.modalCancel()
    }
    if (props.isVisible) {
        return (
            <Modal style={styles.modalView} animationType="slide" visible={props.isVisible} transparent={true}>
                <Card style={styles.cardView}>
                    <Text fontSize={20}>
                        This is the Record Modal.
                    </Text>
                    <View style={{ padding: 20 }}>
                        <Button onPress={() => cancelModal()}>
                            Close
                        </Button>
                    </View>
                </Card>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5,
        marginTop: Dimensions.get('window').height - 510
    },
    cardView: {
        marginTop: Dimensions.get('screen').height - 465,
        height: 400,
        width: Dimensions.get('screen').width,
        alignItems: 'center'
    }
})


export default RecordModal; 