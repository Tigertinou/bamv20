import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import Posts from "../components/Posts";

export default function Categories(el) {

    var el = Object.assign({
        route : {
            params : {
                title : '',
                categories : ''
            }
        }
    },el || {});

    if(el.route.params.title.toString()!=''){
        var listHeaderComponent = (
            <Text style={styles.title}>{el.route.params.title}</Text>
        );
    } else {
        var listHeaderComponent = '';
    }

    return(
        <View style={global.styles.container}>
            <Posts /*key='key_post_categories' */
            lang={global.lang} 
            categories={el.route.params.categories}
            listHeaderComponent={listHeaderComponent} />
        </View>
    );
}

const styles = StyleSheet.create({
    title : {
        fontSize:30, 
        fontFamily:'SourceSansPro_900Black', 
        padding : 20,
        lineHeight : 30,
        marginTop : 10
    }
});