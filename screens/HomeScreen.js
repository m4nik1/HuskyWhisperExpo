import React, { useState } from "react";

import { View, Text, Pressable, StyleSheet } from "react-native"
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system';
import axios from "axios";



function sendRequest() {
    fetch('192.168.1.44:8000/', {
        method: 'POST',
        body: 'Hello Person!'
    })
}



function HomeScreen() {

    const [recording, setRecording] = useState();
    const [haveRecordings, setRecordings] = useState(0);
    const [recentURI, setURI] = useState('');
    const [loadSound, setSound] = useState();


    async function record() {
        console.log("NOW RECORDING")
    
        try {
            console.log("request permissions now...")
            await Audio.requestPermissionsAsync()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            })
    
            console.log("Alrighty Starting the recordings")
            const { recording }  = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
            setRecording(recording)
            console.log("recording has started")
        }
        
        catch(e) {
            console.log("OOPIES, HOUSTON WE HAVE A PROBLEM")
            console.error(e);
        }
    }

    async function stopRecording() {
        console.log("Stopping the recording")
        setRecording(undefined)
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false
        })

        const uri = recording.getURI();
        // console.log('Recording stopped and stored at:', uri)
        setURI('' + uri)
        console.log(recentURI)

        setRecording(haveRecordings+1);
    }

    async function playRecording() {
        console.log("loading the telegram :)")
        const soundObj = new Audio.Sound()
        
        await soundObj.loadAsync({ uri: recentURI });

        setSound(soundObj)

        console.log("Playing telegram nao")

        await soundObj.playAsync();
    }

    async function stopPlaying() {
        console.log("Stopping the playback!")

        loadSound.unloadAsync();
        setSound(null);
    }



    async function sendRecording() {
        file = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+"/AV")
        file1 = FileSystem.cacheDirectory+"/AV/"+file[1]

        file_upload = new FormData()
        

        file_upload.append('file', {
            uri: file1,
            name: file[1],
            type: 'audio/mpeg'
        })

        const options = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        };
        

        try {
            // const response = await axios.post("http://127.0.0.1:8000/uploadLectureRecording/", file_upload, options)
            
            const response = await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/uploadLectureRecording/',
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
            throw error
        }
        
        

        // console.log(response.json());
    }

    async function savedRecordings() {
        console.log(file1)

        file_upload = new FormData()
        

        file_upload.append('file', {
            uri: file1,
            name: file[1],
            type: 'audio/mpeg'
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Pressable style={styles.playBtn} onPress={ loadSound ? stopPlaying : playRecording}>
                    <Text style={{ fontWeight: "bold", color:'white' }}>Play</Text>
                </Pressable>
            </View>

            <View style={{ padding: 10 }}>
                <Pressable style={styles.recordBtn} onPress={recording ? stopRecording : record}>
                    <Text style={{ fontWeight: "bold", color:'white' }}>Record</Text>
                </Pressable>
            </View>

            <View style={{ padding: 10, marginBottom: 1000 }}>
                <Pressable style={styles.recordBtn} onPress={() => sendRecording()}>
                    <Text style={{ fontWeight: "bold", color:'white' }}>Send</Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent:'center',
        alignItems: 'center',
        paddingTop: 700
    },
    recordBtn: {
        borderRadius: 5,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',   
        paddingVertical: 2,
        paddingHorizontal: 1,
        width: 80,
        height: 50,
    },
    playBtn: {
        borderRadius: 5,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',   
        paddingVertical: 2,
        paddingHorizontal: 1,
        width: 80,
        height: 50
    }
})

export default HomeScreen;


