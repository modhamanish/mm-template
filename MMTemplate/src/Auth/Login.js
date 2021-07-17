import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator, Dimensions, Image, StatusBar, ScrollView, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { font, color, shadow } from '../Component/Styles';
import SnackBar from '../Component/SnackBar';
import { API, User } from '../Privet';
import Global from '../Global';
const RN = Platform.OS === 'ios' ? require('react-native') : require('react-native-safe-area-context');
const { SafeAreaView } = RN;

const { height, width } = Dimensions.get('screen');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            password: '',
        };
    }

    componentDidMount() {
        // alert(Global.main.state.user_id)
    }

    login() {

        const { username, password } = this.state;
        Keyboard.dismiss();

        if (!username) {
            this.refs.RNSnackBar.show("Please enter username.");
        }
        else if (!password) {
            this.refs.RNSnackBar.show("Please enter password.");
        }
        else {
            this.setState({ isLoading: true });
            setTimeout(async () => {
                await AsyncStorage.setItem("user_id", '1')
                await AsyncStorage.setItem("username", username)
                await Global.main.setState({ username, user_id: '1' });
                await this.setState({ isLoading: false })
                await this.props.navigation.navigate('Home')
            }, 3000);
            return true;

            let formdata = new FormData();
            formdata.append('username', username);
            formdata.append('password', password);
            formdata.append('device_token', User.deviceToken);

            // console.log(formdata)

            fetch(API.login, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formdata
            }).then((response) => response.json())
                .then((res) => {
                    // console.log(res);
                    if (res.success) {
                        // User.id = '1';
                        if (res.data.is_phone_verified) {
                            // this.props.navigation.navigate('Home')
                            User.user_id = res.data.user_id + '';
                            User.name = res.data.name;
                            User.email = res.data.email;
                            User.phonenumber = res.data.phonenumber;
                            User.serial_code = res.data.serial_code;
                            User.user_image = res.data.user_image;
                            User.token = res.data.token;

                            const items = [
                                ['user_id', res.data.user_id + ''],
                                ['name', res.data.name],
                                ['email', res.data.email],
                                ['phonenumber', res.data.phonenumber],
                                ['serial_code', res.data.serial_code],
                                ['user_image', res.data.user_image],
                                ['token', res.data.token]
                            ];
                            // console.log(items);
                            AsyncStorage.multiSet(items, () => {
                                this.setState({ isLoading: false }, () =>
                                    this.props.navigation.navigate('Home')
                                );
                            })
                        }
                        else {
                            this.setState({ isLoading: false });
                            this.props.navigation.navigate('OTP', { data: res.data, type: 'login' });
                        }
                    }
                    else {
                        this.refs.RNSnackBar.show(res.message);
                        this.setState({ isLoading: false });
                    }
                })
                .catch((error) => {
                    this.setState({ isLoading: false });
                    console.log(error);
                });
        }
    }

    render() {
        const { isLoading, username, password } = this.state;
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#eff2f7' }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                <StatusBar translucent backgroundColor="#fff0" />
                <SafeAreaView />

                <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} >

                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/mm_img/icon.png')} style={{ position: 'absolute', height: '100%', width: '100%' }} />
                            <Image source={require('../assets/mm_img/logo_icon.png')} style={{ height: '55%', width: '55%' }} />
                        </View>
                        <Text style={{ fontFamily: font.bold, marginTop: 5, color: color.primeColor }}>Welcome to MMT!</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20, marginTop: 35 }}>

                        <View style={{ height: 55, justifyContent: 'center', marginBottom: 20 }}>
                            <Image source={require('../assets/mm_img/input.png')} style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'stretch' }} />
                            <TextInput
                                style={{ paddingHorizontal: 15, fontSize: 16, color: color.primeColor }}
                                placeholder="Username"
                                value={username}
                                onChangeText={username => this.setState({ username })}
                            />
                        </View>

                        <View style={{ height: 55, justifyContent: 'center', marginBottom: 20 }}>
                            <Image source={require('../assets/mm_img/input.png')} style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'stretch' }} />
                            <TextInput
                                secureTextEntry
                                style={{ paddingHorizontal: 15, fontSize: 16, color: color.primeColor }}
                                placeholder="Password"
                                value={password}
                                onChangeText={password => this.setState({ password })}
                            />
                        </View>

                        <TouchableOpacity disabled={isLoading} onPress={() => this.login()} style={{ height: 100, marginHorizontal: -20, justifyContent: 'center', marginBottom: 20 }}>
                            <Image source={require('../assets/mm_img/button.png')} style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'stretch' }} />
                            {isLoading ? <ActivityIndicator color={color.primeColor} /> : <Text style={{ textAlign: 'center', fontFamily: font.bold, color: color.primeColor, fontSize: 18 }}>LOGIN</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={{ alignSelf: 'center' }}>
                            <Text style={{ textAlign: 'center', fontFamily: font.reg, color: color.primeColor, fontSize: 15 }}>Not a member? <Text style={{ fontFamily: font.bold, }}>REGISTER</Text></Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

                <SnackBar ref="RNSnackBar" />
            </KeyboardAvoidingView>
        );
    }
}
