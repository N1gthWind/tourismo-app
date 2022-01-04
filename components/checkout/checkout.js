import React, { Component } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Button as ButtonNative } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import PayPal from '../../services/paypal';
import { Modal, Picker } from "react-native";
import { WebView } from 'react-native-webview';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import {
    Box, Heading, AspectRatio, Image, Text, Center, Spinner, Input, HStack, Stack, Button, FormControl, Icon, ScrollView, NativeBaseProvider,
} from "native-base"

const Checkout = () => {
    return <Heading style={{ fontSize: 14 }}>Select hotel:</Heading>
}

export default Checkout;