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
import { Box,Heading,AspectRatio,Image,Text,Center,Spinner,Input,HStack,Stack,Button,FormControl,Icon,ScrollView,NativeBaseProvider,
} from "native-base"

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

    handleCheckInButtonState() {
        this.setState({
            show_date_picker_check_in: true
        });
    }

    handleCheckOutButtonState() {
        this.setState({
            show_date_picker_check_in: true
        });
    }

    setSelectedValue(itemValue) {
        console.log(itemValue);
    }

    CheckInChanged(event, selectedDate) {

        const currentDate = selectedDate || new Date();
        console.log(currentDate)
        this.setState({
            show_date_picker_check_in: false,
            check_in_date: currentDate,
        });

        console.log("CHECK IN STATE:" + this.state.check_in_date);
    }
    CheckOutChanged(event, selectedDate) {

        const currentDate = selectedDate || new Date();
        console.log(currentDate)
        this.setState({
            show_date_picker_check_in: false,
            check_in_date: currentDate,
        })

    }

    async componentDidMount() {
        const hotel = await this.props.navigation.getParam('hotel', 'No hotel found!');
        if (!hotel[0]) {
            this.setState({ hotel: null });
        }
        else {
            this.setState({ hotel: hotel });
        }
    }

    async CheckOutButtonHandleClick() {
        // let csrf = await SecureStore.getItemAsync('csrf');
        // let token = await SecureStore.getItemAsync('token');
        this.setState({
            isLoading: true,
        })

        const paypal = new PayPal();

        const promise = paypal.checkOutHandle("2022-01-03", "2022-01-05", '3', '1');
        await promise.then((data) => {
            this.setState({
                paypal_html_data: data,
            });
        });

        const paymentToken = this.state.paypal_html_data.data.contextualLogin.paymentToken;

        this.setState({
            paypal_payment_token: paymentToken,
        });

        this.setState({
            paypal_url: "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" + this.state.paypal_payment_token,
        })
    }

    _onNavigationStateChange(webViewState) {
        console.log(webViewState);

        if (webViewState.url === "http://tourism.nhely.hu/login") {
            this.props.navigation.navigate('About');
        }
    }

    renderNoHotel = () => {
        if (this.state.hotel == null) {
            return (
                <Heading textAlign="center" m="4">No hotel found!</Heading>
            );
        }
    }



    render() {
        let render_date_picker_in = null;
        let render_date_picker_out = null;
        let webview_for_paypal = null;
        let check_out_render = null;

        if (this.state.show_date_picker_check_in) {
            render_date_picker_in = (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.check_in_date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => this.CheckInChanged(event, selectedDate)}
                />
            );
        }

        if (this.state.show_date_picker_check_out) {
            render_date_picker_out = (
                <DateTimePicker
                    style={{
                        shadowColor: '#fff',
                        shadowRadius: 0,
                        shadowOpacity: 1,
                        shadowOffset: { height: 0, width: 0 },
                    }}
                    themeVariant="dark"
                    testID="dateTimePicker"
                    value={this.state.check_out_date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => this.CheckOutChanged(event, selectedDate)}
                />
            );
        }

        if (this.state.paypal_html_data && this.state.paypal_payment_token && !this.state.paypal_payment_closed) {
            check_out_render = null;
            webview_for_paypal = (

                <WebView
                    ref={this.webViewRef}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: this.state.paypal_url }}
                />

            );
        }
        let image_render = null;
        if (this.state.hotel.image_path != undefined) {
            let URL = "http://tourism.nhely.hu/images/hotels/" + this.state.hotel.image_path
            // let image_render = ()
        }

        let dropdown_render = null;

        if (this.state.hotel[0] != undefined) {
            dropdown_render = true;
        }
        console.log(this.state.hotel.image_path);
        return (
            <NativeBaseProvider>
                {!this.state.paypal_html_data && !this.state.paypal_payment_token ?
                    (<Center flex={1} px="3">
                        <Image style={{ width: '100%', height: '20%', }} source={{
                            uri: "http://tourism.nhely.hu/images/hotels/paris.jfif",
                        }} alt="image" />
                        
                        {dropdown_render ?
                            (
                                <Picker
                                    style={{ height: 50, width: 150 }}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                                    {this.state.hotel.map((data) => {
                                        return <Picker.Item key={data.hotel_id} label={data.name + " €" + data.price + " /day"} value={data.name + " " + data.price} /> 
                                    })}
                                </Picker>
                            ) :
                            (
                                <Heading textAlign="center" m="4">fasz</Heading>
                            )
                        }

                        <FormControl w={{ base: "75%", md: "25%", }}>
                            <Button bg="emerald.500" m="2" colorScheme='emerald' onPress={() => this.handleCheckInButtonState()}
                                leftIcon={<Icon as={Ionicons} name="calendar-sharp" size="sm" />}
                            >
                                Select Check In Date!
                            </Button>
                            <Button m="2" colorScheme='emerald' bg="emerald.500" onPress={() => this.handleCheckOutButtonState()}
                                leftIcon={<Icon as={Ionicons} name="calendar-sharp" size="sm" />}
                            >
                                Select Check Out Date!
                            </Button>
                            <FormControl.Label>Number of guests</FormControl.Label>
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
                            />
                        </FormControl>
                        {render_date_picker_in}
                        {render_date_picker_out}
                    </Center>)
                    :
                    null
                }
                {webview_for_paypal}
            </NativeBaseProvider>
        );
    }
}