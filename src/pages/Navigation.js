import React, { useEffect, useState, useCallback } from "react";
import { Alert, Button, View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { WPapi } from '../components/WPapi';
import {expo} from '../../app.json';

export default function Navigation() {

    const [shouldShow, setShouldShow] = useState(true);
    const [result, setResult] = useState({ status:100 });
    const [loaded, setLoaded] = useState(false);

    const TextLinking = ({ url, style, children }) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);
        return <Text style={style} onPress={handlePress}>{children}</Text>;
    };

    useEffect(() => {
        if(loaded==false){
            setLoaded(true);
            var url = 'posts/?service=nav_mobile';
            WPapi(url).then(res => {
                //console.log(res);
                setResult(res);
            });
        }
    });

    return(
        <>
        { shouldShow ? (
            <ScrollView style={{ 
                    flex:1,
                    backgroundColor:'#cc1e0d'
                    }}>
                <View style={{
                    flex:0,
                    backgroundColor:'#cc1e0d',
                    color : '#FFF',
                    paddingTop:20, 
                    paddingBottom:0, 
                    alignItems: "center",
                    }}>
                    <Image
                        source={require('../assets/logo-brand-full.png')}
                        style={{  height:36, resizeMode:'contain' }}
                    />
                </View>
                <View style={{ 
                    flex:1,
                    backgroundColor:'#cc1e0d',
                    color : '#FFF',
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    alignItems: "center", 
                    justifyContent : 'flex-start',
                    paddingBottom:20 
                    }}>
                    {
                        result.status == '200' && result.primary.length > 0 ?
                            <View key={'key_navigation_primary'} style={{
                                flexDirection: 'row', 
                                flexWrap: 'wrap', 
                                paddingTop:20, 
                                paddingBottom:20, 
                                borderBottomColor : '#00000022', 
                                borderBottomWidth:2 
                                }}>
                                {
                                    result.primary.map( n =>
                                        (
                                            n.type=='taxonomy' ? (
                                                <Text key={'key_navigation_primary_' + n.slug} style={[global.styles.navigation,{ fontSize:26 }]} onPress={()=> global.navigation.navigate('categories', { title : n.title, categories : n.slug, lang : global.lang })}>{n.title}</Text>
                                            ) : null
                                        )
                                    )
                                }
                            </View>
                        : null
                    }
                    {
                        result.status == '200' && result.secondary.length > 0 ?
                            <View key={'key_navigation_secondary'} style={{
                                flexDirection: 'row', 
                                flexWrap: 'wrap', 
                                paddingTop:10, 
                                paddingBottom:20, 
                                borderBottomColor : '#00000022', 
                                borderBottomWidth:2, 
                                backgroundColor:'#00000010' 
                                }}>
                                {
                                    result.secondary.map( n =>
                                        n.type=='taxonomy' ? (
                                            <Text key={'key_navigation_secondary_' + n.slug} style={[global.styles.navigation,{ fontSize:20 }]} onPress={()=> global.navigation.navigate('categories', { title : n.title, categories : n.slug, lang : global.lang })}>{n.title}</Text>
                                        ) : null
                                    )
                                }
                            </View>
                        : null
                    }
                    {/* <Text key={'key_navigation_browser'} style={[global.styles.navigation]} onPress={() => { global.navigation.navigate('browser'); setShouldShow(false);} }>{global.tl('Browser','Browser')}</Text> */}
                    {/* <Text key={'key_navigation_close'} style={[global.styles.navigation]} onPress={() => global.navigation.goBack(null) }>{global.tl('Fermer','Close')}</Text> */}
                    <TouchableOpacity key={'key_navigation_about'} style={[global.styles.navigation,{textAlign:'center',paddingTop:20}]}>
                        <Text style={[global.styles.navigation,{fontSize:20,textTransform:'none',paddingVertical:0}]} onPress={() => global.navigation.navigate('contact') }>{global.tl('Contact','Contact')}</Text>
                        <TextLinking style={[global.styles.navigation,{fontSize:20,textTransform:'none',paddingVertical:0}]} url={'https://medianation.be/gebruiksvoorwaarden/'}>{global.tl('Conditions d\'utilisation','Gebruiksvoorwaarden')}</TextLinking>
                        <TextLinking style={[global.styles.navigation,{fontSize:20,textTransform:'none',paddingVertical:0}]} url={'https://medianation.be/privacyverklaring/'}>{global.tl('Déclaration de confidentialité','Privacyverklaring')}</TextLinking>
                        <Text style={[global.styles.navigation,{fontSize:12,textTransform:'none',paddingVertical:0,paddingTop:20}]} >{global.tl('Ⓒ Business AM - Infos économiques et financières','Ⓒ Business AM is part of MediaNation')} - version {expo.version}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        ) : null }
       </>
    )
}