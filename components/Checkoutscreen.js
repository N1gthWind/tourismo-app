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
import Errors from './checkout/errors';
import ContentDynamic from './checkout/content_dynamic';
import HotelExist from './checkout/hotel_exist';
import HotelNotExist from './checkout/hotel_not_exist';

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
            guests: "0",
            hotel: [],
            hotel_exist: false,
            error_happened: false,
            content_before_checkout_show: true,
            webview_show: false,
        }
    }



    async componentDidMount() {
        let hotel_object = this.props.navigation.state.params.hotel;
        await this.setState({
            hotel: hotel_object,
        });
        let hotel_arr = this.state.hotel;
        if (typeof hotel_arr != "undefined" && hotel_arr != null && hotel_arr.length != null
            && hotel_arr.length > 0) {
            this.setState({
                hotel_exist: true,
            })
        }
    }

    showErrors() {
        console.log("HELLO IT'S ME");
        this.setState({
            error_happened: true,
            isLoading: false,
        })
    }

    hideErrors() {
        console.log("HELLO IT'S ME 2");
        this.setState({
            error_happened: false,
            isLoading: false,
        })
    }
    showWebView(paymentToken) {
        console.log("SHOWING WEBVIEW");
        let newToken = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" + paymentToken;
        this.setState({
            error_happened: false,
            isLoading: false,
            paypal_url: newToken,
            content_before_checkout_show: false,
            webview_show: true,
        })
    }

    async CheckOutButtonHandleClick() {
        // let csrf = await SecureStore.getItemAsync('csrf');
        // let token = await SecureStore.getItemAsync('token');

        this.setState({
            isLoading: true,
        })

        const paypal = new PayPal();
        console.log(" (CheckOutButtonHandleClick:51 )" + this.state.guests, this.state.check_in_date, this.state.check_out_date);
        const promise = paypal.checkOutHandle(this.state.check_in_date, this.state.check_out_date, this.state.guests, '1');

        await promise.then((data) => {
            this.setState({
                paypal_html_data: data,
            });


        }).catch((error) => {
            console.log(1);
            this.hideErrors();
        });
        let paymentToken = null;
        if (typeof this.state.paypal_html_data.data !== 'undefined' && this.state.paypal_html_data) {
            paymentToken = this.state.paypal_html_data.data.contextualLogin.paymentToken;
            this.showWebView(paymentToken);
        }
        else {
            this.showErrors();
        }
    }

    async _onNavigationStateChange(webViewState) {
        console.log(webViewState);
        if (webViewState.url.includes("http://tourism.nhely.hu/api/api-status") &&
            webViewState.url.includes("paymentId") &&
            webViewState.url.includes("PayerID")) {
            // this.setState({
            //     webview_show: false,
            //     content_before_checkout_show: true,
            // })
            const paypal = new PayPal();
            const promise = await paypal.getPaymentData(webViewState.url);
            console.log(promise);
        }
    }

    GuestValueChanged(value) {
        this.setState({
            guests: value
        });
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
            check_out_date: currentDate,
        })
        console.log("CHECK_OUT_DATE STATE: " + this.state.check_out_date);

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
                <ContentDynamic shown={this.state.content_before_checkout_show}>
                    <HotelExist hotelExist={this.state.hotel_exist}>
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
                            onChangeText={(value) => this.GuestValueChanged(value)}
                            value={this.state.guests}
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
                                marginTop: 35,

                            }}
                            loadingStyle={{
                                width: 110,
                            }}
                        />
                        <Errors errorData={this.state.paypal_html_data} shown={this.state.error_happened} ></Errors>
                    </HotelExist>
                </ContentDynamic>

                <HotelNotExist hotelExist={this.state.hotel_exist}>
                    <ContentDynamic shown={this.state.content_before_checkout_show}>
                        <Center>
                            <Image source={require('../assets/nohotel.png')} alt="image"
                                style={{ resizeMode: 'contain', width: '90%', }} />
                            <Text fontSize="xl" color="coolGray.600">No available hotel found, right now!</Text>
                            <ButtonNative
                                title="GO BACK!"
                                onPress={() => { this.props.navigation.goBack() }}
                                loading={this.state.isLoading}
                                icon={{
                                    name: 'undo',
                                    type: 'font-awesome',
                                    size: 15,
                                    color: 'white',
                                }}
                                iconContainerStyle={{ marginRight: 10 }}
                                titleStyle={{ fontWeight: '700' }}
                                buttonStyle={{
                                    backgroundColor: '#10b981',
                                    borderColor: 'transparent',
                                    borderWidth: 0,

                                    borderRadius: 4,
                                }}
                                containerStyle={{
                                    width: '100%',
                                    alignItems: 'center',
                                    margin: 25,
                                }}
                                loadingStyle={{
                                    width: 110,
                                }}
                            />
                        </Center>

                    </ContentDynamic>
                </HotelNotExist>


                <ContentDynamic shown={this.state.webview_show}>
                    <WebView
                        ref={this.webViewRef}
                        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: this.state.paypal_url }}
                    />
                </ContentDynamic>

            </NativeBaseProvider >
        );
    }

}