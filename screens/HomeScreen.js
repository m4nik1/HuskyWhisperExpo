import React, { useEffect, useState } from "react";

import { View, Text, Pressable, StyleSheet, FlatList } from "react-native"
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system';
import { HStack, VStack, Alert, useToast } from "native-base";

import AudioFile from "../components/AudioFile";
import AudioModal from "../components/AudioModal";
import RecordModal from "../components/RecordModal";

function HomeScreen() {

    const [recording, setRecording] = useState();
    const [haveRecordings, setRecordings] = useState(0);
    const [audioFiles, setAudioFiles] = useState('')
    const [playFile, setFile] = useState('')
    const [whisperModal, setWhisperModal] = useState(false)
    const [recordModal, setRecordModal] = useState(false)
    const [serversDown, setServer] = useState(false)

    const toast = useToast()


    async function record() {
        // console.log("NOW RECORDING")
        console.log("opening modal!")

        setRecordModal(true)

        // try {
        //     console.log("request permissions now...")
        //     await Audio.requestPermissionsAsync()
        //     await Audio.setAudioModeAsync({
        //         allowsRecordingIOS: true,
        //         playsInSilentModeIOS: true,
        //     })

        //     console.log("Alrighty Starting the recordings")
        //     const { recording }  = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
        //     setRecording(recording)
        //     console.log("recording has started")
        // }

        // catch(e) {
        //     console.log("OOPIES, HOUSTON WE HAVE A PROBLEM")
        //     console.error(e);
        // }
    }

    async function stopRecording() {
        console.log("Stopping the recording")
        setRecording()
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false
        })

        const uri = recording.getURI();

        setRecording(haveRecordings + 1);
        updateAudioFiles()
    }

    async function updateAudioFiles() {
        try {
            const files = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory + "AV")

            console.log(files)
            const filesObj = []

            for (var i = 0; i < files.length; i++) {
                var obj = {}

                obj["id"] = i
                obj["filename"] = files[i].split(".")[0]

                filesObj.push(obj)

            }

            setAudioFiles(filesObj)
            console.log(audioFiles)
        }

        catch (err) {
            console.log("Theres no recordings make one!")
        }

    }

    async function fileSelect(file) {
        console.log("file is being selected!")
        if (whisperModal) {
            setWhisperModal(false)
        }
        else {
            setWhisperModal(true)
            setFile(file)
        }
    }

    async function checkTranscribeServers() {
        console.log("Checking if server is up...")
        try {
            console.log("pinging server to be sure!")
            const response = await axios({
                method: 'get',
                url: 'http://104.198.128.84:3000/testTranscriber/',
                // timeout: 5000,
                responseType: 'json'
            })

            console.log(response.data)
            setTranscribe(response.data['Result'])
            return response.data
        }

        catch (err) {
            console.log("Server not up, transcribing has been disabled.")
            showConnectionToast()
        }
    }

    function showConnectionToast() {
        toast.show({
            render: () => {
                return (
                    <Alert w="100%" variant='subtle' Scheme="success" status="error">
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                                <HStack space={2} flexShrink={1} alignItems="center">
                                    <Alert.Icon />
                                    <Text color='red'>
                                        Servers are down, transcribing has been disabled.
                                    </Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                )
            }
        })

        setServer(true)

    }

    useEffect(() => {
        updateAudioFiles()
        checkTranscribeServers()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.recordList}>
                <FlatList
                    keyExtractor={item => item.id}
                    data={audioFiles}
                    renderItem={itemData => (
                        <AudioFile
                            fileName={itemData.item.filename}
                            select={(f) => fileSelect(f)}
                        />
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View style={{ padding: 10 }}>
                    <Pressable style={styles.recordBtn} onPress={() => record()}>
                        <Text style={{ fontWeight: "bold", color: 'white' }}>Record</Text>
                    </Pressable>
                </View>
            </View>
            <AudioModal serverStatus={serversDown} fileName={playFile} isVisible={whisperModal} modalCancel={() => setWhisperModal(false)} />
            <RecordModal update={() => updateAudioFiles()} isVisible={recordModal} modalCancel={() => setRecordModal(false)} />


        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10
    },
    recordList: {
        marginTop: 100,
        height: 650,
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
        // paddingHorizontal: 1,
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


