import React, { useEffect } from "react";

import { VStack, Text, Modal, Button, Box } from "native-base";
import { View, StyleSheet } from 'react-native'

import Card from "./Card"


const RecordModal = props => {

    function cancelModal() {
        props.modalCancel()
    }
    if(props.isVisible) {
        return (
            <Modal isOpen={true} size={'md'}>
                <Card>
                    <Text>
                        This is the Record Modal.
                    </Text>
                    <Box padding={3}>
                        <Button onPress={() => cancelModal()}>
                            Close
                        </Button>
                    </Box>
                </Card>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        // elevation: 5,
        margin: 0,
        // width: 300,
        // height: 300,
        backgroundColor: 'white',
        borderRadius: 20, 
        
    },
})


export default RecordModal; 