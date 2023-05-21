import React from "react";

import { View, Text, Modal, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system';
import axios from "axios";


const AudioModal = props => {

    function cancelModal() {
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
            return response.data
        }

        catch(err) {
            console.error("Error uploading", err)
            throw err
        }
    }

    if(props.isVisible) {
        return ( 
            <Modal onRequestClose={() => cancelModal()} isVisible={props.isVisible} animationType="slide">
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
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({

})

export default AudioModal;