import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    Alert,
    Linking,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../Privet';
import OneSignal from 'react-native-onesignal';
import Global from '../Global';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            user_id: '',
            username: '',
        }
        // Global.main = this;
    }

    async oneSignal() {
        await OneSignal.setLogLevel(6, 0);
        await OneSignal.setAppId("API Key");

        // const deviceState = OneSignal.getDeviceState();
        await OneSignal.getDeviceState()
            .then(res => {
                // console.log("deviceState: ", res);
                User.deviceToken = res.userId;
                if (!res.isSubscribed) {
                    this.oneSignal();
                }
            });
    }

    async componentDidMount() {

        // OneSignal
        await OneSignal.setAppId("70a4e732-eae3-4938-b035-c11ab3af8eaf");
        await OneSignal.setLogLevel(6, 0);

        const deviceState = [];

        await OneSignal.addSubscriptionObserver(() => {
            OneSignal.getDeviceState().then((res) => {
                deviceState = res;
                User.deviceToken = res.userId;
            });
        });

        Platform.OS === "ios" ?
            OneSignal.promptForPushNotificationsWithUserResponse(response => {
                // console.log("Prompt response:", response);
            })
            : null

        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const user_id = await AsyncStorage.getItem('user_id');
        const username = await AsyncStorage.getItem('username');

        await Global.main.setState({ user_id, username });

        await this.props.navigation.navigate(user_id ? 'App' : 'Login');
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }
}
