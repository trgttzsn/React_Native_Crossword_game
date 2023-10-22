
import React, { useEffect } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, Text, View, Image, BackHandler, TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-splash-screen';
import RNExitApp from 'react-native-exit-app';

import IconAD from 'react-native-vector-icons/AntDesign';

import CrossWordScreen from './screens/CrossWordScreen';
import rootReducer from './store';
import HowToPlay from './components/HowToPlay';
import About from './components/About';




function App(): JSX.Element {


    useEffect(() => {
        SplashScreen.hide();
    }, []);

    const Tab = createBottomTabNavigator();

    const store = configureStore({
        reducer: rootReducer,
        middleware: [thunkMiddleware]
    })

    const Exit = () => {
        return null
    }


    return (
        <Provider store={store}>
            
            <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Reload" component={ CrossWordScreen } options={{ headerShown: false, tabBarShowLabel: false,
                            tabBarButton: () => <TouchableOpacity onPress={() => Alert.alert(
                                'Yeniden Başla',
                                'Baştan başlamak mı istiyorsunuz?',
                                [
                                  {text: 'Hayır', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'Evet', onPress: () => RNRestart.Restart() },
                                ],
                            { cancelable: false }) }><IconAD name="reload1" size={18} style = {{ margin:15, marginLeft:20, color: "#0B284A" }} /></TouchableOpacity> }} />

                        <Tab.Screen name="How To Play" component={ HowToPlay } options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ focused, color, size }) => (
                            <IconAD name="question" size={25} color={ focused ? "#FA7F08" : "#0B284A"} />
                        ), }} />

                        <Tab.Screen name="Home" component={ CrossWordScreen } options={{ headerShown: false, tabBarShowLabel: false, tabBarItemStyle: {borderRadius: 30, backgroundColor: "#0B284A" }, tabBarIcon: ({ focused, color, size }) => (
                            <IconAD name="home" size={20} color={ "#fff"} />
                        ), }}  />

                        <Tab.Screen name="About" component={ About } options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ focused, color, size }) => (
                            <IconAD name="pushpin" size={20} color={ focused ? "#FA7F08" : "#0B284A"} />
                        ), }} />

                        <Tab.Screen name="Exit" component={ Exit } options={{ headerShown: false, tabBarShowLabel: false,
                            tabBarButton: () => <TouchableOpacity onPress={() => Alert.alert(
                                'Uygulamayı Kapat',
                                'Uygulamayı kapatmak mı istiyorsunuz?',
                                [
                                  {text: 'Hayır', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'Evet', onPress: () => RNExitApp.exitApp() },
                                ],
                            { cancelable: false }) }><IconAD name="close" size={18} style = {{ margin:15, marginLeft:20, color: "#0B284A" }} /></TouchableOpacity> }} />
                            
                    </Tab.Navigator>
                </NavigationContainer>
            
        </Provider>
    );

}

export default App;
