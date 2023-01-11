import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import Posts from "../components/Posts";

export default function Home(el) {
    
    var el = Object.assign({
        route : {
            params : {
                categories : ''
            }
        }
    },el || {});

    return(
        <View style={global.styles.container}>
            <Posts key='key_post_home' lang={global.lang} />
        </View>
    );
}