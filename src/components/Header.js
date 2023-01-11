import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useNavigation, StackActions, CommonActions } from "@react-navigation/native";
import { WPapi } from '../components/WPapi';

import { PageContext } from '../../PageContextProvider';

export default function Header() {

    const { lang, setLanguage, showNav, setShowNav, showPlayer, setShowPlayer } = useContext(PageContext);
    const [shouldShow, setShouldShow] = useState(true);
    const [menuActive,setMenuActive] = useState('');
    const [canGoBack,setCanGoBack] = useState(false);
    const [canGoForward,setCanGoForward] = useState(false);
    const [portalConnect,setPortalConnect] = useState('');
    const [oauthConnected,setOauthConnected] = useState(false);

    global.navigation = useNavigation();
    global.stack = StackActions;
    global.reloadHeader = () => {
        if(global.navigation.getCurrentRoute().name=='detail'){
            setCanGoForward(global.webviewState.canGoForward);
        }
    }
    global.oauthChange = () => {
        /* console.log('oauth change');
        console.log(global.oauth); */
        setOauthConnected(global.oauth.connected);
    }

    global.navigation.addListener('state', (e) => {
        if(typeof global.navigation.getState()!='undefined'){
            let routes = global.navigation.getState().routes;
            if(routes[routes.length-1].name!=global.route){
                global.route = routes[routes.length-1].name;
                console.log('detail');
                setMenuActive('');
                setCanGoBack(global.navigation.canGoBack());
                if(global.route=='browser'){ setShouldShow(false); } else { setShouldShow(true); }
                if(global.route=='navigation'){ setMenuActive('navigation'); }
                if(global.route=='config'){ setMenuActive('config'); }
            }
        }
    });

    setTimeout(() => {
        // console.log('app.config');
        WPapi(`app.config.php`).then(res => {
            if(res.status==200){
                global.config = res;
                if(res.player!=null && res.player.active!=null){
                    setShowPlayer(res.player.active);
                }
                if(res.oauth!=null && res.oauth.client_id!=null && res.oauth.portal!=null){
                    // https://portal.businessam.be/oauth/authorize?client_id=958ab0b5-cd68-4184-a92b-1f96c15c62eb&scope=&redirect_uri=https://businessam.be/oauth/callback.php&response_type=code&state=https://businessam.be/vk-bestelling-300-tot-600-miljoen-euro-machinegeweren-fn-herstal/?webview=v2&v=1.1.3
                    var u = res.oauth.portal + '/oauth/authorize?client_id=' + res.oauth.client_id + '&scope=&redirect_uri=' + global.url + '/oauth/callback.php&response_type=code&state=';
                    setPortalConnect(u);
                }
            }
        });
    }, 1000);

    useEffect(() => {
        setCanGoBack(global.navigation.canGoBack())
    }, [ menuActive ]);

    /*global.styles.navButtonDisabled = { color:'#00000066' }*/
    return(
        <>
        { showNav && shouldShow ? (
            <View style={{
                flexDirection:'row',
                backgroundColor: '#cc1e0d',
                paddingHorizontal : 10,
                paddingVertical : 10,
                paddingRight : 10,
                color : '#FFF',
                height:60,
                borderBottomColor : '#b7130b',
                borderBottomWidth : 6,
                alignItems: 'center'
            }}> 
                <View style={{ flex: 1, flexDirection: "row", alignItems: 'center'  }}>
                    {/************************************ BRAND ************************************/}
                    <TouchableOpacity style={[{ flexGrow:0, paddingVertical : 6, paddingHorizontal : 4 },(menuActive=='navigation'?{display:'none'}:{})]} onPress={()=> {
                        global.navigation.navigate('home', { lang : global.lang });
                        /*if(global.navigation.getCurrentRoute().name=='navigation'){
                            global.navigation.goBack(null);
                        } else {
                            global.navigation.navigate({ name : 'navigation' });
                        }*/
                    }}>
                        <Image
                            source={require('../assets/logo-brand.png')}
                            style={{  height:36, resizeMode:'contain' }}
                        />
                    </TouchableOpacity>
                    {/************************************ MENUS ************************************/}
                    <TouchableOpacity style={{ flexGrow:1, lineHeight:60 }} onPress={()=> { 
                            if(global.navigation.getCurrentRoute().name=='navigation'){
                                global.navigation.goBack(null);
                            } else {
                                global.navigation.navigate({ name : 'navigation' });
                            }
                        }}>
                        <Text style={[global.styles.navButton,(menuActive=='navigation'?global.styles.navButtonDisabled:{})]}>{(menuActive=='navigation'?'\uE018':'\uE032')}</Text>
                    </TouchableOpacity>
                    {/************************************ BACK ************************************/}
                    <TouchableOpacity style={{ flexGrow:0, lineHeight:60 }} onPress={()=> { 
                        if(global.navigation.getCurrentRoute().name=='detail' && global.webviewState.canGoBack==true){
                            global.webviewGoBack();
                        } else if(global.navigation.getCurrentRoute().name!='home') {
                            global.navigation.goBack(null);
                        }
                        }}>
                        <Text style={[global.styles.navButton,{fontSize:30},(!canGoBack||global.navigation.getCurrentRoute().name=='home'?global.styles.navButtonDisabled:{})]}>{('\uE00D')}</Text>
                    </TouchableOpacity>
                    {/************************************ NEXT ************************************/}
                    <TouchableOpacity style={{ flexGrow:0, lineHeight:60 }} onPress={()=> { 
                            if(global.navigation.getCurrentRoute().name=='detail' && global.webviewState.canGoForward==true){
                                global.webviewGoForward();
                            }
                        }}>
                        <Text style={[global.styles.navButton,{fontSize:30},(!canGoForward?global.styles.navButtonDisabled:{})]}>{('\uE00E')}</Text>
                    </TouchableOpacity>
                    {/************************************ RELOAD ************************************/}
                    <TouchableOpacity style={{ flexGrow:0, lineHeight:60 }} onPress={()=> { 
                            if(global.navigation.getCurrentRoute().name=='detail'){
                                global.webviewReload();
                            } else {
                                var c = global.navigation.getState().routes.pop();
                                if(c!=null){
                                    global.navigation.dispatch(global.stack.push(c.name, (c.params!=null?c.params:{})));
                                }
                                // global.navigation.dispatch(global.stack.push('detail', { lang:global.lang, url: 'https://portal.businessam.be/login' }));
                            }
                        }}>
                        <Text style={[global.styles.navButton,{fontSize:30},(menuActive=='login'?global.styles.navButtonDisabled:{})]}>{('\uE041')}</Text>
                    </TouchableOpacity>
                    <View style={{ flexGrow:0, lineHeight:30, height:30, borderLeftWidth:2, borderLeftColor:'#00000033', marginRight:10, marginLeft:10  }}></View>
                    {/************************************ USER ************************************/}
                    <TouchableOpacity style={{ flexGrow:0, lineHeight:60  }} onPress={()=> { 
                            if(oauthConnected==true){
                                global.navigation.dispatch(global.stack.push('detail', { lang:global.lang, url: global.portal_url }));
                            } else {
                                global.navigation.dispatch(global.stack.push('detail', { lang:global.lang, url: portalConnect + (global.webviewState.currentUrl!=null?global.webviewState.currentUrl:global.url) }));
                            }
                        }}>
                        <Text style={[global.styles.navButton,(oauthConnected==true?global.styles.navButtonDisabled:{})]}>{('\uE05B')}</Text>
                    </TouchableOpacity>
                    {/************************************ MORE ************************************/}
                    <TouchableOpacity style={{ flexGrow:0, lineHeight:60 }} onPress={()=> { 
                            if(global.navigation.getCurrentRoute().name=='config'){
                                global.navigation.goBack(null);
                            } else {
                                global.navigation.navigate({ name : 'config' });
                            }
                        }}>
                        <Text style={[global.styles.navButton,{fontSize:30},(menuActive=='config'?global.styles.navButtonDisabled:{})]}>{(menuActive=='config'?'\uE018':'\uE00B')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : null }
        </>
    );
}