//Checkoutscreen.js
import React, { Component } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Button as ButtonNative } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import PayPal from '../services/paypal';
import { Modal, Picker } from "react-native";
import { WebView } from 'react-native-webview';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import {
    Box, Heading, AspectRatio, Image, Text, Center, Spinner, Input, HStack, Stack, Button, FormControl, Icon, ScrollView, NativeBaseProvider,
} from "native-base"
import CheckIn from './checkout/checkin_date';
import CheckOut from './checkout/checkout_date';




export default class CheckoutScreen extends Component {
    constructor(props) {
        super(props)
        this.webViewRef = React.createRef();

        this.state = {
            show_date_picker_check_in: false,
            show_date_picker_check_out: false,
            check_in_date: new Date(),
            check_out_date: new Date(),
            paypal_html_data: null,
            paypal_payment_token: null,
            isLoading: false,
            paypal_url: "",
            paypal_payment_closed: false,
            hotel: {}
        }
    }


    async CheckOutButtonHandleClick() {
        // let csrf = await SecureStore.getItemAsync('csrf');
        // let token = await SecureStore.getItemAsync('token');
        this.setState({
            isLoading: true,
        })

        const paypal = new PayPal();

        const promise = paypal.checkOutHandle("2022-01-16", "2022-01-17", '3', '1');
        
        await promise.then((data) => {
            this.setState({
                paypal_html_data: data,
            });
        });

        // const paymentToken = this.state.paypal_html_data.data.contextualLogin.paymentToken;

        console.log(this.state.paypal_html_data.data.contextualLogin.paymentToken);
    }


    handleCheckInButtonState() {
        this.setState({
            show_date_picker_check_in: true
        });
    }

    handleCheckOutButtonState() {
        this.setState({
            show_date_picker_check_out: true
        });
    }
    CheckOutChanged(event, selectedDate) {

        const currentDate = selectedDate || new Date();

        this.setState({
            show_date_picker_check_out: false,
            check_in_date: currentDate,
        })
        console.log("CHECK_OUT_DATE STATE: " + this.state.check_in_date);

    }

    CheckInChanged(event, selectedDate) {

        const currentDate = selectedDate || new Date();
        this.setState({
            show_date_picker_check_in: false,
            check_in_date: currentDate,
        });

        console.log("CHECK_IN_DATE STATE: " + this.state.check_in_date);
    }

    render() {
        return (
            <NativeBaseProvider>
                <CheckIn onChange={(event, selectedDate) => this.CheckInChanged(event, selectedDate)} shown={this.state.show_date_picker_check_in} currentvalue={this.state.check_in_date} />
                <CheckOut onChange={(event, selectedDate) => this.CheckOutChanged(event, selectedDate)} shown={this.state.show_date_picker_check_out} currentvalue={this.state.check_out_date} />

                <Button bg="emerald.500" m="2" colorScheme='emerald' onPress={() => this.handleCheckInButtonState()}
                    leftIcon={<Icon as={Ionicons} name="calendar-sharp" size="sm" />}
                >
                    Select Check In Date!
                </Button>

                <Button bg="emerald.500" m="2" colorScheme='emerald' onPress={() => this.handleCheckOutButtonState()}
                    leftIcon={<Icon as={Ionicons} name="calendar-sharp" size="sm" />}
                >
                    Select Check Out Date!
                </Button>

                <Input _focus={{ borderColor: 'emerald.500' }}
                    InputRightElement={
                        <Icon as={FontAwesome} name="user" size={5}
                            mr="2"
                            color="muted.400" />
                    }
                    borderColor="gray.400" placeholder="Enter guests number..." />

                <ButtonNative
                    title="CHECKOUT"
                    loading={this.state.isLoading}
                    onPress={() => this.CheckOutButtonHandleClick()}
                    icon={{
                        name: 'paypal',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconContainerStyle={{ marginRight: 10 }}
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                        backgroundColor: 'rgba(78, 116, 289, 1)',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: '100%',
                        alignItems: 'center',
                        marginHorizontal: 8,
                        marginVertical: 25,
                    }}
                    loadingStyle={{ 
                        width: 110,
                     }}
                />


            </NativeBaseProvider >
        );
    }

}