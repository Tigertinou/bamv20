import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { PageContext } from '../../PageContextProvider';
import { WebView } from 'react-native-webview';

export default function Player() { 

    /* const player = React.useRef(); */

    const { lang, setLanguage, showPlayer, setShowPlayer, disablePlayer, setDisablePlayer } = useContext(PageContext);
    const [height, setHeight] = useState(85);
    
    const [sound, setSound] = React.useState({ _loaded : false });
    const [soundStatus, setSoundStatus] = React.useState({ isPlaying : false });
    const [soundTitle, setSoundTitle] = React.useState('Business AM');
    const [soundArtist, setSoundArtist] = React.useState('Live streaming');

    /* const [statusPlayer, setStatusPlayer] = useState({}); */

    //const [shouldShow, setShouldShow] = useState(true);

    /* const playerUrl = 'https://businessam.be/radioplayer/webview/?v1.1.2&v=1.2.2' + new Date().getTime(); */

    _onSoundStatusUpdate = soundStatusUpdate => {
        console.log(soundStatusUpdate);
    }

    async function soundSoundState() {
        let status = await sound.getStatusAsync();
        setSoundStatus(status);
    }

    async function toggleSound() {
        if(sound._loaded){
            await soundSoundState();
            if(soundStatus.isPlaying){
                stopSound();
            } else {
                playSound();
            }
        } else {
            playSound();
        }
    }
    
    async function playSound() {
        if(!sound._loaded){
            try {
                await Audio.setAudioModeAsync({
                    staysActiveInBackground: true,
                    interruptionModeAndroid: 1 /* Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX */,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: true,
                    allowsRecordingIOS: false,
                    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                    playsInSilentModeIOS: true,
                });
            } catch (e) {
                /* console.log(e); */
            }
            const { sound } = await Audio.Sound.createAsync( { 
                uri: 'https://stream.medianation.be/bamaac' 
            },{
                shouldPlay: true,
                staysActiveInBackground: true
            });
            setSound(sound);
        }
        await sound.playAsync();
        await soundSoundState();
    }

    async function stopSound() {
        await sound.pauseAsync();
        await soundSoundState();
    }
    

    return(
        <>
        { showPlayer && ( global.lang=='nl' || global.lang=='fr') && !disablePlayer ? (
            <View style={{
                overflow: 'hidden', 
                backgroundColor:'#cc1e0d',
                height:height, 
                borderTopColor : '#b7130b', 
                borderTopWidth : 5, 
                borderStyle:'solid',
                flexDirection : 'row',
                paddingHorizontal : 10
                }}>
                {/* <Video 
                ref={player}
                source={{uri: 'https://stream.medianation.be/bamaac'}} 
                //useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatusPlayer(() => status)}
                ></Video> */}
                <View style={{ flex : 0, justifyContent : 'center', paddingHorizontal : 10 }}>
                    <TouchableOpacity style={{ borderStyle:'solid', borderColor : '#FFFFFF', borderWidth : 2, borderRadius : 100 }} onPress={toggleSound}>
                        { soundStatus.isPlaying ? 
                            <Text style={[global.styles.navButton, {fontFamily : 'BamIcon3', fontSize : 26 }]}>{'\uE077'}</Text>
                            :
                            <Text style={[global.styles.navButton, {fontFamily : 'BamIcon3', fontSize : 26, paddingLeft : 2 }]}>{'\uE078'}</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ flex : 1, justifyContent : 'center', paddingHorizontal : 10 }}>
                    <Text style={{color : '#FFF', fontSize : 16, fontWeight : 'bold' }}>{ soundTitle }</Text>
                    <Text style={{color : '#FFF', fontSize : 16, }}>{ soundArtist }</Text>
                </View>
                <View style={{ flex : 0, justifyContent : 'center', paddingHorizontal : 10 }}>
                    <TouchableOpacity style={{ borderStyle:'solid', borderColor : '#FFFFFF', borderWidth : 2, borderRadius : 100 }} onPress={toggleSound}>
                        <Text style={[global.styles.navButton, {fontFamily : 'BamIcon3', fontSize : 30 }]}>{'\uE07E'}</Text>
                    </TouchableOpacity>
                </View>

                {/* <WebView 
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
                        console.log(playerUrl)
                    }}
                ></WebView> */}
            </View>
        ) : null }
        </>
    );
};