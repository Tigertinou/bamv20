import React, { useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';

import { PageContext } from '../../PageContextProvider';

export default function Config() {

    const { lang, setLanguage, showPlayer, setShowPlayer, disablePlayer, setDisablePlayer } = useContext(PageContext);
    const [shouldShow, setShouldShow] = useState(true);

    // global.lang = lang;

    return(
        <>
        { shouldShow ? (
            <View style={[styles.container, {paddingVertical:10}]}>
                { showPlayer ? (!disablePlayer ? (
                    <>
                    <Text style={[styles.menu]} onPress={()=> { 
                        setDisablePlayer(true); 
                        global.navigation.goBack();
                    } }>Disable radio player</Text>
                    <View style={{ flexGrow:0, height:1, borderTopWidth:2, borderTopColor:'#00000022', marginTop:10, marginBottom:10  }}></View>
                    </>
                ) : (
                    <>
                    <Text style={[styles.menu]} onPress={()=> { 
                        setDisablePlayer(false); 
                        global.navigation.goBack();
                    } }>Enable radio player</Text>
                    <View style={{ flexGrow:0, height:1, borderTopWidth:2, borderTopColor:'#00000022', marginTop:10, marginBottom:10  }}></View>
                    </>
                )) : null }
                
                
                <Text style={[styles.menu]} onPress={()=> { 
                    global.setLanguage('fr'); 
                    global.navigation.navigate('home', { lang : 'fr' });
                } }>Français</Text>
                <Text style={[styles.menu]} onPress={()=> { 
                    global.setLanguage('nl'); 
                    global.navigation.navigate('home', { lang : 'nl' });
                } }>Nederlands</Text>
                <View style={{ flexGrow:0, height:1, borderTopWidth:2, borderTopColor:'#00000022', marginTop:10, marginBottom:10  }}></View>
                <Text style={{fontSize:20,color:"#00000099",fontWeight:'bold',textAlign:'center',paddingTop:20}}>BusinessAM</Text>
                <HTMLView stylesheet={styles.html} value={
`<p><b></b><br><b>Published by</b><br>Medianation N.V.<br>Ottergemsesteenweg Zuid 808, 9000 Gent, Belgium<br> <br><b>Contact us</b>
<b>Redactie:</b> <a href="mailto:redactie@medianation.be">redactie@medianation.be</a>
<b>Marketing:</b> <a href="mailto:marketing@medianation.be">marketing@medianation.be</a>
<b>Sales:</b> <a href="mailto:hello@medianation.be">hello@medianation.be</a>
<b>Privacy:</b> <a href="mailto:privacy@gmgroup.be">privacy@gmgroup.be</a>
<b>Phone:</b> <a href="tel:+3233760060">+32 (0)3 376 00 60</a><br>
<b>Privacy</b>
<a href="https://medianation.be/privacyverklaring/">https://medianation.be/privacyverklaring/</a></p>`} />
            </View>
        ) : null }
       </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#cc1e0d',
        color : '#FFF'
    },
    menu : {
        color : '#FFF',
        paddingVertical : 10,
        paddingHorizontal : 20,
        fontSize : 20,
        lineHeight: 20,
        width : '100%',
        fontFamily: 'Oswald_400Regular'
    },
    html : {
        a : {
            color : '#000000',
            textDecorationLine : 'underline'
        },
        p : {
            fontSize : 14,
            color : '#00000099',
            paddingHorizontal : 20,
            textAlign:'center',
            lineHeight : 20
        }
    }
});