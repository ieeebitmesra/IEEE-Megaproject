import React, {useState, useEffect} from 'react'
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { db } from "../Backend/firestore";
import { collection , query, where, getDocs, limit, orderBy, addDoc, setDoc, doc, Query } from "firebase/firestore";
import Markdown from 'react-native-markdown-display';

const Clubs = ({navigation}) => {
    const [clubData, setClubData] = useState([])
    useEffect(() => {
    async function getClubs(){
        var data = []
        const querySnapshot = await getDocs(query(collection(db,"clubs"),orderBy("id","asc")));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push({...doc.data(),key:doc.id});
            });
            setClubData(data);
    }
    getClubs();

    async function addClub(){
    var data = JSON.parse('{"id":20,"name":"Unesquo","social":{"linkedin":"","website":"","facebook":"","instagram":"","contact":""},"tagline":"","istech":true,"description":" ","logo_uri":"","markdown":""}')
    console.log(data)
        try{
            const docRef = await setDoc(doc(db, "clubs","20"),data);
            console.log(docRef);
        }
        catch(e){
            console.log("error",e)
        }
    }
    // addClub();


    }, [])

    if(!clubData) {
        return <AppLoading />
    }

    const clickHandler = (data) => {
        navigation.navigate('clubPage', {
            club : data
        })
    }
    
    return (
        <ScrollView>
        <View style={styles.container}>
            {clubData.map((club, index) => {
                return (
                    <TouchableOpacity style={styles.box} key={club.key} onPress={()=>{clickHandler(club)}}>
                    <Image source={{uri: club.logo_uri}} style={styles.clubImage}/>
                        <Text style={styles.clubName}>{club.name}</Text>
                    </TouchableOpacity>
                    
                )
            })}
        </View>
        </ScrollView>
    )
}

export default Clubs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        ...Platform.select({
            ios: {
              width: '95%'
            },
            android: {
              width: '95%'
            },
            default: {
              // other platforms, web for example
              width: '50%'
            }
          })
    },
    box: {
        width: '40%',
        // height: 150,
        aspectRatio: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    clubName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
    },
    clubImage: {
        // height: 200,
        // resizeMode: 'center',
        // aspectRatio: 1,
        flex: 1,
        width: '100%',
        // height: '100%',
        resizeMode: 'contain',
        aspectRatio: 1,
        borderRadius: 10,
    },
})
