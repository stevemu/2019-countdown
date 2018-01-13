/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground
} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

import Home from './src/Home';

export default class App extends Component<{}> {

    render() {
        return (
            <Home />
        );
    }
}