import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { PageContext } from '../../PageContextProvider';
import { WebView } from 'react-native-webview';

/* import TrackPlayer, { RepeatMode } from 'react-native-track-player';

const setup = async () => {
  await TrackPlayer.setupPlayer({});

  await TrackPlayer.add({
      url: 'https://stream.medianation.be/bamaac',
      title: 'Pure (Demo)',
      artist: 'David Chavez',
      artwork: 'https://media.businessam.be/TheMorningDrive-1672135064.jpg?auto_optimize=low&width=300&aspect_ratio=1:1',
      duration: 28,
    });

  TrackPlayer.setRepeatMode(RepeatMode.Queue);
}; */

export default function Player() { 

    /* const player = React.useRef(); */

    const { lang, setLanguage, showPlayer, setShowPlayer, disablePlayer, setDisablePlayer } = useContext(PageContext);
    const [height, setHeight] = useState(85);
    
    const [sound, setSound] = React.useState({ _loaded : false });
    const [soundStatus, setSoundStatus] = React.useState({ isPlaying : false });
    const [soundTitle, setSoundTitle] = React.useState('Business AM');
    const [soundArtist, setSoundArtist] = React.useState('Live streaming');

async function toggleSound() {

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
            </View>
        ) : null }
        </>
    );
};