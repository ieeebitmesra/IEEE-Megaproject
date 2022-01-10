import React from 'react';
import { createContext } from 'react';
import { createStore, action } from 'easy-peasy';
import { StoreProvider } from 'easy-peasy';
import Navigation from './Navigation';
import _ from 'lodash';
import {LogBox} from 'react-native'

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};

export const dataContext = createContext();

const store = createStore({
  userChecked: false,
  setUserChecked: action((state, payload) => {
    state.userChecked = payload;
  }),
  isLoggedIn: false,
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  isAnonymous: false,
  setIsAnonymous: action((state, payload) => {
    state.isAnonymous = payload;
  }),
  loading: true,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  userData: null,
  setUserData: action((state, payload) => {
    state.userData = payload;
  }),
  isAdmin: false,
  setIsAdmin: action((state, payload) => {
    state.isAdmin = payload;
  }),
  signedOut: false,
  setSignedOut: action((state, payload) => {
    state.signedOut = payload;
  }),
  adminMode: false,
  setAdminMode: action((state, payload) => {
    state.adminMode = payload;
  }),
  clubs: [],
  setClubs: action((state, payload) => {
    state.clubs = payload;
  }),
  events: [],
  setEvents: action((state, payload) => {
    state.events = payload;
  }),
  change: false,
  setChange: action((state, payload) => {
    state.change = payload;
  }),
});

export default function App() {
  return (
    <StoreProvider store={store}>
      <Navigation />
    </StoreProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'yellow',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
