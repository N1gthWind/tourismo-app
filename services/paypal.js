import React, { Component } from 'react';
import axios from 'axios';
import { getValueFromSecureStore } from './securestore';

class PayPal extends Component {

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    checkOutHandle(check_in, check_out, guests, id) {
        let return_value = false;

        // const csrf = getValueFromSecureStore('csrf');
        const token = "6|Vq4tfj1KLP2Buyir1D0JUbGCgsZ4qGmnMM8yS71e";

        const config = {
           
            headers: {
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials' : 'true',
                'Accept': "application/json",
            },
            
        };
        check_in = this.formatDate(check_in);
        check_out = this.formatDate(check_out);


        console.log(check_in,check_out,guests);

        
        axios.defaults.baseURL = 'http://tourism.nhely.hu';
        const promise = axios.post('/api/paypal/' + id, {
            check_in: check_in,
            check_out: check_out,
            guests: guests,
        }, config);

        const dataPromise = promise.then((response) => {
            return response;
        }).catch((error) => {
            if(error.response.data) {
                console.log(error.response.data);
            }
        })
        return dataPromise;
    }
}

export default PayPal;