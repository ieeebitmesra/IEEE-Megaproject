import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import LottieView from 'lottie-react-native';

const SplashScreen = ({route, navigation}) => {
    if(Platform.OS != 'web'){
        return (
            <LottieView source={require('./../LottieFiles/splash6.json')} autoPlay loop />
        )
    }
    else{
        return(
            <View style={styles.container}>
                <Text>Loading....</Text>
            </View>
        )
    }
    
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})