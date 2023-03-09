import React, { useEffect, useState } from 'react';
import { Modal, Text, ActivityIndicator, TouchableOpacity, StyleSheet, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

import {
    Container,
    Content,
    ViewModal,
    ViewModalHeader,
    TextTitle,
    ViewChildren
} from './styles';

interface modalProps {
    children?: React.ReactNode
    modalVisible: boolean
    title?: string
    onClose?: () => void
}

const LoadingApp: React.FC<modalProps> = ({ children, modalVisible, title, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {}}>
            <Pressable
                style={styles.mainContainer}
                onPress={() => {}}>
                <Pressable style={styles.cardContainer}>
                    <ActivityIndicator size={80} color='#ff9000' />
                    <TextTitle>Aguarde...</TextTitle>
                </Pressable>
            </Pressable>
        </Modal>
    );

}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    cardContainer: {
        width: '100%',
        minHeight: 170,
        maxHeight: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#3e3b47',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#fff'
    }
});



export default LoadingApp;
