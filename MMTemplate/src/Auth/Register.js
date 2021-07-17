import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator, Image, StatusBar, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import ImagePicker from '../Component/ImagePicker';
import Picker from '../Component/Picker';
import DatePicker from '../Component/DatePicker';
import { font, color, shadow } from '../Component/Styles';
import SnackBar from '../Component/SnackBar';
import { API, User } from '../Privet';
import moment from 'moment';
const RN = Platform.OS === 'ios' ? require('react-native') : require('react-native-safe-area-context');
const { SafeAreaView } = RN;

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            name: '',
            mobile: '',
            email: '',
            address: '',
            state: '',
            city: '',
            ref_code: '',
            password: '',
            profilePhoto: [],
            childList: [{ photo: [], name: '', gender: '', dob: null }],
        };
    }

    selectPhoto(image, key) {
        const { childList } = this.state;
        if (key === 'profile') {
            this.setState({ profilePhoto: image })
        } else {
            childList[key].photo = image;
            this.setState({ childList });
        }
    }

    register() {
        const { name, mobile, email, ref_code, password, profilePhoto, childList, } = this.state;
        Keyboard.dismiss();
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const numreg = /[^0-9]/g;

        if (!name) {
            this.refs.name.shake(1000);
            this.refs.RNSnackBar.ShowSnackBarFunction("Please enter full name.");
        }
        else if (!mobile) {
            this.refs.mobile.shake(1000);
            this.refs.RNSnackBar.ShowSnackBarFunction("Please enter mobile number.");
        }
        else if (numreg.test(mobile)) {
            this.refs.mobile.shake(1000);
            this.refs.RNSnackBar.ShowSnackBarFunction("Please enter valid mobile number.");
        }
        else if (mobile.length != 10) {
            this.refs.mobile.shake(1000);
            this.refs.RNSnackBar.ShowSnackBarFunction("Please enter valid mobile number.");
        }
        else if (!email) {
            this.refs.email.shake(1000);
            this.refs.RNSnackBar.ShowSnackBarFunction("Please enter email address.");
        }
        else if (!reg.test(email)) {
            this.refs.email.shake(1000);
            this.refs.RNSnackBar.ShowSnackBarFunction("Please enter valid email address.");
        }
        else if (!password) {
            this.refs.password.shake(1000);
            this.refs.RNSnackBar.ShowSnackBarFunction("Please enter password.");
        }
        // else if (!profilePhoto.path) {
        //     this.refs.RNSnackBar.ShowSnackBarFunction("Please add your photo.");
        // }
        else {
            // this.props.navigation.navigate('OTP')
            return true;
            this.setState({ isLoading: true });

            let formData = new FormData();

            formData.append('name', name);
            formData.append('phonenumber', mobile);
            formData.append('email', email);
            formData.append('refral_code', ref_code);
            formData.append('password', password);
            formData.append('user_image', profilePhoto.path ? { uri: profilePhoto.path, name: 'profile.png', type: 'image/jpeg' } : '');

            // console.log(formData);

            fetch(API.register, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            }).then(response => response.json())
                .then(res => {
                    if (res.success) {
                        this.setState({ isLoading: false });
                        this.props.navigation.navigate('OTP', { data: res.data, type: 'regester' });
                    }
                    else {
                        this.refs.RNSnackBar.ShowSnackBarFunction(res.message);
                        this.setState({ isLoading: false });
                    }
                })
                .catch((error) => {
                    this.setState({ isLoading: false });
                    console.log('register_user error: ', error);
                });
        }
    }

    render() {
        const { isLoading, name, mobile, email, password, profilePhoto, } = this.state;
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#eff2f7' }} behavior={Platform.OS === 'ios' ? "padding" : null} >
                <StatusBar translucent backgroundColor="#fff0" />
                <SafeAreaView />

                <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} >

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: font.bold, marginTop: 20, marginBottom: 5, color: color.primeColor }}>REGISTER</Text>
                        <TouchableOpacity style={{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/mm_img/icon.png')} style={{ position: 'absolute', height: '100%', width: '100%' }} />
                            <Image source={require('../assets/img/camera_icon.png')} style={{ height: '31%', width: '31%', resizeMode: 'contain', tintColor: color.primeColor_op_40 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>

                        <View style={{ height: 55, justifyContent: 'center', marginBottom: 20 }}>
                            <Image source={require('../assets/mm_img/input.png')} style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'stretch' }} />
                            <TextInput
                                style={{ paddingHorizontal: 15, fontSize: 16, color: color.primeColor }}
                                placeholder="Full Name"
                            />
                        </View>

                        <View style={{ height: 55, justifyContent: 'center', marginBottom: 20 }}>
                            <Image source={require('../assets/mm_img/input.png')} style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'stretch' }} />
                            <TextInput
                                style={{ paddingHorizontal: 15, fontSize: 16, color: color.primeColor }}
                                placeholder="Username"
                            />
                        </View>

                        <View style={{ height: 55, justifyContent: 'center', marginBottom: 20 }}>
                            <Image source={require('../assets/mm_img/input.png')} style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'stretch' }} />
                            <TextInput
                                secureTextEntry
                                style={{ paddingHorizontal: 15, fontSize: 16, color: color.primeColor }}
                                placeholder="Password"
                            />
                        </View>

                        <TouchableOpacity style={{ height: 100, marginHorizontal: -20, justifyContent: 'center', marginBottom: 20 }}>
                            <Image source={require('../assets/mm_img/button.png')} style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'stretch' }} />
                            <Text style={{ textAlign: 'center', fontFamily: font.bold, color: color.primeColor, fontSize: 18 }}>REGISTER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ alignSelf: 'center' }}>
                            <Text style={{ textAlign: 'center', fontFamily: font.reg, color: color.primeColor, fontSize: 15 }}>Already a member? <Text style={{ fontFamily: font.bold, }}>LOGIN</Text></Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

                <ImagePicker ref="ImagePicker" onSelect={(image, key) => this.selectPhoto(image, key)} />
                <SnackBar ref="RNSnackBar" />
            </KeyboardAvoidingView>
        );
    }
}
