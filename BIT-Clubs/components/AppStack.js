import MainTabs from './MainTabs';
import EventDetails from '../screens/event-details'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function AppStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown: false}}/>
            <Stack.Screen name="EventDetails" component={EventDetails} 
                options={{
                    headerShown: false,
                    tabBarStyle: {display: 'none'}
                }}
            />
        </Stack.Navigator>
    )
}