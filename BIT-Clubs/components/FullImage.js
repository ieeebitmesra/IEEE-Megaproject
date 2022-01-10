import React, {useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading';

const FullImage = ({uri, styles}) => {
    const [aspectRatio, setAspectRatio] = useState(1)
    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            const aspectRatio = width / height
            setAspectRatio(aspectRatio)
        })
    }, [])

    if(aspectRatio === 1) {
        return <AppLoading />
    }
    return (
        <Image style={[styles, {aspectRatio: aspectRatio}]} source={{uri: uri}} />
    )
}

export default FullImage

const styles = StyleSheet.create({

})