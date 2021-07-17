import React, { Component } from 'react';
import { View, Text, Dimensions, Modal, TouchableWithoutFeedback, ViewStyle, TouchableOpacity, Image, Platform, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { font, color } from './Styles';

const { width, height } = Dimensions.get('window');

interface MyProps {
    placeholder: String,
    value: Date,
    onChange: Function,
    mainViewStyle: ViewStyle,
    maxDate: Date,
    minDate: Date,
    mode: String | 'date' | 'time',
    disabled: Boolean,
    dateFormat: String,
    timeFormat: String,
}

export default class DatePicker extends Component<MyProps> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    onChange(date) {
        if (date.type === "dismissed") {
            this.setState({ visible: false })
        }
        if (date.type === "set") {
            // console.log(date)
            this.setState({ visible: false })
            this.props.onChange ? this.props.onChange(date.nativeEvent.timestamp) : null;
        }
        if (Platform.OS === 'ios') {
            this.props.onChange ? this.props.onChange(new Date(date.nativeEvent.timestamp)) : null;
        }
    }

    render() {
        const { visible } = this.state;
        const { mode = 'date', value, maxDate, minDate, disabled = false, placeholder = "Select", placeholderColor = color.lableColor, dateTextStyle, containtStyle, borderColor = color.borderColor, mainViewStyle, iconHide = false, tintColor = color.lableColor, icon = require('../assets/img/calendar.png'), dateFormat = "DD-MM-YYYY", timeFormat = "LT" } = this.props;
        return (
            <View borderColor={borderColor} style={[{ flex: 1, borderWidth: 1, height: 35, justifyContent: 'center', marginHorizontal: 15, borderRadius: 8, marginTop: 8 }, mainViewStyle]}>

                <TouchableOpacity onPress={() => { Keyboard.dismiss(); this.setState({ visible: true }) }} style={[{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingHorizontal: 12, }, containtStyle]} >
                    {/* {value ?
                        mode === 'date' ?
                            <Text numberOfLines={1} style={[{ flex: 1, fontFamily: font.reg, color: '#000', fontSize: 14 }, dateTextStyle]}>{moment(value).format('DD-MMM-YYYY')}</Text>
                            :
                            <Text numberOfLines={1} style={[{ flex: 1, fontFamily: font.reg, color: '#000', fontSize: 14 }, dateTextStyle]}>{moment(value).format('hh:mm A')}</Text>
                        :
                        <Text numberOfLines={1} style={{ flex: 1, fontFamily: font.reg, color: placeholderColor, fontSize: 14 }}>{placeholder}</Text>
                    } */}

                    <Text numberOfLines={1} style={{ position: 'absolute', left: 10, top: value ? -8 : 9, fontSize: value ? 11 : 14, color: value ? '#000' : color.lableColor, paddingHorizontal: value ? 2 : 0, backgroundColor: value ? '#fff' : '#0000', fontFamily: value ? font.bold : font.reg, marginTop: Platform.OS === "ios" ? 0 : -3 }}>{placeholder}</Text>

                    {
                        value ? mode === 'date' ?
                            <Text numberOfLines={1} style={[{ flex: 1, fontFamily: font.reg, color: '#000', fontSize: 14 }, dateTextStyle]}>{moment(value).format(dateFormat)}</Text>
                            :
                            <Text numberOfLines={1} style={[{ flex: 1, fontFamily: font.reg, color: '#000', fontSize: 14 }, dateTextStyle]}>{moment(value).format(timeFormat)}</Text> :
                            <View style={{ flex: 1 }} />
                    }

                    {!iconHide ? <View>
                        <Image source={icon} style={{ height: 15, width: 15, resizeMode: 'contain', tintColor: tintColor }} />
                    </View> : null}
                </TouchableOpacity>

                {Platform.OS !== 'ios' ?
                    visible ? <DateTimePicker
                        testID="dateTimePicker"
                        value={value ? new Date(value) : new Date()}
                        mode={mode}
                        maximumDate={maxDate ? maxDate : null}
                        minimumDate={minDate ? minDate : null}
                        is24Hour={false}
                        display="default"
                        onChange={(date) => this.onChange(date)}
                    /> : null : null
                }

                {Platform.OS === 'ios' ?
                    <Modal
                        transparent
                        visible={visible}>
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: '#0009', justifyContent: 'center', }}
                            activeOpacity={1}
                            onPressOut={() => this.setState({ visible: false })}
                        >
                            <TouchableWithoutFeedback>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 20, backgroundColor: '#fff', marginHorizontal: 40, borderRadius: 3 }}>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={value ? new Date(value) : new Date()}
                                        mode={mode}
                                        maximumDate={maxDate ? maxDate : null}
                                        minimumDate={minDate ? minDate : null}
                                        is24Hour={false}
                                        display="default"
                                        onChange={(date) => this.onChange(date)}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    </Modal>
                    : null}
            </View>
        );
    }
}
