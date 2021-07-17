import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { font, color } from './Styles';

class SnackBar extends Component {
    constructor() {
        super();

        this.animatedValue = new Animated.Value(60);
        this.ShowSnackBar = false;
        this.HideSnackBar = true;
        this.state = {
            SnackBarInsideMsgHolder: ''
        };
    }

    show(SnackBarInsideMsgHolder = "Default SnackBar Message...", duration = 3000) {
        if (this.ShowSnackBar === false) {
            this.setState({ SnackBarInsideMsgHolder: SnackBarInsideMsgHolder });

            this.ShowSnackBar = true;

            Animated.timing
                (
                    this.animatedValue,
                    {
                        toValue: 0,
                        duration: 400
                    }
                ).start(this.hide(duration));
        }
    }

    hide = (duration) => {
        this.timerID = setTimeout(() => {
            if (this.HideSnackBar === true) {
                this.HideSnackBar = false;

                Animated.timing
                    (
                        this.animatedValue,
                        {
                            toValue: 60,
                            duration: 400
                        }
                    ).start(() => {
                        this.HideSnackBar = true;
                        this.ShowSnackBar = false;
                        clearTimeout(this.timerID);
                    })
            }
        }, duration);
    }

    SnackBarCloseFunction = () => {
        if (this.HideSnackBar === true) {
            this.HideSnackBar = false;
            clearTimeout(this.timerID);

            Animated.timing
                (
                    this.animatedValue,
                    {
                        toValue: 60,
                        duration: 400
                    }
                ).start(() => {
                    this.ShowSnackBar = false;
                    this.HideSnackBar = true;
                });
        }
    }

    render() {
        return (

            <Animated.View style={[{ transform: [{ translateY: this.animatedValue }] }, styles.SnackBarContainter]}>

                <Text numberOfLines={1} style={styles.SnackBarMessage}>{this.state.SnackBarInsideMsgHolder}</Text>

                <Text style={styles.SnackBarUndoText} onPress={this.SnackBarCloseFunction} > OK </Text>

            </Animated.View>

        );
    }
}

export default SnackBar;


const styles = StyleSheet.create({

    SnackBarContainter:
    {
        zIndex: 101,
        position: 'absolute',
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        left: 10,
        bottom: 10,
        right: 10,
        height: 45,
        paddingLeft: 10,
        paddingRight: 55,
        borderRadius: 8,
    },

    SnackBarMessage:
    {
        fontFamily: font.reg,
        color: '#fff',
        fontSize: 14
    },

    SnackBarUndoText: {
        fontFamily: font.bold,
        color: '#fff',
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        padding: 5

    }
});
// import then
// import SnackBar from '../Component/SnackBar';
{/* <SnackBar ref="RNSnackBar" /> */ }
// this.refs.RNSnackBar.ShowSnackBarFunction("Snackbar example");