import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView , TouchableOpacity} from 'react-native'
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Ionicons} from '@expo/vector-icons';
import EventDeleteModal from '../components/eventDeleteModal';
import { doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import {db} from '../Backend/firestore';
import {auth} from '../Backend/firebase';

const EditEvents = ({route,navigation}) => {
    const events = useStoreState((state) => state.events);
    const setEvents = useStoreActions((actions) => actions.setEvents);
    const userData = useStoreState((state) => state.userData);
    const uploadedEventNames = userData.uploadedEvents.map((event) => event.eventName);
    const uploadedEvents = events.filter((event) => uploadedEventNames.includes(event.eventName));
    const [modalVisible, setModalVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventId, setEventId] = useState('');
    const cnfrmDelete = (eventName) => {
        setEventName(eventName)
        // setModalVisible(true);
    }

    const navigateBack = () => {
        navigation.goBack();
    }


    const handleDelete = async() => {
        // setEventId(events.find((event) => event.eventName === eventName).id);
        // console.log(eventId);
        // console.log(eventName);
        // await deleteDoc(doc(db, "events", eventId));
        // const userRef = doc(db, "users", auth?.currentUser?.uid);
        // await updateDoc(userRef, {
        //     uploadedEvents: userData.uploadedEvents.filter((event) => event.eventName !== eventName)
        // })
        // setEvents(events.filter((event) => event.eventName !== eventName));
        setModalVisible(false);
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>

                <View style={styles.backButton}>
                         <Ionicons name="ios-arrow-back" size={40} color="#244f8f" style={styles.icon} onPress={()=>{navigateBack()}} />
                    </View>  
            <View style={styles.container}>
                <Text style={styles.mssg}>If You cant see changes... Please restart the app</Text>
                {uploadedEvents.map((event, index) => {
                    return (
                        <View key={index} style={styles.listItem}>
                            {/* <TouchableOpacity>
                                <Ionicons name="notifications" size={20} color="orange" />
                            </TouchableOpacity> */}
                            <View style={styles.listItemText}>
                                <Text style={styles.midText}>{event.eventName}</Text>
                            </View>
                            {/* <TouchableOpacity onPress={cnfrmDelete}> */}
                            <TouchableOpacity onPress={()=>{cnfrmDelete(event.eventName)}}>
                                <Ionicons name="trash" size={20} color="red" />
                            </TouchableOpacity>
                            {/* <Text>{event.club_id}</Text> */}
                        </View>
                    )
                })}
                {!uploadedEvents[0] && <Text style={styles.mssg}>No events uploaded yet</Text>}
                <EventDeleteModal modalVisible={modalVisible} setModalVisible={setModalVisible} eventName={eventName} handleDelete={handleDelete}/>
            </View>
        </ScrollView>
    )
}

export default EditEvents

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // midText: {
    //     width: 200,
    //     alignSelf: 'center',
    //     justifyContent: 'center',
    // }
    listItemText: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
    },
    mssg:{
        fontSize: 10,
        color: '#0782f9',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 2,
        // backgroundColor: '#fff',
        // borderRadius: 20,
        // width: 80,
        // shadowColor: 'black',
        // shadowOpacity: 0.7,
        // shadowRadius: 10,
        // elevation: 5,
    }
})
