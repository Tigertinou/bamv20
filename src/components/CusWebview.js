import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const CusWebview = (props) => {

    function sendDataToWebView() {
        CusWebviewRef.current.postMessage('Data from React Native App');
    }

    global.webviewGoBack = () => {
        if (CusWebviewRef.current) CusWebviewRef.current.goBack()
    }
    global.webviewGoForward = () => {
        if (CusWebviewRef.current) CusWebviewRef.current.goForward()
    }
    global.webviewReload = () => {
        try {
            CusWebviewRef.current.reload();
        } catch(err){
            console.log(currentUrl);
        }
    }

    const CusWebviewRef = React.useRef();
    
    const webview_querystring = 'webview=v2&v=1.1.2';
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(props.uri + (props.uri.search(/\?/gi)>=0?'&':'?') + webview_querystring);
    const newSource = { uri: currentUrl, headers:{'x-webview' : '1'} };
    const [height, setHeight] = useState(800);
    const [bartitle, setBartitle] = useState('');
    const [issecure, setIssecure] = useState(false);
    
    const injectedJSBefore = `
        window.isNativeApp = true;
        const consoleLog = (type, log) => {
            window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
        };
        console = {
            log: (log) => consoleLog('log', log),
            debug: (log) => consoleLog('debug', log),
            info: (log) => consoleLog('info', log),
            warn: (log) => consoleLog('warn', log),
            error: (log) => consoleLog('error', log),
        };
        true;
    `;
    const injectedJS = `
        // window.addEventListener("message", message => {
            // alert(message.data) 
        // });
        setTimeout(function() {
            setInterval(() => {
                document.querySelectorAll('body:not(.webview)').forEach(el=>{
                    el.classList.add('webview');
                });
                window.this_height = window.this_height || 0;
                var h = document.documentElement.scrollHeight;
                if(h!=window.this_height){ window.this_height=h; window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'size', 'data': {'height':h}})); }
                document.querySelectorAll('[target="_blank"]').forEach(el=>{
                    el.setAttribute('target','_self');
                });
            }, 100);
            if(oauth!=null && oauth.data!=null){
                window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'oauth', 'data': oauth.data}));
            }
        }, 100);
        
        true;
    `;
    
    useEffect(() => {
        global.webviewState = {
            canGoBack : canGoBack,
            canGoForward : canGoForward,
            currentUrl : currentUrl
        };
    }, [ canGoBack, canGoForward, currentUrl, newSource ]);

    return (
        <>
        <WebView 
            ref={CusWebviewRef}
            source={newSource}
            startInLoadingState={true}
            originWhitelist={['https://*', 'http://*']}
            style={{ width: '100%', height: height }}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            automaticallyAdjustContentInsets={true}
            javaScriptEnabled={true}
            injectedJavaScriptBeforeContentLoaded={injectedJSBefore}
            injectedJavaScript={injectedJS}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            domStorageEnabled={true}
            onMessage={async (payload) => {
                try { var payload = JSON.parse(payload.nativeEvent.data); } catch(e){ payload = {type:'none',data:{}}; }
                var type = payload.type;
                var data = payload.data;
                if(type=='size'){
                    if(data.height!=null){
                        setHeight(data.height);
                    }
                } else if(type=='href'){
                    if(data.href!=null){
                        if(data.href.search(/http[s]?:\/\/(fr\.)?businessam.be\//gi)>=0){
                            const response = await fetch(data.href + (data.href.search('/\?/gi')>=0?'&':'?') + 'pagetype');
                            const json = await response.text();
                                var j = JSON.parse(json);
                                if(j.type=='post' && j.id > 0){
                                    global.navigation.dispatch(global.stack.push('detail', { lang:global.lang, id: j.id }));
                                } else {
                                    Linking.openURL(data.href);
                                }
                             try {} catch(e){
                                alert('go outside');
                                Linking.openURL(data.href);
                            }
                        } else {
                            Linking.openURL(data.href);
                        }
                    }
                } else if(type=='Console'){
                    // console.info(`[Console] ${JSON.stringify(data)}`);
                } else if(type=='oauth'){
                    // console.info(`[OAuth] ${JSON.stringify(data)}`);
                    global.oauth = data;
                    global.oauthChange();
                } else {
                    // console.info(payload);
                }
            }}
            domStorageEnabled={true}
            onLoadEnd={(e)=>{
                const { nativeEvent } = e;
                global.reloadHeader();
                sendDataToWebView();
            }}
            onNavigationStateChange={(e) => {
                const { url } = e;
                if (!url) return;
                setCanGoBack(e.canGoBack);
                setCanGoForward(e.canGoForward);
                setIssecure(url.search(/https:\/\//gi)>=0);
                setBartitle(url.replace(/http[s]?:\/\//gi,'').replace(/\/.*$/gi,''));
            }}
            onShouldStartLoadWithRequest={(e) => {
                const isExternalLink = Platform.OS === 'ios' ? e.navigationType === 'click' : true;
                var u = e.url;
                if (u === currentUrl || isExternalLink==false){
                    return true;
                } else if(u.search(/businessam/gi)>=0){
                    if(u.search(/http[s]?:\/\/(fr\.)?businessam.be\//gi)>=0 && u.search(/webview/gi)<0){
                        u += (u.search(/\?/gi)>=0?'&':'?') + webview_querystring
                    }
                    setCurrentUrl(u);
                    return false;
                } else if(u.search(/(http)/gi)>=0) {
                    Linking.openURL(u);
                    return false;
                } else {
                    return true;
                }
            }}
        ></WebView>
        {/*<View style={{
            color : '#FFF',
            paddingVertical : 10,
            paddingHorizontal : 10,
            fontSize : 26,
            width : '100%',
            backgroundColor: '#EEEEEE',
            fontFamily: 'Oswald_400Regular',
            textTransform: 'uppercase',
            textAlign:'center',
            flex: 0, 
            flexDirection: 'row',
            height : 60
        }}>
            <TouchableOpacity style={{flexGrow:0, marginRight: 10}} onPress={global.webviewGoBack}>
                <Text style={[{
                    backgroundColor:'#00000000', 
                    color:'#333333',
                    borderRadius:100,
                    textAlign:'center', 
                    lineHeight:40, 
                    width:40,
                    fontSize : 30,
                    fontFamily: 'BamIcon'
                }]}>&#xe00D;</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexGrow:0, marginRight: 10}} onPress={global.webviewGoForward}>
                <Text style={{
                    backgroundColor:'#00000000', 
                    color:'#333333',
                    borderRadius:100,
                    textAlign:'center', 
                    lineHeight:40, 
                    width:40,
                    fontSize : 30,
                    fontFamily: 'BamIcon'
                 }}>&#xe00E;</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexGrow:1, marginRight: 10}} onPress={()=> { 
                    setCurrentUrl(currentUrl);
                }}>
                <Text style={{
                    backgroundColor:'#00000000', 
                    color:'#333333',
                    borderRadius:100,
                    textAlign:'center', 
                    lineHeight:42, 
                    width:40,
                    fontSize : 30,
                    fontFamily: 'BamIcon'
                 }}>&#xe041;</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexGrow:0, marginRight: 0}} onPress={()=> { 
                    Linking.openURL(currentUrl);
                }}>
                <Text style={{
                    backgroundColor:'#00000000', 
                    color:'#333333',
                    borderRadius:100,
                    textAlign:'center', 
                    lineHeight:42, 
                    width:40,
                    fontSize : 30,
                    fontFamily: 'BamIcon'
                 }}>&#xe05D;</Text>
            </TouchableOpacity>
            
        </View>
        */}
        </>
    );
};
export default CusWebview;