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


import { Actions, ActionConst } from 'react-native-router-flux';

import axios from 'axios';


import { StyleSheet, View, Image, Text, TextInput, ScrollView, TouchableOpacity, Animated, Easing, ImageBackground } from 'react-native';


export default class ThirdScreen extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: false,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phonenumber: '',
            username: ''
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

        if (this.state.username != '' && this.state.password != '' && this.state.firstname != '' && this.state.lastname != '' && this.state.email != '' && this.state.phonenumber != '') {

            const data = new FormData();

            data.append('username', this.state.username);
            data.append('password', this.state.password);
            data.append('email', this.state.email);
            data.append('lastname', this.state.lastname);
            data.append('firstname', this.state.firstname);
            data.append('phone', this.state.phonenumber);

            axios({
                method: 'post',
                url: 'https://easypay.chamuel.in/api/signup.php',
                data: data,
                config: {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            }).then(async response => {
                if (response.status == 200) {
                    if (response.data.message != 'Registration Completed Sucessfully') {
                        alert("Something went wrong! Please check it later")
                        this.setState({
                            isLoading: false,
                            username: '',
                            password: '',
                            phonenumber: '',
                            firstname: '',
                            lastname: '',
                            email: ''
                        });
                    } else {
                        alert("Registration successfully")
                        Actions.loginScreen();
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

    _onPressLogin() {
        Actions.loginScreen();
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
                  <ScrollView>
                  <View style={styles.body}> 
                    <View style={styles.inputWrapper}>
                      <TextInput
            style={styles.input}
            placeholder="FirstName"
            secureTextEntry={false}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={ (text) => this.setState({
                firstname: text
            })}
            />
                    </View>
                    <View style={styles.inputWrapper}>
                      <TextInput
            style={styles.input}
            placeholder="Lastname"
            secureTextEntry={false}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={ (text) => this.setState({
                lastname: text
            })}
            />
                    </View>

                    <View style={styles.inputWrapper}>
                      <TextInput
            style={styles.input}
            placeholder="Username"
            secureTextEntry={false}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={ (text) => this.setState({
                username: text
            })}
            />
                    </View>
                    <View style={styles.inputWrapper}>
                      <TextInput
            style={styles.input}
            placeholder="Email"
            secureTextEntry={false}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={ (text) => this.setState({
                email: text
            })}
            />
                    </View> 
                    <View style={styles.inputWrapper}>
                      <TextInput
            style={styles.input}
            placeholder="Phone number"
            secureTextEntry={false}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={ (text) => this.setState({
                phonenumber: text
            })}
            />
                    </View>                                       
                    <View style={styles.inputWrapper}>
                      <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={ (text) => this.setState({
                password: text
            })}
            />
                    </View> 
                  <View style={styles.inputWrapper}>
                      <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
                        {this.state.isLoading ? (
                <Image source={spinner} style={styles.image_spin} />
                ) : (
                <Text style={styles.text}>REGISTER</Text>
                )}
                      </TouchableOpacity>
                      

                  </View>
                  <View style={styles.inputWrapper}>
                    <TouchableOpacity onPress={this._onPressLogin}>
                      <View>
                        <Text style={styles.text}>Login Account</Text>
                      </View>
                    </TouchableOpacity>
                  </View>


                  </View> 
                  </ScrollView>
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
        height: 150,
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