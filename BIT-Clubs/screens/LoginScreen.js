import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import { TextInput } from 'react-native'
import {auth} from '../Backend/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from '../Backend/firestore';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { signInAnonymously } from "firebase/auth";
import ForgotPassModal from '../components/forgotPassModal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const setUserChecked = useStoreActions((actions) => actions.setUserChecked)
    const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn)
    const isLoggedIn = useStoreState((state) => state.isLoggedIn)
    const setLoading = useStoreActions((actions) => actions.setLoading)
    const setUserData = useStoreActions((actions) => actions.setUserData)
    const userData = useStoreState((state) => state.userData)
    const userChecked = useStoreState((state) => state.userChecked)
    const isAdmin = useStoreState((state) => state.isAdmin)
    const setIsAdmin = useStoreActions((actions) => actions.setIsAdmin)
    const loading = useStoreState((state) => state.loading)
    const setIsAnonymous = useStoreActions((actions) => actions.setIsAnonymous)

    useEffect(() => {
        console.log('isLoggedIn => ', isLoggedIn)
        console.log('userChecked => ', userChecked)
        console.log('loading => ', loading)
        console.log('userData => ', userData)
        console.log('isAdmin => ', isAdmin)
    } , [])

    // const addUserToDB = async (user) => {
    //     try {
    //         const docRef = await addDoc(collection(db, "users"), {
    //           email: user.email,
    //           uid: user.uid,
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //       }
    // }
    const addUserToDB = async (user) => {
        const docRef = await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            isAdmin: false,
            adminOf: [],
        });
    }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             navigation.replace('HomeTab')
    //         } else {
    //             console.log('user not logged in')
    //         }
    //         return unsubscribe
    //     })
    // }, [])

    // const handleSignUp = () => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredentials) => {
    //         const {user} = userCredentials
    //         console.log(user.email)
    //         addUserToDB(user)
    //         setIsAnonymous(false)
    //     })
    //     .catch(error => {
    //         alert(error)
    //     })
    // }
    // const handleSignUp = () => {
    //     navigation.navigate('SignUp')
    // }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const {user} = userCredentials
            console.log('logged in with:  '+user.email)
            setIsAnonymous(false)
        })
        .then(() => {setIsLoggedIn(true)})
        .catch(error => {
            alert(error)
        })
    }

    const handleAnonymousLogin = () => {
        signInAnonymously(auth)
        .then(console.log('logged in anonymously'))
        .then(() => {
            setIsAnonymous(true)
            setIsLoggedIn(true)
        })
        .catch(error => {
            alert(error)
        })
    }

    return (
            <KeyboardAvoidingView
                behavior="padding"
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                // behavior='height'
                style={styles.container}>
                <TouchableOpacity
                    style={styles.anonymousLoginButton}
                    onPress={() => handleAnonymousLogin()}
                >
                    <Text style={styles.anonymousLoginText}>Continue</Text>
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Image source={require('./../assets/images/logo.png')} style={styles.logo}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value = {email}
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize='none'
                    />
                    <TextInput
                        placeholder="Password"
                        value = {password}
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                <TouchableOpacity
                    style={styles.forgorPasswordButton}
                    onPress={() => {setModalVisible(true)}}
                >
                    <Text style={styles.forgorPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => handleLogin()}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={[styles.button, styles.signupButton]}
                        onPress={() => handleSignUp()}
                    >
                        <Text style={[styles.buttonText, styles.signupButtonText]}>Sign Up</Text>
                    </TouchableOpacity> */}
                    {/* <Button 
                        title="Continue w/o login"
                        onPress={() => {handleAnonymousLogin()}}
                    /> */}
                </View>
                <Text style={styles.signUpText}>Do not have an account?   <Text style={styles.link} onPress={()=>navigation.navigate('SignUp')}>Resgister Now</Text></Text>
                <ForgotPassModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        margin: 10,
        backgroundColor: 'white',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        fontSize: 18,
    },
    buttonContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButton: {
        // backgroundColor: '#fff',
        backgroundColor: '#00b5ec',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
        shadowColor: '#00b5ec',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    // buttonText: {
    //     color: '#000',
    //     fontSize: 20,
    //     fontWeight: '700',
    // },
    loginButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    // signupButton: {
    //     // backgroundColor: '#0782f9',
    // },
    signUpText:{
        marginTop: 15,
        color: '#ddd',
        fontSize: 15,
    },
    link: {
        color: '#00b5ec',
        fontSize: 15,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        // borderRadius: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 4, height: 4 },
        // shadowOpacity: 0.3,
        // shadowRadius: 20,
        // elevation: 5,
    },
    logo: {

        ...Platform.select({
            ios: {
              
                width: SCREEN_WIDTH*0.5,
                height: SCREEN_WIDTH*0.5,
            },
            android: {
              
                width: SCREEN_WIDTH*0.5,
                height: SCREEN_WIDTH*0.5,
            },
            default: {
              // other platforms, web for example
              
                width: SCREEN_WIDTH*0.1,
                height: SCREEN_WIDTH*0.1,
            }
          }),
        borderRadius: 20,
    },
    anonymousLoginButton: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        // position: 'absolute',
        left: '30%',
        // top: 50,
        right: 0,
    },
    anonymousLoginText: {
        color: '#00b5ec',
        fontSize: 18,
    },
    forgorPasswordButton: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        // marginRight: 20,
        marginBottom: 20,
    },
    forgorPasswordText: {
        color: '#00b5ec',
        fontSize: 15,
    },
})
