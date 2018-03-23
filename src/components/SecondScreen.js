import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity, Animated, Easing, } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import arrowImg from '../images/left-arrow.png';

const SIZE = 40;

export default class SecondScreen extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
        };

        this._onPress = this._onPress.bind(this);
        this.growAnimated = new Animated.Value(0);
    }

    _onPress() {
        Actions.loginScreen()
    }

    render() {
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, SIZE],
        });

        return (
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headertext}>Dashboard</Text>
              </View>
              <View style={styles.logout}>
                <TouchableOpacity
            onPress={this._onPress}
            style={styles.button}
            activeOpacity={1}>
                  <Text style={{
                color: '#fff'
            }}>Logout</Text>
                </TouchableOpacity>
                <Animated.View
            style={[styles.circle, {
                transform: [{
                    scale: changeScale
                }]
            }]}
            />
              </View>
      </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logout: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        margin: 20
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#F035E0',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: SIZE,
        borderRadius: 100,
        zIndex: 99,
        backgroundColor: '#F035E0',
    },
    headertext: {
        textAlign: 'center',
        marginTop: 25,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    circle: {
        height: SIZE,
        width: SIZE,
        marginTop: -SIZE,
        borderRadius: 100,
        backgroundColor: '#F035E0',
    },
    image: {
        width: 24,
        height: 24,
    },
});
