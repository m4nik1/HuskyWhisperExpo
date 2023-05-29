import { VStack } from "native-base";
import React, { useEffect } from "react";

import { View, Text, Modal, StyleSheet, Text } from 'react-native'


const RecordModal = props => {
    return (
        <Modal>
            <VStack space={4} alignItems={"Center"}>
                <Text fontSize="md">
                    This is the Record Modal.
                </Text>
            </VStack>
        </Modal>
    )
}

const styles = StyleSheet.create({

})

export default RecordModal;