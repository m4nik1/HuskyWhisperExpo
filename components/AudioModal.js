import React, { useState } from "react";

import { View, Text, Modal, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system';
import axios from "axios";


const AudioModal = props => {

    const [transcribedText, setTranscribe] = useState('')
    const [fileURI, setURI] = useState('')
    const [loadSound, setSound] = useState('')

    function cancelModal() {
        setTranscribe('')
        props.modalCancel()

    }

    async function sendRecording() {
        const file = FileSystem.cacheDirectory+`AV/${props.fileName}.m4a`
        // const file1 = recentURI

        file_upload = new FormData()
        

        // console.log(file)

        file_upload.append('file', {
            uri: file,
            name: props.fileName,
            type: 'audio/mpeg'
        })
        

        console.log("Trying to send file now")
        try {
            const response = await axios({
                method: 'post',
                url: 'http://100.117.52.29:3000/uploadLectureRecording',
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
                <View style={{ flex: 1, justifyContent: 'top', marginTop: 100 }}>
                    <Text style={{ textAlign: 'center' }}>
                        {props.fileName}
                    </Text>
                    <TouchableOpacity style={{ alignContent: 'center', padding: 30 }} onPress={() => cancelModal()}>
                        <Text style={{ textAlign: 'center' }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignContent: 'center' }} onPress={() => sendRecording()}>
                        <Text style={{ textAlign: 'center' }}>Transcribe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignContent: 'center', padding: 30 }} onPress={loadSound ? stopPlaying : playRecording}>
                        <Text style={{ textAlign: 'center' }}>Play</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, padding: 20 }}>
                    <Text>{ transcribedText }</Text>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({

})

export default AudioModal;