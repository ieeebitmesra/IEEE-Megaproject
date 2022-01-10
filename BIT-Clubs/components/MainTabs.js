import React, {useContext, useState, useEffect} from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Details from '../screens/details';
import Settings from '../screens/settings';
import Add from '../screens/add';
import {Ionicons} from '@expo/vector-icons';
import Home from '../screens/home';
import { auth } from '../Backend/firebase';
import { getUserInfo } from '../Backend/getUserInfo';
import {LoadingScreen} from '../screens/SplashScreen'
import { useStoreState, useStoreActions } from 'easy-peasy';
import ProfileStack from '../Stacks/ProfileStack';
import ClubDetailsStack from '../Stacks/ClubDetailsStack';

const Tab = createBottomTabNavigator();
const MainTabs = () => {
  const adminMode = useStoreState((state) => state.adminMode);
    return (
        <Tab.Navigator 
        screenOptions={({ route })=>({
          tabBarStyle: { 
            // borderTopRightRadius: 50,
            // height: 70,
            // paddingBottom: 20,
            paddingTop: 10,
            position: 'relative',
            shadowOffset: { width: 0, height: -7 },
            shadowRadius: 20,
            shadowColor: 'rgba(0,0,0, 1)',
            shadowOpacity: 0.25,
            elevation: 5,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }
            else if (route.name === 'Clubs') {
              iconName = focused ? 'grid' : 'grid-outline';
            }
            else if (route.name === 'Add') {
              iconName = focused ? 'ios-add' : 'ios-add-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={25} color='#7387cd'/>;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
        {/* <Tab.Screen name="Details" component={Details}/> */}
        <Tab.Screen name="Clubs" component={ClubDetailsStack}/>
        {adminMode && <Tab.Screen name="Add" component={Add} />}
        {/* {adminMode && <Tab.Screen name="Add" component={AddStack} />} */}
        {/* <Tab.Screen name="Settings" component={Settings} options={{ tabBarBadge: 3 }}/> */}
        <Tab.Screen name="Settings" component={ProfileStack} options={{ tabBarBadge: 3 }}/>
      </Tab.Navigator>
    )
}

export default MainTabs
