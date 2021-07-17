import React, { Component } from 'react';
import { View, Text, StatusBar, TextInput, SafeAreaView, Platform, Image, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { font, color, shadow } from './Styles';

import { NavigationEvents } from 'react-navigation';

interface MyProps {
    Limg: require
}

export default class Header extends Component<MyProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        const { Limg, title, Rimg, Rimg2, count, height, paddingBottom = 5, _onWillFocus, _onDidFocus, _onWillBlur, _onDidBlur, searchBar = false, texts, searchFilterFunction, closeSearchBar,
            Lpress, Rpress2, Rpress, customeRightButton } = this.props
        return (
            <View style={{ backgroundColor: '#fff0', zIndex: 100, }} >
                <SafeAreaView style={{ backgroundColor: '#fff', }} />
                <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
                {!searchBar ?
                    <View style={{ overflow: 'hidden', paddingBottom: paddingBottom, backgroundColor: '#fff0', marginBottom: -paddingBottom }}>
                        <View style={{
                            paddingHorizontal: 15,
                            paddingVertical: 13,
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.35,
                            shadowRadius: 4,
                            elevation: 4,
                        }}>

                            <View style={{ width: 65 }}>
                                <TouchableOpacity disabled={!Limg ? true : false} onPress={() => Lpress ? Lpress() : null} style={{ height: 25, width: 25, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={Limg} style={{ resizeMode: 'contain', height: 19, width: 19, tintColor: color.primeColor }} />
                                </TouchableOpacity>
                            </View>
                            <Text numberOfLines={1} style={{ flex: 1, textAlign: 'center', fontFamily: font.mid, fontSize: 18, color: color.primeColor, }}>{title}</Text>
                            {customeRightButton ?
                                customeRightButton
                                : <View style={{ width: 65, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity disabled={!Rimg2 ? true : false} onPress={() => Rpress2 ? Rpress2() : null} style={{ height: 25, width: 25, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={Rimg2} style={{ resizeMode: 'contain', height: 19, width: 19, tintColor: color.primeColor, }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={!Rimg ? true : false} onPress={() => Rpress ? Rpress() : null} style={{ height: 25, width: 25, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={Rimg} style={{ resizeMode: 'contain', height: 19, width: 19, tintColor: color.primeColor, }} />
                                        {count ? <View borderColor={'#fff'} style={{ position: 'absolute', borderWidth: 2, backgroundColor: '#fff', height: 18, width: 18, top: -5, right: -2, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: font.bold, fontSize: 9, }}>{count}</Text>
                                        </View> : null}
                                    </TouchableOpacity>
                                </View>}
                        </View>
                    </View>
                    :
                    <View style={{ overflow: 'hidden', paddingBottom: paddingBottom, backgroundColor: '#fff0', }}>
                        <View style={{
                            paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.35,
                            shadowRadius: 4,
                            elevation: 4,
                            paddingVertical: 9.5
                        }}>
                            <View style={{ height: 25, width: 25, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                <Image source={require('../assets/img/back_drop_down_icon.png')} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: color.primeColor }} />
                            </View>
                            <TextInput
                                autoFocus={searchBar}
                                style={{ padding: 0, flex: 1, fontFamily: font.reg, fontSize: 18, color: '#fff' }}
                                placeholder="Search"
                                placeholderTextColor="#fff5"
                                value={texts}
                                blurOnSubmit={true}
                                onChangeText={texts => searchFilterFunction ? this.props.searchFilterFunction(texts) : null}
                            />
                            <TouchableOpacity onPress={() => closeSearchBar ? this.props.closeSearchBar() : null} style={{ height: 25, width: 25, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../assets/img/back_drop_down_icon.png')} style={{ height: 15, width: 15, resizeMode: 'contain', tintColor: color.primeColor }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                <NavigationEvents
                    onWillFocus={() => _onWillFocus ? this.props._onWillFocus() : null}
                    onDidFocus={() => _onDidFocus ? this.props._onDidFocus() : null}
                    onWillBlur={() => _onWillBlur ? this.props._onWillBlur() : null}
                    onDidBlur={() => _onDidBlur ? this.props._onDidBlur() : null}
                />
            </View>
        );
    }
}
