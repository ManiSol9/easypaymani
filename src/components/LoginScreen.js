import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import bgSrc from '../images/wallpaper.png';
import logoImg from '../images/logo.png';
import Dimensions from 'Dimensions';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

import axios from 'axios';

import { Actions, ActionConst } from 'react-native-router-flux';


import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Animated, Easing, ImageBackground } from 'react-native';


export default class LoginScreen extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: false,
            username: '',
            password: '',
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }

    _onPress() {
        if (this.state.isLoading) return;

        this.setState({
            isLoading: true
        });
        Animated.timing(this.buttonAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();




        if (this.state.username != '' && this.state.password != '') {

            const data = new FormData();

            data.append('username', this.state.username);
            data.append('password', this.state.password);

            axios({
                method: 'post',
                url: 'https://easypay.chamuel.in/api/login.php',
                data: data,
                config: {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            }).then(async response => {
                if (response.status == 200) {
                    if (response.data.message == 'Username Not Exists') {
                        alert("There is no account with this details. Please create account")
                        this.setState({
                            isLoading: false,
                            username: '',
                            password: ''
                        });
                    } else {
                        alert("Login successfully")
                        Actions.secondScreen();
                    }
                //console.log(response.data.message == )
                }
            }).catch(err => {
                alert("Something went wrong! Please check it later")
                this.setState({
                    isLoading: false,
                    username: '',
                    password: ''
                });
            })
        } else {
            alert('Please Fill all Fields')
            this.setState({
                isLoading: false
            });
        }


    }

    _onPresssignup() {
        Actions.thirdScreen();
    }



    _onGrow() {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }



    render() {

        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN],
        });

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.picture} source={bgSrc}>
                  <View style={styles.logo}>
                    <Image source={logoImg} style={styles.image} />
                    <Text style={styles.text}>Easy Pay</Text>
                  </View>
                  <View style={styles.body}> 
                    <View style={styles.inputWrapper}>
                      <TextInput
            style={styles.input}
            placeholder="Username"
            returnKeyType={this.props.returnKeyType}
            placeholderTextColor="white"
            value={this.state.username}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            keyboardShouldPersistTaps={'handled'}
            onChangeText={ (text) => this.setState({
                username: text
            })}
            />
                    </View>
                    <View style={styles.inputWrapper}>
                      <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            autoCorrect={true}
            value={this.state.password}
            returnKeyType={this.props.returnKeyType}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            autoCorrect={false}
            keyboardShouldPersistTaps={'handled'}

            onChangeText={ (text) => this.setState({
                password: text
            })}
            />
                    </View>                    
                  </View>  
                  <View style={styles.inputWrapper}>


                      <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
                        {this.state.isLoading ? (
                <Image source={spinner} style={styles.image_spin} />
                ) : (
                <Text style={styles.text}>LOGIN</Text>
                )}
                      </TouchableOpacity>
                     

                  </View>
                  <View style={styles.inputWrapper}>
                    <TouchableOpacity onPress={this._onPresssignup}>
                      <View>
                        <Text style={styles.text}>Create Account</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: '100%',
        height: null,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    },
    logo: {
        alignItems: 'center',
        height: 300,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff',
    },
    inputWrapper: {
        marginTop: 20,
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        width: DEVICE_WIDTH - 40,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#F035E0',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image_spin: {
        width: 24,
        height: 24,
    },

});