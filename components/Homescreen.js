// Homescreen.js
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Button, Input, Icon } from "react-native-elements";
import {
    Box,
    Text as Textbase,
    Heading,
    VStack,
    FormControl,
    Input as Inputbase,
    Link,
    Button as Buttonbase,
    HStack,
    Center,
    NativeBaseProvider,
} from "native-base"

import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TextInputProps,
    ImageBackground,
} from 'react-native'
import { Container } from "react-bootstrap";
import Login from "../services/login";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Homescreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            loginButtonClicked: false,
            loginError: false,
            errorMessage: "",
            UsernameInput: "",
            PasswordInput: "",
        };
    }

    async handleLoginCick() {
        let Response_status = false;
        let login = new Login();
        this.setState({ errorMessage: "" })
        this.setState({
            loginButtonClicked: true
        });

        if (this.validateEmail(this.state.UsernameInput)) {
            const login_response = await login.loginHandle(this.state.UsernameInput, this.state.PasswordInput)
                .then(data => {
                    Response_status = true;
                })
                .catch((error) => {
                    console.log(error)
                    Response_status = false;
                })



            if (!Response_status) {
                setTimeout(() => { this.setState({ loginButtonClicked: false, loginError: true, errorMessage: "You entered wrong credentials!" }) }, 2000)
            }
            else {
                this.setState({ errorMessage: "", loginButtonClicked: false, errorMessage: "" });
                this.props.navigation.navigate('About')
            }
        }
        else {
            setTimeout(() => { this.setState({ loginButtonClicked: false, loginError: true, errorMessage: "Email is not in correct format" }) }, 2000)
        }



    }

    async componentDidMount() {
        // const result = await ajax.loadcities();

        // await this.setState({
        //     isLoaded: true,
        //     items: result,
        // });
    }
    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        return (
            <ImageBackground style={styles.backgroundContainer} source={require('../assets/background.jpg')} >
                <View style={{ width: "90%" }}>
                    <View style={styles.form} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        <Input label="USERNAME:"
                            onChangeText={(value) => { this.setState({ UsernameInput: value }) }}
                            leftIcon={
                                <Icon
                                    name="user"
                                    type="font-awesome"
                                    color='#86939e'
                                    size={25}
                                />
                            }
                            containerStyle={styles.inputContainerStyle}
                            placeholder="Username"
                        />

                        <Input label="PASSWORD:"
                            onChangeText={(value) => { this.setState({ PasswordInput: value }) }}
                            errorStyle={{ color: 'red', fontSize: 18, fontWeight: "bold", display: 'flex', justifyContent: 'center' }}
                            errorMessage={this.state.errorMessage}
                            leftIcon={
                                <Icon
                                    name="lock"
                                    type="font-awesome"
                                    color='#86939e'
                                    size={25}

                                />
                            }
                            containerStyle={styles.inputContainerStyle}
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                        <View style={{ display: "flex", justifyContent: "center" }}>
                            <Button title="Log in" loading={this.state.loginButtonClicked} loadingProps={{ size: 'small', color: 'white' }}
                                buttonStyle={{
                                    backgroundColor: 'rgba(111, 202, 186, 1)',
                                    borderRadius: 5,
                                }}
                                titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                                containerStyle={{
                                    // marginHorizontal: 50,
                                    paddingHorizontal: 55,
                                    height: 50,
                                    width: "100%",
                                    // maxWidth: "280px",
                                    marginVertical: 10,
                                }}
                                onPress={() => {
                                    this.handleLoginCick()
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    form: {
        backgroundColor: "white",
        padding: 25,
    },
    textinput: {
        margin: 5,
        borderWidth: 1,
        borderColor: "gray",
        fontSize: 18,
        borderRadius: 4,
        height: "50px",
        padding: 14,
    },
    buttoncontainer: {

    }
});

export default Homescreen