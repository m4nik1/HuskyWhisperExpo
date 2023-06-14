import React, { useEffect, useRef, useState } from "react";

import { VStack, Text, Button, Box, useNativeBase } from "native-base";
import { View, StyleSheet, Dimensions, Modal, Animated } from 'react-native'

import Card from "./Card"


const RecordModal = props => {

    // const [fadeAnim, setFadeAnim] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current
    const [recording, setRecording] = useState(false)

    var blinkLoop;

    function cancelModal() {
        setRecording(null)
        props.modalCancel()
    }

    function startRecording() {
        console.log("Recording now!")
        setRecording(true)
        blinkAnim()

    }

    function stopRecording() {
        console.log("Stopping the recording")
        setRecording(null)
        Animated.timing(fadeAnim).stop()
    }


    const blinkAnim = () => {
        console.log("start the blinking")
        let blinking = Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 20,
                duration: 500, // this every means 1 second
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ])

        blinkLoop = Animated.loop(
            blinking,
        ).start()
    }

    if (props.isVisible) {
        return (
            <Modal style={styles.modalView} animationType="slide" visible={props.isVisible} transparent={true}>
                <Card style={styles.cardView}>

                    <Text fontSize={20}>
                        This is the Record Modal.
                    </Text>

                    <Animated.View style={[styles.blinkLight, { opacity: fadeAnim },]}>
                        <View style={styles.recordIndicator} />
                    </Animated.View>

                    <Button style={styles.recordButton} onPress={recording ? stopRecording : startRecording}>
                        Record
                    </Button>

                    <Button onPress={() => cancelModal()}>
                        Close
                    </Button>
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
        marginTop: Dimensions.get('window').height - 510,
        alignItems: 'center',
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
    blinkLight: {
        padding: 20
    }
})


export default RecordModal; 