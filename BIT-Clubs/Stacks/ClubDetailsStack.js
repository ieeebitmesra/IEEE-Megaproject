import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Clubs from '../screens/clubs';
import clubPage from '../screens/clubPage';


const Stack = createNativeStackNavigator();
export default function HomeStacks() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ClubsScreen" component={Clubs} options={{headerShown: false}}/>
            <Stack.Screen name="clubPage" component={clubPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
