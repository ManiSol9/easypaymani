import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import Main from './src/components/Main';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
        <Main />
      </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('Vizag1', () => App);
