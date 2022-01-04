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
        const token = "43|wgrRrBYbGq31R0uwGu4eGJEPm0lfZQg2SiPnblTb";

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



        axios.defaults.baseURL = 'http://tourism.nhely.hu';
        const promise = axios.post('/api/paypal/' + id, {
            check_in: check_in,
            check_out: check_out,
            guests: guests,
        }, config);

        const dataPromise = promise.then((response) => {
            return response;
        }).catch((error) => {
            console.log(error)
        })
        return dataPromise;
    }
}

export default PayPal;