import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/settings';
import EditEvents from '../screens/editEvents';



const Stack = createNativeStackNavigator();
export default function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsScreen" component={Settings} 
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="EditEventsScreen" component={EditEvents}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
