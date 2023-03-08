import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, StyleSheet, View, Pressable } from 'react-native';
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
  children: React.ReactNode
  modalVisible: boolean
  title: string
  onClose: () => void
}

const ModalAlert: React.FC<modalProps> = ({ children, modalVisible, title, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onClose()}>
      <Pressable
        style={styles.mainContainer}
        onPress={() => {
          onClose();
        }}>
        <Pressable style={styles.cardContainer}>
          <ViewModalHeader >
            <TextTitle>
              {title}
            </TextTitle>
            <TouchableOpacity onPress={onClose}>
              <Icon
                name='closecircle'
                size={20}
                style={{ marginRight: 10 }}
                color="#ff9000"
              />
            </TouchableOpacity>
          </ViewModalHeader>
          <View style={{
            width: '100%',
            padding: 5,
            maxHeight: '95%'
          }}>
            {children}
          </View>
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
    borderRadius: 12,
    backgroundColor: '#3e3b47',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff'
  }
});



export default ModalAlert;
/*
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const ModalAlert = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000",
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalAlert;*/