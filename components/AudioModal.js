import React, { useState } from "react";

import { Modal, StyleSheet, Text } from 'react-native'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system';
import axios from "axios";

import { Button, VStack, Box } from "native-base";

const AudioModal = props => {

    const [transcribedText, setTranscribe] = useState('Transcribed Text will be shown here')
    const [fileURI, setURI] = useState('')
    const [loadSound, setSound] = useState('')

    function cancelModal() {
        setTranscribe('Transcribed Text will be shown here')
        props.modalCancel()

    }
    

    async function sendRecording() {
        const file = FileSystem.cacheDirectory+`AV/${props.fileName}.m4a`

        file_upload = new FormData()

        file_upload.append('file', {
            uri: file,
            name: props.fileName,
            type: 'audio/mpeg'
        })
        

        console.log("Trying to send file now")
        try {
            const response = await axios({
                method: 'post',
                url: 'http://104.198.128.84:3000/uploadLectureRecording',
                data: file_upload,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            console.log(response.data)
            setTranscribe(response.data['Result'])
            return response.data
        }

        catch(err) {
            console.error("Error uploading", err)
            throw err
        }
    }

    async function playRecording() {
        const soundObj = new Audio.Sound()
        
        if(fileURI) {
            console.log("loading the telegram :)")
            await soundObj.loadAsync({ uri: fileURI });
            setSound(soundObj)

            await soundObj.playAsync();

            console.log("Playing telegram nao")
        }

        else {
            console.log("No recording is selected please select a recording to play one")
        }   
    }

    
    async function stopPlaying() {
        console.log("Stopping the playback!")

        loadSound.unloadAsync();
        setSound(null);
        setURI('')
    }

    function loadURI() {
        const file = FileSystem.cacheDirectory+`AV/${props.fileName}.m4a`
        console.log('Loading URI at the start')
        setURI(file)
    }


    if(props.isVisible) {
        return ( 
            <Modal onShow={() => loadURI()} onRequestClose={() => cancelModal()} isVisible={props.isVisible} animationType="slide">
                <VStack space={4} alignItems="center">
                    <Box mt={70}>
                        <Text fontSize="lg">
                            { props.fileName }
                        </Text>
                    </Box>

                    <Button isDisabled={(props.serverStatus ? true : false)} onPress={() => sendRecording()} mt={100} size="md" variant="subtle">
                        <Text>Transcribe</Text>
                    </Button>

                    <Button size="md" variant="subtle" onPress={loadSound ? stopPlaying : playRecording}>
                        <Text>Play</Text>
                    </Button>

                    <Button size="md" variant="subtle" onPress={() => cancelModal()}>
                        <Text>Back</Text>
                    </Button>
                </VStack>
                <Box mt={100} alignItems="left" paddingLeft={10}>
                    <Text>
                        { transcribedText }
                    </Text>
                </Box>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
})

export default AudioModal;