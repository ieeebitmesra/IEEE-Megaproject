import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Modal, Pressable, Alert } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const EventDeleteModal = (props) => {
    const { modalVisible, setModalVisible, eventName, handleDelete } = props
    const [eventNameInput, setEventNameInput] = useState('')
    const cnfrmDelete = () => {
      if(eventNameInput === eventName){
        handleDelete()
      }
      else{
        alert('Event name is incorrect')
      }
    }
    return (
        <View style={styles.container}>
        <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Enter <Text style={{fontWeight: '700'}}>{eventName}</Text> to confirm deletion</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Event Name"
                                    placeholderTextColor="#ddd"
                                    onChangeText={(text) => {
                                        setEventNameInput(text)
                                    }}
                                    autoCapitalize='none'
                                />
                            </View>
                            <Pressable
                                onPress={cnfrmDelete}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Confirm</Text>
                            </Pressable>
                            <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
                            <Ionicons name="close-circle-outline" size={40} color="#000" />
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                </View>
            </View>
    )
}

export default EventDeleteModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      // buttonOpen: {
      //   backgroundColor: "#F194FF",
      // },
      // buttonClose: {
      //   backgroundColor: "#2196F3",
      // },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
      },
      inputContainer: {
        borderBottomColor: '#ddd',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center',
        marginTop:10,
      },
      input:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
      },
      button: {
        backgroundColor: "#00b5ec",
        // width:250,
        paddingHorizontal:30,
        borderRadius:30,
        marginBottom:20,
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 20,
      },
      buttonText:{
        color: '#FFFFFF',
        fontSize:20,
        fontWeight:'bold'
      }
})

