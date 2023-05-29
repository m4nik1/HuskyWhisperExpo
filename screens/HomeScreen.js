import React, { useEffect, useState } from "react";

import { View, Text, Pressable, StyleSheet, FlatList } from "react-native"
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system';
import AudioFile from "../components/AudioFile";
import AudioModal from "../components/AudioModal";

function HomeScreen() {

    const [recording, setRecording] = useState();
    const [haveRecordings, setRecordings] = useState(0);
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

    async function stopRecording() {
        console.log("Stopping the recording")
        setRecording()
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false
        })

        const uri = recording.getURI();

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

    useEffect(() => {
        setWhisperModal(true)
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
                <View style={{ padding: 10 }}>
                    <Pressable style={styles.recordBtn} onPress={recording ? stopRecording : record}>
                        <Text style={{ fontWeight: "bold", color:'white' }}>Record</Text>
                    </Pressable>
                </View>
            </View>
            {/* <AudioModal fileName={playFile} isVisible={whisperModal} modalCancel={() => setWhisperModal(false)} /> */}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent:'center',
        alignItems: 'center',
        // padding: 10
    },
    recordList: {
        marginTop: 100,
        height: 700,
        width: 400
    },
    buttonContainer: {
        // alignItems: 'center',
        // justifyContent: 'center',
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
        width: 80,
        height: 50
    }
})

export default HomeScreen;


