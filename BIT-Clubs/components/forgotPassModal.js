import React, {useState} from 'react'
import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {auth} from '../Backend/firebase'
import {sendPasswordResetEmail} from 'firebase/auth'

const ForgotPassModal = (props) => {
    const { modalVisible, setModalVisible} = props
    const [email, setEmail] = useState('')
    const handlePassResetRequests = async () => {
      sendPasswordResetEmail(auth, email)
      .then(alert('Password reset email sent!'))
      .then(setModalVisible(false))
      .catch(error => alert(error))
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
                            <Text style={styles.modalText}>Enter Your Email</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#ddd"
                                    onChangeText={(text) => {
                                        setEmail(text)
                                    }}
                                    autoCapitalize='none'
                                />
                            </View>
                            <Pressable
                                onPress={() => {handlePassResetRequests()}}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Send Link</Text>
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

export default ForgotPassModal

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
        fontSize: 40,
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
