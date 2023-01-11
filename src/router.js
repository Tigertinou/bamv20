import React, { useContext, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, SafeAreaView } from 'react-native';
import PageContextProvider from '../PageContextProvider';

import * as Linking from 'expo-linking';

import useGlobal from "./components/Global";

import Header from "./components/Header";
import Start from "./pages/Start";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Detail from "./pages/Detail";
import Config from "./pages/Config";
import Navigation from "./pages/Navigation";
import Contact from "./pages/Contact";
import Player from "./components/Player";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function Routes(){

    const linking = {
        prefixes: [Linking.createURL('/'), 'https://businessam.be', 'https://fr.businessam.be']
    };

    Linking.addEventListener('url', ({url}) => {
        console.log(url);
    });
    Linking.getInitialURL();
    useGlobal();

    return (
        <PageContextProvider>
            <View style={{ flex: 1, backgroundColor: '#cc1e0d' }}>
                <NavigationContainer linking={linking}>
                    <SafeAreaView>
                        <Header key="key_header" />
                    </SafeAreaView>
                    <Stack.Navigator options={{ }} screenOptions={{
                        gestureEnabled: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}>
                        <Stack.Screen name="start" component={Start}
                        options={{
                            headerShown: false,
                            title: 'Start',
                            headerTitleStyle:{
                                fontFamily: 'SourceSansPro_700Bold'
                            }
                        }}></Stack.Screen>
                        <Stack.Screen name="home" component={Home}
                        options={{
                            headerShown: false,
                            title: 'Home',
                            headerTitleStyle:{
                                fontFamily: 'SourceSansPro_700Bold'
                            }
                        }}
                        />
                        <Stack.Screen name="categories" component={Categories}
                        options={{
                            headerShown: false,
                            title: 'Categories',
                            headerTitleStyle:{
                                fontFamily: 'SourceSansPro_700Bold'
                            }
                        }}
                        />
                        <Stack.Screen name="detail" component={Detail}
                        options={{
                            headerShown: false,
                            title: 'Detail',
                            headerTitleStyle:{
                                fontFamily: 'Oswald_400Regular'
                            },
                            gestureDirection: 'horizontal'
                        }}
                        />
                        <Stack.Screen name="contact" component={Contact}
                        options={{
                            headerShown: false,
                            title: 'Contact',
                            headerTitleStyle:{
                                fontFamily: 'Oswald_400Regular'
                            },
                            gestureDirection: 'horizontal'
                        }}
                        />
                        <Stack.Screen name="config" component={Config}
                        options={{
                            headerShown: false,
                            gestureDirection: 'vertical'
                        }}
                        />
                        <Stack.Screen name="navigation" component={Navigation}
                        options={{
                            headerShown: false,
                            gestureDirection: 'vertical-inverted'
                        }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
            <Player key="key_player" />
        </PageContextProvider>
    )
}
export default Routes;