import React, { useEffect, useState } from "react";

import { View, Text, Pressable, StyleSheet, FlatList } from "react-native"
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system';
import axios from "axios";
import AudioFile from "../components/AudioFile";

function HomeScreen() {

    const [recording, setRecording] = useState();
    const [haveRecordings, setRecordings] = useState(0);
    const [recentURI, setURI] = useState('');
    const [fileName, setFileName] = useState(''); 
    const [loadSound, setSound] = useState();
    const [audioFiles, setAudioFiles] = useState('')
    const [playFile, setFile] = useState('')


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

        // setURI('' + uri)
        // console.log(recentURI)

        setRecording(haveRecordings+1);
        updateAudioFiles()
    }

    async function playRecording() {
        const soundObj = new Audio.Sound()
        
        if(recentURI) {
            console.log("loading the telegram :)")
            await soundObj.loadAsync({ uri: recentURI });
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


    async function sendRecording() {
        // const file = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+"/AV")
        const file1 = recentURI

        file_upload = new FormData()
        

        file_upload.append('file', {
            uri: file1,
            name: fileName,
            type: 'audio/mpeg'
        })
        

        console.log("Trying to send file now")
        try {
            
            // const response = await axios({
            //     method: 'post',
            //     url: 'http://100.117.52.29:3000/uploadLectureRecording',
            //     data: file_upload,
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // })

            const response = await axios.get('http://100.117.52.29:3000/')

            console.log(response.data)
            return response.data
        }

        catch(err) {
            console.error("Error uploading", err)
            throw error
        }
    }

    // async function printRecordings() {
    //     const file = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+"/AV")

    //     console.log(file)
    // }

    async function updateAudioFiles() {
        const files = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+"/AV")
        const filesObj = []
        // console.log(files)

        for(var i = 0; i < files.length; i++) {
            var obj = {}

            obj["id"] = i
            obj["filename"] = files[i].split(".")[0]
            
            filesObj.push(obj)

        }

        setAudioFiles(filesObj)
        console.log(audioFiles)
    }

    async function fileSelect(file) {
        const cache = FileSystem.cacheDirectory+"/AV/"+file+'.m4a'
        // console.log("Accessing... ", file)
        setURI(cache)
        setFileName(file+".m4a")
        console.log("Selected ", recentURI)
    }

    useEffect(() => {
        updateAudioFiles()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.recordList}>
                <FlatList
                    keyExtractor={item => item.id}
                    data={audioFiles}
                    renderItem={itemData => (
                        <AudioFile 
                            fileName={ itemData.item.filename }
                            select={ (f) => fileSelect(f) }
                        />
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
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
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent:'center',
        alignItems: 'center',
        paddingTop: 200
    },
    recordList: {
        marginTop: 20,
        height: 300,
        width: 350
    },
    buttonContainer: {
        paddingTop: 230
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


