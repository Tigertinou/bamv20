import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { PageContext } from '../../PageContextProvider';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {expo} from '../../app.json';

export default function Start() {

    const { lang, setLanguage, setShowNav } = useContext(PageContext);
    const [ showStart, setShowStart ] = useState(false);

    const checkLanguage = async () => {
        var lg = await global.store.get('lang','');
        if(lg!=null && lg!=''){ global.lang = lg; }
        if(global.lang=='fr' || global.lang=='nl'){
            await global.loadLanguage(global.lang);
            global.navigation.navigate('home', { lang : global.lang, categories : '' });
            setShowNav(true);
            setShowStart(false);
        } else {
            setShowStart(true);
        }
    };
    checkLanguage();
    
    return (
        <>
            { showStart ? ( 
                <View style={global.styles.container, {
                    flex: 1, 
                    justifyContent: "center", 
                    alignItems: "center", 
                    backgroundColor : "#cc1e0d", 
                    height : 100
                    }}>
                    <Image
                        source={require('../assets/logo-brand-full.png')}
                        style={{  height:40, resizeMode:'contain', marginBottom:10 }}
                    />
                    <Text style={[global.styles.navigation,{fontSize:12,textTransform:'none',paddingVertical:0,paddingBottom:20}]} >version {expo.version}</Text>
                    <TouchableOpacity style={{ flexGrow:0, padding: 10, marginBottom : 10, backgroundColor : "#00000033", width : 200, alignItems : 'center' }} onPress={async ()=> { 
                            await global.setLanguage('nl');
                            setShowNav(true);
                            global.navigation.navigate('home', { lang : global.lang, categories : '' });
                        }}>
                        <Text style={{ color : '#FFF', fontSize : 20 }}>Nederlands</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexGrow:0, padding: 10, marginBottom : 10, backgroundColor : "#00000033", width : 200, alignItems : 'center' }} onPress={async ()=> { 
                            await global.setLanguage('fr');
                            setShowNav(true);
                            global.navigation.navigate('home', { lang : global.lang, categories : '' });
                        }}>
                        <Text style={{ color : '#FFF', fontSize : 20 }}>Français</Text>
                    </TouchableOpacity>
                </View>
            ) : null }
        </>
    );
}