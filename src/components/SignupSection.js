import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Actions, ActionConst } from 'react-native-router-flux';


export default class SignupSection extends Component {

    _onPress = () => {
        alert('jgjjggj')
        Actions.thirdScreen()
    }

    render() {
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={this._onPress}>
              <View>
                <Text style={styles.text}>Create Account</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        marginTop: 60,
        bottom: 90
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },

});
