import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WPapi } from '../components/WPapi';

export default function Global(){

    String.prototype.dateformat = function(dateFormat,locale){
        var locale = locale || window.locale; 
        var r = this.replace(/([0-9]+)\/([0-9]+)\/([0-9]+)/gi,'$3-$2-$1');
        return (new Date(r)!='Invalid Date'?new Date(r).dateformat(dateFormat):'');
    };

    Date.prototype.dateformat = function(dateFormat,locale){
        var locale = locale || window.locale;
        var date = this.getDate(),month = this.getMonth(),hours = this.getHours(),minutes = this.getMinutes(),seconds = this.getSeconds();
        date_string = dateFormat;
        date_string = date_string
        .replace(/(dddd)/gi,'8888')
        .replace(/(ddd)/gi,'888')
        .replace(/(dd)/gi,date<10?'0'+date:date)
        .replace(/(d)/gi,date)
        .replace(/(mmmm)/gi,'9999')
        .replace(/(mmm)/gi,'999')
        .replace(/(m3U)/gi,'777')
        .replace(/(mm)/gi,month<9?'0'+(month+1):month+1)
        .replace(/(m)/gi,month+1)
        .replace(/(yyyy)/gi,this.getFullYear())
        .replace(/(yy)/gi,(this.getFullYear()+'').substring(2,4))
        .replace(/(y)/gi,(this.getFullYear()+'').substring(2,4))
        .replace(/(dd)/gi,date<10?'0'+date:date)
        .replace(/(hh)/gi,hours<10?'0'+hours:hours)
        .replace(/(h)/gi,hours)
        .replace(/(nn)/gi,minutes<10?'0'+minutes:minutes)
        .replace(/(n)/gi,minutes)
        .replace(/(ss)/gi,seconds<10?'0'+seconds:seconds)
        .replace(/(s)/gi,seconds)
        .replace(/(8888)/gi,this.toLocaleDateString(locale,{weekday:'long'}))
        .replace(/(888)/gi,this.toLocaleDateString(locale,{weekday:'short'}))
        .replace(/(9999)/gi,this.toLocaleDateString(locale,{month:'long'}))
        .replace(/(999)/gi,this.toLocaleDateString(locale,{month:'short'}))
        .replace(/(777)/gi,this.toLocaleDateString(locale,{month:'short'}).replace(/^(...).*$/gi,'$1').toUpperCase());
        return date_string;
    };

    String.prototype.htmlify = function(){
        var html = '<container>' + this + '</container>';
        return { html:html };
    };

    global.store = {
        set : async (name,value) => {
            try {
                await AsyncStorage.setItem(name,value);
            } catch (error) {
                console.log(error);
            }
        },
        get : async (name,def) => {
            try {
                const value = await AsyncStorage.getItem(name);
                console.log(value);
                return value;
            } catch (error) {
                if(def!=null){
                    return def;
                } else {
                    console.log(error);
                }
            }
        }
    };
    
    // AsyncStorage.clear();

    global.lang = '';
    global.showHeader = false;
    global.oauth = {'connected':false};
    global.color = '#cc1e0d';
    global.route = '';
    global.url = '';
    global.api_url = '';
    global.portal_url = '';
    global.list_ids = [];
    global.webviewState = global.webviewState || {};

    global.loadLanguage = function(lg){ 
        if(global.lang!=lg){
            global.webviewState = {};
        }
        if(lg=='fr'){
            global.url = 'https://fr.businessam.be';
            global.portal_url = 'https://portalfr.businessam.be';
        } else {
            global.url = 'https://businessam.be';
            global.portal_url = 'https://portal.businessam.be';
        }
        global.api_url = global.url + '/api/'; 
    }
    global.setLanguage = async function(lg){ 
        if(['fr','nl'].includes(lg)){
            global.showHeader = true;
            global.lang = lg;
            global.loadLanguage(global.lang);
            await global.store.set('lang',global.lang);
        } else {
            global.showHeader = false;
        }
    };

    global.tl = function(fr,nl){
        return (global.lang=='fr'?fr:nl);
    }

    global.styles = StyleSheet.create({
        container : {
            flex:1,
            backgroundColor : '#F9F9F9'
        },
        colored : {
            color: '#cc1e0d'
        },
        navigation : {
            color : '#FFF',
            paddingVertical : 2,
            paddingHorizontal : 20,
            fontSize : 22,
            width : '100%',
            fontFamily: 'Oswald_400Regular',
            textTransform: 'uppercase',
            textAlign:'center'
        },
        navButton : {
            backgroundColor:'#00000000',
            color:'#FFFFFF',
            textAlign:'center',
            lineHeight:40,
            width:40,
            height:40,
            fontSize : 36,
            fontFamily: 'BamIcon3'
        },
        navButtonDisabled : {
            color:'#00000066'
        },
        loading : {
            flex:1,
            padding: 20, 
            textAlign:'center',
            color : '#000000CC'
        },
        lastActivity : {
            padding : 10, 
            zIndex : 9, 
            backgroundColor : '#FFFFFFCC',
            top:0,
            right:0,
            left:0
        },
        /******* CARD *******/
        card : {
            margin : 10,
            marginBottom : 0,
            borderWidth : 0,
            backgroundColor:'#fff',
            padding:0,
            shadowColor: "#00000066",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.10,
            shadowRadius: 1.41,
            elevation: 2
        },
        card_paywall : {
            position:'absolute',
            top:0,
            paddingHorizontal:5,
            paddingVertical:5,
            fontFamily: 'Oswald_400Regular',
            backgroundColor: '#f9c208',
            textTransform:'uppercase',
            color:'#FFF',
            fontSize : 16
        },
        card_taxonomy : {
            position:'absolute',
            bottom:0,
            paddingHorizontal:10,
            paddingVertical:5,
            fontFamily: 'Oswald_400Regular',
            backgroundColor: '#cc1e0d',
            textTransform:'uppercase',
            color:'#FFF',
            fontSize : 16
        },
        card_title : {
            fontSize:30, 
            fontFamily:'SourceSansPro_700Bold', 
            padding : 20,
            paddingBottom : 0,
            lineHeight : 30
        },
        card_detail : {
            paddingHorizontal : 20,
            paddingTop : 0,
            paddingBottom : 0
        },
        card_image : {
            minHeight:200, 
            height:208,
            backgroundColor:'#fff'
        },
        card_meta : {
            fontFamily: 'Oswald_400Regular',
            paddingBottom : 20
        }
    });

    global.stylesHtmlView = StyleSheet.create({
        a : {
            color : '#cc1e0d'
        },
        p : {
            fontSize : 18
        }
    });

    return true;
}
