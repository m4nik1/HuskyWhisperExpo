import React, { useEffect, useState } from "react";

import { View, Text, Pressable, StyleSheet, FlatList, Modal } from "react-native"
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system';
import axios from "axios";
import AudioFile from "../components/AudioFile";
import AudioModal from "../components/AudioModal";

function HomeScreen() {

    const [recording, setRecording] = useState();
    const [haveRecordings, setRecordings] = useState(0);
    const [recentURI, setURI] = useState('');
    const [fileName, setFileName] = useState(''); 
    const [loadSound, setSound] = useState();
    const [audioFiles, setAudioFiles] = useState('')
    const [playFile, setFile] = useState('')
    const [whisperModal, setWhisperModal] = useState(false)


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

    async function stopPlaying() {
        console.log("Stopping the playback!")

        loadSound.unloadAsync();
        setSound(null);
        setURI('')
    }

    async function stopRecording() {
        console.log("Stopping the recording")
        setRecording()
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

    async function updateAudioFiles() {
        try {
            const files = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory+"AV")

            console.log(files)
            const filesObj = []

            for(var i = 0; i < files.length; i++) {
                var obj = {}

                obj["id"] = i
                obj["filename"] = files[i].split(".")[0]
                
                filesObj.push(obj)

            }

            setAudioFiles(filesObj)
            console.log(audioFiles)
        }

        catch(err) {
            // console.error(err)
            console.log("Theres no recordings make one!")
        }
        
    }

    async function fileSelect(file) {
        if(whisperModal) {
            setWhisperModal(false)
        }
        else {
            setWhisperModal(true)
            setFile(file)
        }

    }

    async function testServer() {
        try {
            console.log("Making request nao!")
            const response = await axios.get("http://104.198.128.84:3000/testTranscriber")

            console.log(response.data)
        }

        catch(err) {
            console.log("Can't make this request work!")
            console.err(err)
        }
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
                {/* <View>
                    <Pressable style={styles.playBtn}>
                        <Text style={{ fontWeight: "bold", color:'white' }}>Play</Text>
                    </Pressable>
                </View> */}

                <View style={{ padding: 10 }}>
                    <Pressable style={styles.recordBtn} onPress={recording ? stopRecording : record}>
                        <Text style={{ fontWeight: "bold", color:'white' }}>Record</Text>
                    </Pressable>
                </View>

                <View style={{ marginBottom: 1000 }}>
                     {/* <Pressable style={styles.recordBtn} onPress={() => testServer()}>
                         <Text style={{ fontWeight: "bold", color:'white' }}>Send</Text>
                     </Pressable> */}
                </View>
            </View>
            <AudioModal fileName={playFile} isVisible={whisperModal} modalCancel={() => setWhisperModal(false)} />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent:'center',
        alignItems: 'center',
        // paddingTop: 30
    },
    recordList: {
        marginTop: 190,
        height: 400,
        width: 400
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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
        // paddingVertical: 2,
        // paddingHorizontal: 1,
        width: 80,
        height: 50
    }
})

export default HomeScreen;


