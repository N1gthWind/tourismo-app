import React, { Component } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { save, getValueFromSecureStore } from './securestore';

class Login extends Component {

    loginHandle(username, password) {
        let return_value = false;
        axios.defaults.baseURL = 'http://tourism.nhely.hu/';
        const promise =
            axios.post('/api/airlock/token', {
                email: String(username),
                password: String(password),
                device_name: "mobile",
                secret_key: "7e9cf5958652ad9231660bae70e232b121b20ea8b1f6f5a260c8e025400ce939ea4f8de3a4f5f2bd6de65d0e88d23f79104f658b335b2fef3a35f085243a1ad9",

            });
        const dataPromise = promise.then((response) => {
            save('csrf',response.data.csrf);
            save('token',response.data.token);
            save('user',response.data.user);
            //SecureStore.setItemAsync(key, value);
            return response;
        })
        return dataPromise;
    }
}

export default Login;
