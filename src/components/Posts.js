import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Text, View, TouchableOpacity, Image, RefreshControl, ActivityIndicator } from 'react-native';

import { WPapi } from './WPapi';
import Card from "../components/Card";

const Posts = (props) => {

    const flatListRef = React.useRef()

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastPage, setLastPage] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [lastActivity, setLastActivity] = useState('');
    const [lang, setLanguage] = useState('');
    
    const listHeaderComponent = props.listHeaderComponent || '';

    const toTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    }

    useEffect(() => {
        /* console.log('use'); */
        loadData();
    }, [ page, props ]);

    const loadData = () => {
        setLoading(false);
        setStatus(null);
        var url = `posts/?service=search&limit=10&page=${page}`;
        if(props.categories!=null&&props.categories!=''){ url += `&categories=${props.categories}`; }
        if(props.lang!=null){ url += `&lang=${ props.lang }`; }
        WPapi(url).then(res => {
            setRefreshing(false);
            setStatus(res.status);
            if (res.code !== 'rest_post_invalid_page_number') {
                if(page==1){
                    var newdata = res.data;
                } else {
                    var newdata = posts.concat(res.data);
                }
                setPosts(newdata);
            } else {
                setLastPage(true);
            }
            setLoading(false);
        });
        url = `posts/?service=search&limit=500&onlyid`;
        if(props.categories!=null&&props.categories!=''){ url += `&categories=${props.categories}`; }
        if(props.lang!=null){ url += `&lang=${ props.lang }`; }
        WPapi(url).then(res => {
            if(res.status==200){
                global.list_ids = res.data;
            }
        });
    };

    return (
        <>  
            { lastActivity !='' ? (
                <View style={[global.styles.lastActivity]}>
                    <Text><Text style={{fontWeight:'bold'}}>{global.tl('Dernière activité le','Laatste activiteit')}</Text> { lastActivity }</Text>
                </View>
            ) : null }
            { refreshing ? <ActivityIndicator /> : null}
            { posts.length > 0 ? (
                <FlatList
                    ref={flatListRef}
                    ListHeaderComponent={listHeaderComponent}
                    onEndReached={() => {
                        if (!loading && !lastPage) {
                            setPage(prevPage => prevPage + 1);
                        }
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    data={posts} 
                    renderItem={({ item }) => (
                        <Card key={'key_card_item_' + item} item={item} />
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => {
                            setPage(1);
                            setLastActivity(new Date().dateformat('dd/mm/yyyy HH:nn:ss'));
                            setTimeout( () => {
                                setLastActivity('');
                            },3000);
                            loadData();
                        }} />
                    }
                />
            ) : ( 
                status == '200' && posts.length==0 ? 
                        (<Text style={global.styles.loading}>{global.tl('Aucun élément trouvé.', 'Geen element gevonden.')}</Text>  ) : 
                        status == '200' ? (<Text style={global.styles.loading}>{global.tl('Chargement...', 'Loading...')}</Text>  ) : 
                            status == '404' ? (<Text style={global.styles.loading}>{global.tl('Connexion impossible...', 'Connection not possible...')}</Text>  ) : 
                ( <Text style={global.styles.loading}>{status}</Text> )
            ) }
        </>
    );
};
export default Posts;