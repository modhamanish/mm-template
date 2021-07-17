import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Dimensions, AppState, ActivityIndicator, Linking, SafeAreaView } from 'react-native';
import OneSignal from 'react-native-onesignal';
import translate from 'translate-google-api';
import Tts from 'react-native-tts';
import Header from '../Component/Header';
import { color, font } from '../Component/Styles';
import { API, User } from '../Privet';
import Global from '../Global';

const { height, width } = Dimensions.get('window');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    async componentDidMount() {
        // AsyncStorage.clear()
        const result = await translate(`Hello ${Global.main.state.username}! How are you?`, {
            tld: "com",
            from: "en",
            to: "en",
        });
        
        console.log(result[0]);
        // await Tts.setDefaultLanguage('hi-IN');
        await Tts.setIgnoreSilentSwitch("ignore");
        await Tts.speak(result[0]);
        // await Tts.speak(result[0], { language: "hi-IN", id: "com.apple.ttsbundle.Lekha-compact", quality: 300, name: "Lekha" });
    }

    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#F9FBFD' }}>
                    <SafeAreaView />
                    <Image source={require('../assets/mm_img/thank_you.png')} style={{ width: '100%', resizeMode: 'contain', height: '20%', }} />

                    <Image source={require('../assets/mm_img/for.png')} style={{ width: '100%', resizeMode: 'contain', height: '25%', }} />

                    <TouchableOpacity onPress={() => Linking.openURL("upi://pay?pa=mr.manishmodha@okicici&amp;pn=MM Template &amp;cu=INR")} style={{ width: '100%', }}>
                        <Image source={require('../assets/mm_img/coffee.png')} style={{ width: '100%', resizeMode: 'contain', height: 180, }} />
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10, fontSize: 20, color: "#F28B3C" }}>Click Here</Text>
                    </TouchableOpacity>

                    <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 20, fontSize: 16 }}>Don't forget to follow us on</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                        <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/manish.modha0969")}>
                            <Image source={require('../assets/mm_img/facebook.png')} style={{ height: 40, width: 40 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/modha-manish0969")}>
                            <Image source={require('../assets/mm_img/linkedin.png')} style={{ height: 40, width: 40, marginHorizontal: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com/manishmodha")}>
                            <Image source={require('../assets/mm_img/instagram.png')} style={{ height: 40, width: 40 }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ isLoading: false })} style={{ padding: 20, position: 'absolute', top: 0, right: 0 }}>
                        <SafeAreaView />
                        <Text style={{ fontSize: 17, color: color.lableColor }}>SKIP</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header
                    title="Home"
                    Limg={require('../assets/img/menu.png')}
                    Lpress={() => this.props.navigation.openDrawer()}
                />

                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 15 }}>

                    <Text>Home</Text>

                </ScrollView>

            </View>
        );
    }
}
