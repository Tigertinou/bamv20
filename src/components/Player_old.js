import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { PageContext } from '../../PageContextProvider';
import { WebView } from 'react-native-webview';

export default function Player() { 

    const CusWebviewRef = React.useRef();

    const { lang, setLanguage, showPlayer, setShowPlayer, disablePlayer, setDisablePlayer } = useContext(PageContext);
    
    const [height, setHeight] = useState(85);
    //const [shouldShow, setShouldShow] = useState(true);

    const playerUrl = 'https://businessam.be/radioplayer/webview/?v1.1.2&v=1.2.2' + new Date().getTime();

    const injectedJS = ``;
    /*
    global.showPlayer = () => {
        
    }
    
    useEffect(() => {
        setCanGoBack(global.navigation.canGoBack())
    }, [ menuActive ]);*/

    return(
        <>
        { showPlayer && ( global.lang=='nl' || global.lang=='fr') && !disablePlayer ? (
            <View style={{overflow: 'hidden', backgroundColor:'#111',height:height, borderTopColor : '#000000', borderTopWidth : 5, borderStyle:'solid'}}>
                <WebView 
                    ref={CusWebviewRef}
                    source={{ uri: playerUrl }}
                    originWhitelist={['https://*', 'http://*']}
                    style={{ width: '100%', height: height }}
                    scrollEnabled={false}
                    nestedScrollEnabled={false}
                    automaticallyAdjustContentInsets={true}
                    javaScriptEnabled={true}
                    injectedJavaScript={injectedJS}
                    mediaPlaybackRequiresUserAction={false}
                    onMessage={async (payload) => {
                        try { var payload = JSON.parse(payload.nativeEvent.data); } catch(e){ payload = {type:'none',data:{}}; }
                        var type = payload.type;
                        var data = payload.data;
                    }}
                    domStorageEnabled={true}
                    onLoadEnd={(e)=>{
                        setHeight(85);
                        // console.log(playerUrl)
                    }}
                ></WebView>
            </View>
        ) : null }
        </>
    );
};