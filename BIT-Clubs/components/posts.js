import React, {useState, useEffect} from "react";
import { Image,View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet, TouchableWithoutFeedback} from "react-native";
import { ActivityIndicator } from "react-native";
import { db } from "../Backend/firestore";
import { collection , query, where, getDocs, onSnapshot, limit, orderBy, startAfter } from "firebase/firestore";
import FullImage from "./FullImage";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Platform } from "react-native";

const getImageAspectRatio = (uri) => {
    Image.getSize(uri, (width, height) => {
        const aspectRatio = width / height
        console.log(aspectRatio)
        return aspectRatio
    })
}
export default function Posts({navigation}){

    const [loading, setLoading] = useState(true); // Setting Initial loading to true on component mount
    const [posts, setPosts] = useState([]); // Initial empty array of Posts
    const [lastDoc, setlastDoc] = useState('');
    const clubs = useStoreState((state) => state.clubs);
    const setEvents = useStoreActions((actions) => actions.setEvents);
    const events = useStoreState((state) => state.events);
    const change = useStoreActions((actions) => actions.change);

    useEffect(()=> {
        async function getPosts() {
          var data = []
          const q = query(collection(db, "events"),orderBy("createdAt","desc"), limit(2));
          const querySnapshot = await getDocs(q);
          setlastDoc(querySnapshot.docs[querySnapshot.docs.length -1])
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          data.push({...doc.data(), key:doc.id});
          });
          console.log(data);
          setPosts(data);
          setEvents(data);
          setLoading(false);
          console.log("platform type is ", Platform.OS);
      }
      getPosts();
  }, [change]);
  

    async function loadMore(){
        var data = posts;
        console.log("loading from ",lastDoc);
        if(lastDoc){
            const q = query(collection(db, "events"),orderBy("createdAt","desc"), limit(2),startAfter(lastDoc));
            const querySnapshot = await getDocs(q);
            setlastDoc(querySnapshot.docs[querySnapshot.docs.length -1])
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                data.push({...doc.data(), key:doc.id});
                });
            console.log(data);
            setPosts(data);
        }
        else{
            console.log("end of list")
        }
    }

    const handleClick = (event) => {
        navigation.navigate('EventDetails', {event})
    }

    if (loading) {
      return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Newsroom</Text>
            </View>
            <FlatList
                data={posts}
                style={styles.list}
                onEndReached={()=>{loadMore()}}
                onEndReachedThreshold={100}
                renderItem={({item}) => (
                  
                        <View style={styles.post} key={item.key}>
                            <TouchableWithoutFeedback>
                                <View style={styles.postHeader}>
                                    <Image style={styles.clubLogo } source={{uri: clubs.find(o => o.id === item.club_id)?.logo_uri}} />
                                    <Text style={styles.clubName}>{clubs.find(o => o.id === item.club_id)?.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {/* <TouchableOpacity onPress={()=>{navigation.navigate('EventDetails',{ data: item})}}> */}
                            <TouchableOpacity onPress={()=>{handleClick(item)}}>
                                <FullImage styles={styles.postImage} uri={item.posterUri} />
                            </TouchableOpacity>
                        </View>
                        )}
            />

        </View>
    )


}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
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
    header: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
    },
    headerText: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    list: {
        flex: 1,
        width: '100%',
        // padding: 10,
        paddingHorizontal: 20,
    },
    post: {
        // flexDirection: 'row',
        marginBottom: 40,
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    postHeader: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 10,
        // paddingLeft: 10,
    },
    clubLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 20,
    },
    clubName: {
        fontSize: 20,
        fontWeight: '700',
    },
    postImage: {
        // height: 200,
        // resizeMode: 'center',
        // aspectRatio: 1,
        flex: 1,
        width: '100%',
        // height: '100%',
        // resizeMode: 'contain',
        aspectRatio: 1,
        borderRadius: 10,
    },
    poster: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    postFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    postDate: {
        fontSize: 15,
    },
})




