import React, { Component } from "react";
import axios from "axios";
import { getValueFromSecureStore } from "./securestore";
import * as SecureStore from "expo-secure-store";

class PayPal extends Component {
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  async checkOutHandle(check_in, check_out, guests, id) {
    let return_value = false;
    let user = await SecureStore.getItemAsync("user");
    user = JSON.parse(user);
    // const csrf = getValueFromSecureStore('csrf');
    const token = "6|Vq4tfj1KLP2Buyir1D0JUbGCgsZ4qGmnMM8yS71e";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
      },
    };
    check_in = this.formatDate(check_in);
    check_out = this.formatDate(check_out);
    console.log(user.id);
    axios.defaults.baseURL = "http://tourism.nhely.hu";
    const promise = axios.post(
      "/api/paypal/" + id,
      {
        check_in: check_in,
        check_out: check_out,
        guests: guests,
        user_id: user.id,
      },
      config
    );

    const dataPromise = promise
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response.data) {
          return error.response.data;
        }
      });
    return dataPromise;
  }

  async getURLData(url) {
    const token = "6|Vq4tfj1KLP2Buyir1D0JUbGCgsZ4qGmnMM8yS71e";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
      },
    };

    axios.defaults.baseURL = "http://tourism.nhely.hu";
    const promise = axios.post(
      "/api/get-params",
      {
        url: url,
      },
      config
    );

    const dataPromise = promise
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response.data) {
          return error.response.data;
        }
      });
    return dataPromise;
  }

  async getPaymentData(paymentID) {
    const token = "6|Vq4tfj1KLP2Buyir1D0JUbGCgsZ4qGmnMM8yS71e";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
      },
    };

    const promise = axios.post(
      "http://tourism.nhely.hu/api/paypal/get-payment-info",
      {
        payment_id: paymentID,
      },
      config
    );

    const dataPromise = promise
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response.data) {
          return error.response.data;
        }
      });
    return dataPromise;
  }
}

export default PayPal;
