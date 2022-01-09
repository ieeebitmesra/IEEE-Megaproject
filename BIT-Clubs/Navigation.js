import * as React from 'react';
import { useEffect,} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {auth} from './Backend/firebase';
import SplashScreen from './screens/SplashScreen';
import { getUserInfo } from './Backend/getUserInfo';
import { onAuthStateChanged } from "firebase/auth";
import { useStoreState, useStoreActions } from 'easy-peasy';
import AuthStack from './components/AuthStack';
import AppStack from './components/AppStack';
import { db } from './Backend/firestore';
import { collection, getDocs } from "firebase/firestore"; 

const Stack = createNativeStackNavigator();
const Loading = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} 
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
const Navigation = () => {
    // const todos = useStoreState((state) => state.todos);
    const isLoggedIn = useStoreState((state) => state.isLoggedIn);
    const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn);
    const setUserChecked = useStoreActions((actions) => actions.setUserChecked);
    const setUserData = useStoreActions((actions) => actions.setUserData);
    const loading = useStoreState((state) => state.loading);
    const setLoading = useStoreActions((actions) => actions.setLoading);
    const setClubs = useStoreActions((actions) => actions.setClubs);
    const isAnonymous = useStoreState((state) => state.isAnonymous);
    const setIsAnonymous = useStoreActions((actions) => actions.setIsAnonymous);
    const setIsAdmin = useStoreActions((actions) => actions.setIsAdmin);
    const setSignedOut = useStoreActions((actions) => actions.setSignedOut);
    const setAdminMode = useStoreActions((actions) => actions.setAdminMode);
    const setEvents = useStoreActions((actions) => actions.setEvents);

  // useEffect(() => {
  //   setUserChecked(false);
  //   setIsLoggedIn(false);
  //   setIsAnonymous(false);
  //   setLoading(true);
  //   setUserData(null);
  //   setIsAdmin(false);
  //   setSignedOut(false);
  //   setAdminMode(false);
  //   setClubs([]);
  //   setEvents([]);
  // },[])

  useEffect(() => {
    async function getClubs() {
      var data = []
      const querySnapshot = await getDocs(collection(db, "clubs"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({...doc.data(),id:doc.id});
      });
      console.log(data);
      setClubs(data);
      setLoading(false);
    }
    getClubs();
  } , []);

  onAuthStateChanged(auth, user=>{
    if (user) {
      if(isAnonymous){
        getUserInfo('anonymous')
          .then(doc=>{ setUserData(doc.data());})
          .then(()=>{setLoading(false);})
      }
      else{
        getUserInfo(user.uid)
          .then(doc => setUserData(doc.data()))
          .then(() => setLoading(false))
      }
    }
    else{
      setUserChecked(true);
      setLoading(false);
    }
  })
  return(
    <NavigationContainer>
      {loading ? <Loading/>: (isLoggedIn? <AppStack /> : <AuthStack />)}
    </NavigationContainer>
    )

}

export default Navigation

