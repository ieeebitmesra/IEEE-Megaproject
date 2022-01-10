import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Image, ScrollView, Linking, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
const SCREE_WIDTH = Dimensions.get('window').width



const eventDetails = ({route,navigation}) => {

    const navigateBack = () => {
        navigation.goBack();
    }
    
    const eventData = route.params.event
    return (
        <ScrollView>
                        <View style={styles.backButton}>
                         <Ionicons name="ios-arrow-back" size={40} color="#244f8f" style={styles.icon} onPress={()=>{navigateBack()}} />
                    </View>  
        {/* <View style={styles.container}> */}
            <TouchableWithoutFeedback onPress={() => {}}>
                <Image style={styles.image} source={{uri: eventData.posterUri}} />
                {/* <FullImage styles={styles.postImage} uri={eventData.posterUri} /> */}
            </TouchableWithoutFeedback>
            <View style={styles.info}>
                <Text style={styles.title}>{eventData.eventName}</Text>
                <Text style={styles.date}>{eventData.eventDate}</Text>
                <Text style={styles.time}>{eventData.eventTime}</Text>
                <Text style={styles.description}>{eventData.eventDescription}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>{Linking.openURL('http://'+eventData?.eventLink)}}>
                <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
        {/* </View> */}
        </ScrollView>
    )
}

export default eventDetails

const styles = StyleSheet.create({
    postImage: {
        // height: 200,
        // resizeMode: 'center',
        // aspectRatio: 1,
        flex: 1,

        width:'100%',
        // height: '100%',
        // resizeMode: 'contain',
        aspectRatio: 1,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
      
        // borderBottomLeftRadius: SCREE_WIDTH*0.1,
        // borderBottomRightRadius: 50,
        alignSelf:'center',

        ...Platform.select({
            ios: {
                width: SCREE_WIDTH,
                  height: SCREE_WIDTH*0.85,
            },
            android: {
                width: SCREE_WIDTH,
                  height: SCREE_WIDTH*0.85,
            },
            default: {
              // other platforms, web for example
              width: SCREE_WIDTH*0.6,
              height: SCREE_WIDTH*0.45,
            
            }
          }),
    },
    info: {
        width: SCREE_WIDTH,
        padding: 20,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 10,
    },
    time: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 10,
    },
    button: {
        // width: SCREE_WIDTH - 40,
        // paddingHorizontal: 30,
        width: '40%',
        alignSelf: 'center',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1c313a',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,

    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
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
    },
})
