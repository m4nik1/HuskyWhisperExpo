import React, { useEffect, useRef, useState } from "react";

import { VStack, Text, Button, Box, useNativeBase } from "native-base";
import { View, StyleSheet, Dimensions, Modal, Animated } from 'react-native'

import Card from "./Card"


const RecordModal = props => {

    const [fadeAnim, setFadeAnim] = useState(0);
    const [duration, setDuration] = useState(2)

    function cancelModal() {
        props.modalCancel()
    }

    function startRecording() {

    }

    useEffect(() => {
        Animated.loop(
            Animated.sequence(
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true,
                })
            )
        )
    })

    if (props.isVisible) {
        return (
            <Modal style={styles.modalView} animationType="slide" visible={props.isVisible} transparent={true}>
                <Card style={styles.cardView}>
                    <Text fontSize={20}>
                        This is the Record Modal.
                    </Text>
                    <View style={styles.recordIndicator} />
                    <Animated.View style={{ padding: 20, opacity: { fadeAnim } }}>
                        <Button style={styles.recordButton} onPress={() => startRecording()}>
                            Record
                        </Button>
                        <Button onPress={() => cancelModal()}>
                            Close
                        </Button>
                    </Animated.View>
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
    },
    recordIndicator: {
        height: 70,
        width: 70,
        backgroundColor: 'red',
        borderRadius: 50,
        margin: 20  
    },
    recordButton: {
        borderRadius: 5,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',   
        paddingVertical: 2,
        // paddingHorizontal: 1,
        // width: 80,
        // height: 50,
        margin: 10
    },
})


export default RecordModal; 