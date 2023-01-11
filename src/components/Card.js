import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

//import RenderHtml from 'react-native-render-html';

export default function Card(props){

    var item = props.item;

    return(
        <TouchableOpacity key={'key_card_' + item.id} style={global.styles.card} onPress={() => global.navigation.dispatch(global.stack.push('detail', { lang:global.lang, id: item.id })) }>
            <View style={{overflow: 'hidden', backgroundColor:'#00000005'}}>
                <Image
                    source={{ uri : item['image']['link'] + '?width=772&height=434&aspect_ratio=16:9' }}
                    style={[global.styles.card_image, {backgroundColor:'#00000005'}]}
                />
                <Text style={global.styles.card_taxonomy}>{item.category.name}</Text>
                { item.paywall===true ? <Text style={global.styles.card_paywall}><FontAwesome name="diamond" size={24} color="black"/></Text> : null }
            </View>
            <Text style={global.styles.card_title}>{item.title}</Text>
            <View style={global.styles.card_detail}>
                {/*<RenderHtml contentWidth={100} source={{html:item.content}} /> */}
                <Text style={global.styles.card_meta}>{item.publish_date_string} {global.tl('par', 'by')} <Text style={global.styles.colored}>{item.author.name}</Text></Text>
            </View>
        </TouchableOpacity>
    );
}


/*
<TouchableOpacity onPress={(props.onPress)} style={styles.container}>
            <Image
            source={props.cover}
            style={styles.cover}
            />

            <View style={styles.content}>
                <Text style={styles.title}>{props.name}</Text>
                <View style={styles.dot}></View>
                <Text style={styles.badge}>Novo</Text>
            </View>

            <Text style={styles.description}>
                {props.description}
            </Text>

            <View style={styles.footer}>
                <View style={{width:'80%'}}>
                    <Text style={styles.price}>R$ 1.204,90</Text>
                </View>
                <View style={{width:'20%'}}>
                    <Ionicons name="ios-add-circle" size={24} color="black"/>
                </View>
            </View>
        </TouchableOpacity>

*/