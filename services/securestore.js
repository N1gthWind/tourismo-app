import React, { Component } from 'react';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFromSecureStore(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        return null;
    }
}



export {
    save,
    getValueFromSecureStore,
};