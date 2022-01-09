import React, {useState, useEffect} from 'react'
import { Platform, StyleSheet, Text, View, Image, Button, ScrollView, Linking } from 'react-native'
import Markdown from 'react-native-markdown-display';
import { Ionicons } from '@expo/vector-icons';

const clubPage = ({route,navigation}) => {
    const [clubData, setClubData] = useState([])
    const [about, setabout] = useState(``);
    const {club} = route.params
     useEffect(() => { 
        setClubData(club)
        getmarkdown(club.id);
     }, []);

    async function getmarkdown(clubname){
        const url = `https://raw.githubusercontent.com/mayukhpankaj/BIT-Clubs/main/public/md/${clubname}.md`;
        var file = await fetch(url);
        file  = await file.text()
        setabout(file)
    }
    
     const navigateBack = () => {
        navigation.goBack();
    }

    if(!clubData) {
        return <AppLoading />
    }

    const handleLink = (link)=>{
        if(link!==""){
            Linking.openURL(link)
        }
    }


    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.head}>
                <Image style={styles.clubLogo} source={{uri: clubData.logo_uri}} />
                <View style={styles.clubInfo}>
                    <Text style={styles.clubName}>{clubData.name}</Text> 
                </View>
            </View>
            <View>
            <Text style={styles.tagline}>{clubData.tagline}</Text>
            </View>
            <View style={styles.icons}>
            <Ionicons name="logo-facebook" size={40} color="#244f8f" style={styles.icon} onPress={()=>{handleLink(clubData.social.facebook)}} />
            <Ionicons name="logo-instagram" size={40} color="#e33b73" style={styles.icon} onPress={()=>{handleLink(clubData.social.instagram)}} />
            <Ionicons name="logo-linkedin" size={40} color="#2e618f" style={styles.icon} onPress={()=>{handleLink(clubData.social.linkedin)}} />
            <Ionicons name="globe-outline" size={40} color="#48d4c1" style={styles.icon} onPress={()=>{handleLink(clubData.social.website)}} />
            <Ionicons name="logo-whatsapp" size={40} color="#38b32d" style={styles.icon} onPress={()=>{handleLink('http://api.whatsapp.com/send?phone=91'+clubData.social.contact)}} />
            </View>
            <View>
                <Text style={styles.clubType}>{clubData.istech?"Technical  Club":"Cultural  Club"}</Text>
            </View>
            <View>
            <Text style={styles.clubDesc}>{clubData.description}</Text>
            </View>
            <View style={styles.markdownstyle}>
                 <Markdown>
                      {about}
                 </Markdown>
            </View>
            <View style={styles.backButton}>
                         <Ionicons name="ios-arrow-back" size={40} color="#244f8f" style={styles.icon} onPress={()=>{navigateBack()}} />
                    </View>  
        </View>
        </ScrollView>
    )
}

export default clubPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 20,
    },
    head: {
        // height: '30%',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingBottom: 5,
        paddingTop: 20
    },

    markdownstyle: {

        padding: 10,

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

    icons: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignContent: "space-between",
        paddingTop: "5%",
        paddingBottom: 10,
        
    },
    icon: {
        paddingHorizontal: 10,
    },
    clubLogo: {
        width:120,
        height:120,
        borderRadius: 60,
    },
    clubInfo: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    clubName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    clubType: {
        fontSize: 20,
        paddingTop: 10,
        fontWeight: 'bold',
        color: "#7a7a77"
    },
    tagline: {
        fontSize: 15,
        // color: '#000',
        fontStyle: 'italic',
        marginTop: 10,
    },
    clubDesc: {
        fontSize: 15,
        // color: '#000',
        marginTop: 20,
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
