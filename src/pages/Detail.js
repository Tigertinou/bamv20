import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import RenderHtml, { HTMLElementModel, HTMLContentModel, defaultSystemFonts } from 'react-native-render-html';
// import AutoHeightWebView from 'react-native-autoheight-webview';
import { Dimensions } from 'react-native';

const systemFonts = [...defaultSystemFonts, 'Oswald_400Regular']

import Posts from "../components/Posts";
import CusWebview from '../components/CusWebview';
import { WPapi } from '../components/WPapi';

export default function Detail(el) {

    const [result, setResult] = useState({});
    const [item, setItem] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [status, setStatus] = useState(null);
    const [loadHTML, setLoadHTML] = useState(false);
    const [webViewHeight, setWebViewHeight] = useState(300);

    const { width } = useWindowDimensions();

    global.touchY = 0;
    global.webViewHeight = 1000;

    var el = Object.assign({
        route : {
            params : {
                id : '0',
                url : ''
            }
        }
    }, el || {});

    useEffect(() => {
        if(loaded==false){
            setItem({});
            setLoaded(true);
            setStatus(null);
            if(el.route.params.id>0){
                var url = `posts/?service=detail&id=${el.route.params.id}`;
                WPapi(url).then(res => {
                    if(res.status == '200'){
                        setItem(res.data[0]);
                        var pos = global.list_ids.findIndex(element => element == res.data[0].id);
                        if (pos!=null && pos >= 0) {
                            global.post_next = global.list_ids[pos + 1];
                            global.post_back = global.list_ids[pos - 1];
                        }
                    }
                    setResult(res);
                    setStatus(res.status);
                    setTimeout(() => {
                        setLoadHTML(true);
                    }, 500);
                });
            } else {
                res = {
                    status : 200,
                    data : [{
                        link : el.route.params.url
                    }]
                }
                setResult(res);
                setItem(res.data[0]);
                setStatus(res.status);
                setTimeout(() => {
                    setLoadHTML(true);
                }, 500);
            }
        }
    });

    return(
        <>
        { result.status == '200' && result.data.length > 0 ? (
            <>
            <View style={global.styles.container}>
            { loadHTML > 0 ? (
                <>
                    <CusWebview uri={ item.link } />
                </>
                    ) : (<Text style={global.styles.loading}>{global.tl('Chargement...', 'Loading...')}</Text> ) }
            
            </View>
            {/*
            <TouchableOpacity style={{ position:'absolute', bottom:10, left:10, zIndex:999 }} onPress={()=> global.navigation.dispatch(global.stack.push('detail', { lang:global.lang, id: item.page_prev.id })) }>
                 <Text style={{
                    backgroundColor:'#00000011', 
                    color:'#00000033',
                    borderRadius:100,
                    textAlign:'center', 
                    lineHeight:50, 
                    width:50,
                    fontSize : 34,
                    fontFamily: 'BamIcon'
                 }}>&#xe015;</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ position:'absolute', bottom:10, right:10, zIndex:999 }} onPress={()=> global.navigation.dispatch(global.stack.push('detail', { lang:global.lang, id: item.page_next.id })) }>
                 <Text style={{
                    backgroundColor:'#00000011', 
                    color:'#00000033',
                    borderRadius:100,
                    textAlign:'center', 
                    lineHeight:50, 
                    width:50,
                    fontSize : 34,
                    fontFamily: 'BamIcon'
                 }}>&#xe016;</Text>
            </TouchableOpacity>
                 */}
            </>
        ) : ( 
            status == '200' && posts.length==0 ? (<Text style={global.styles.loading}>{global.tl('Aucun élément trouvé.', 'Geen element gevonden.')}</Text>  ) : 
                        status == '200' ? (<Text style={global.styles.loading}>{global.tl('Chargement...', 'Loading...')}</Text>  ) : 
                            status == '404' ? (<Text style={global.styles.loading}>{global.tl('Connexion impossible...', 'Connection not possible...')}</Text>  ) : 
                ( <Text style={global.styles.loading}>{status}</Text> ) 
        )}
        </>
    );
}

const styles = StyleSheet.create({
    breadcrumb : {
        flexWrap: 'wrap', 
        alignItems: 'flex-start', 
        flexDirection: 'row', 
        width: 1000,
        backgroundColor: '#EEEEEE',
        paddingRight: 10,
        paddingLeft: 10,
    },
    breadcrumb_item : {
        padding: 5,
        color : '#999999',
        fontFamily: 'Oswald_400Regular'
    },
    title : {
        fontSize:30, 
        fontFamily:'SourceSansPro_900Black', 
        padding : 20,
        lineHeight : 30,
        backgroundColor: '#F9F9F9',
        marginBottom : 5
    },
    meta : { 
        display : 'flex',
        flexDirection : 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width : '100%',
        backgroundColor: '#F9F9F9'
    },
    meta_text : {
        fontFamily: 'Oswald_400Regular',
        fontSize: 16
    },
    content : {
        backgroundColor : '#EEE',
        padding:20
    },
    card_taxonomy: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontFamily: 'Oswald_400Regular',
        backgroundColor: '#cc1e0d',
        textTransform: 'uppercase',
        color: '#FFF',
        fontSize: 16
    },
    
    
    wrapper:{

    },
    slide:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    
    container:{
        flex:1,
        backgroundColor:'#fff',
    },

    swiperContent:{
        flexDirection:'row',
        height:340,
        width:'100%',
    },

    headerContent:{
        paddingHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        marginTop:20,
    },

    house:{
        fontSize:18,
        color:'#4f4a4a',
    },
    
    rating:{
        fontSize:9,
        color:'#4f4a4a',
    },

    myStarStyle:{
        color:'#E7A74e',
        backgroundColor:'transparent',
        textShadowColor:'#000',
        textShadowOffset:{ width:1, height:1 },
        textShadowRadius:1,
    },

    price:{
        paddingHorizontal:20,
        fontSize:16,
        color:'#000',
    },

    description:{
        paddingHorizontal:20,
        color:'#b3aeae',
        fontSize:14,
        lineHeight:20,
        marginTop:20,
    },

    slide:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        height:90,
        borderRadius:8,
        marginRight:20,
    },
});