import React, { Component } from 'react';
import axios from 'axios';


class Cities extends Component {

    GetCityData() {
        axios.defaults.baseURL = 'http://tourism.nhely.hu/';
        const promise =
            axios.get('/api/cities', {
            });
        const dataPromise = promise.then((response) => {
            return response.data
        })
        return dataPromise;
    }
}
export default Cities