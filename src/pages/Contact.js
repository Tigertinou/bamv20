import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import {expo} from '../../app.json';

export default function Contact() {

    var listHeaderComponent = (
        <Text style={styles.title}>Contact</Text>
    );

    return(
        global.lang == 'fr' ? (
            <View style={[global.styles.container,{paddingHorizontal : 20, paddingTop : 20, textAlign:'center' }]}>
                <Text style={[styles.title]}>Contact</Text>
                <HTMLView stylesheet={global.stylesHtmlView} value={`<p>Pour toutes les questions : <a href="mailto:redactionfr@businessam.be">redactionfr@businessam.be</a></p>`} />
                <Text style={[styles.title,{paddingTop:20,marginTop:20, fontSize:24, borderTopWidth:1, borderTopColor:'#00000011' }]}>Rédaction</Text>
                <HTMLView stylesheet={global.stylesHtmlView} value={`<a href="mailto:redactie@businessam.be">redactie@businessam.be</a>`} />
                <Text style={[styles.title,{paddingTop:5, fontSize:16}]}>MediaNation</Text>
                <HTMLView stylesheet={global.stylesHtmlView} value={`Ottergemsesteenweg Zuid 808 - 9000 Gent
    <a href="tel:+3233760060">+32 (0)3 376 00 60</a>`} />
                <Text style={[styles.title,{paddingTop:20,marginTop:20, fontSize:24, borderTopWidth:1, borderTopColor:'#00000011' }]}>Commercial</Text>
                <HTMLView stylesheet={global.stylesHtmlView} value={`<a href="mailto:connect@connectedmedia.be">connect@connectedmedia.be</a>`} />
                <Text style={[styles.title,{paddingTop:5, fontSize:16}]}>Connected Media</Text>
                <HTMLView stylesheet={global.stylesHtmlView} value={`Ottergemsesteenweg Zuid 808 bus 103 - 9000 Gent`} />
                <Text style={[styles.title,{paddingTop:5, fontSize:16}]}>Klaas Olbrechts</Text>
                <HTMLView stylesheet={global.stylesHtmlView} value={`<a href="tel:+32477780689">+32 (0)477 78 06 89</a>`} />
                <Text style={[styles.title,{paddingTop:20,marginTop:20, fontSize:24, borderTopWidth:1, borderTopColor:'#00000011' }]}>Abonnement</Text>
                <HTMLView stylesheet={global.stylesHtmlView} value={`<a href="mailto:businessam@idecommedia.be">businessam@idecommedia.be</a>`} />
                <Text style={[styles.title,{paddingTop:5, fontSize:16}]}>Service client Idecom Media</Text>
                <HTMLView stylesheet={global.stylesHtmlView} value={`Gouvernementstraat 32 - 9000 Gent`} />
                <HTMLView style={{marginTop:10}} stylesheet={global.stylesHtmlView} value={`<a href="tel:+3292962074">+32 (0)9 296 20 74</a> (du lundi au vendredi)`} />
            </View>
        ) : (
        <View style={[global.styles.container,{paddingHorizontal : 20, paddingTop : 20, textAlign:'center' }]}>
            <Text style={[styles.title]}>Contact</Text>
            <HTMLView stylesheet={global.stylesHtmlView} value={`<p>Met welk departement wenst u contact op te nemen?</p>`} />
            <Text style={[styles.title,{paddingTop:20,marginTop:20, fontSize:24, borderTopWidth:1, borderTopColor:'#00000011' }]}>Redactie</Text>
            <HTMLView stylesheet={global.stylesHtmlView} value={`<a href="mailto:redactie@businessam.be">redactie@businessam.be</a>`} />
            <Text style={[styles.title,{paddingTop:5, fontSize:16}]}>MediaNation</Text>
            <HTMLView stylesheet={global.stylesHtmlView} value={`Ottergemsesteenweg Zuid 808 - 9000 Gent
<a href="tel:+3233760060">+32 (0)3 376 00 60</a>`} />
            <Text style={[styles.title,{paddingTop:20,marginTop:20, fontSize:24, borderTopWidth:1, borderTopColor:'#00000011' }]}>Commercieel</Text>
            <HTMLView stylesheet={global.stylesHtmlView} value={`<a href="mailto:connect@connectedmedia.be">connect@connectedmedia.be</a>`} />
            <Text style={[styles.title,{paddingTop:5, fontSize:16}]}>Connected Media</Text>
            <HTMLView stylesheet={global.stylesHtmlView} value={`Ottergemsesteenweg Zuid 808 bus 103 - 9000 Gent`} />
            <Text style={[styles.title,{paddingTop:5, fontSize:16}]}>Klaas Olbrechts</Text>
            <HTMLView stylesheet={global.stylesHtmlView} value={`<a href="tel:+32477780689">+32 (0)477 78 06 89</a>`} />
            <Text style={[styles.title,{paddingTop:20,marginTop:20, fontSize:24, borderTopWidth:1, borderTopColor:'#00000011' }]}>Abonnement</Text>
            <HTMLView stylesheet={global.stylesHtmlView} value={`<a href="mailto:businessam@idecommedia.be">businessam@idecommedia.be</a>`} />
            <Text style={[styles.title,{paddingTop:5, fontSize:16}]}>Idecom Media klantenservice</Text>
            <HTMLView stylesheet={global.stylesHtmlView} value={`Gouvernementstraat 32 - 9000 Gent`} />
            <HTMLView style={{marginTop:10}} stylesheet={global.stylesHtmlView} value={`<a href="tel:+3292962074">+32 (0)9 296 20 74</a> (maandag tot vrijdag)`} />
        </View>
        )
    );
}

global.stylesHtmlView = StyleSheet.create({
    a : {
        color : '#cc1e0d'
    },
    p : {
        fontSize : 18
    }
});

const styles = StyleSheet.create({
    title : {
        fontSize:30, 
        fontFamily:'SourceSansPro_900Black', 
        lineHeight : 30
    }
});
