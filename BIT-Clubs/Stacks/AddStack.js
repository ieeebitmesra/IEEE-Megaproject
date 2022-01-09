import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetails from '../screens/event-details';
import Add from '../screens/add';


const Stack = createNativeStackNavigator();
export default function AddStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AddScreen" component={Add} 
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
