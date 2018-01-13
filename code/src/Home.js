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
    ImageBackground,
    Image
} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import imgBase64 from './images/bgBase64';

let Container = styled(ImageBackground)`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

let CountDownContainer = styled(View)`
  width: 300px;
  height: 200px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255,255,255,.3);
  margin-top: 100px;
`;

let MyText = styled(Text)`
  color: black;
  font-size: 40px;
`;

let TitleText = styled(Text)`
  color: black;
  font-size: 20px;
`;

let UntilText = styled(Text)`
  color: black;
  font-size: 50px;
`;

let NewYearText = styled(Text)`
  font-size: 30px;
  color: black;
`;

export default class extends Component<{}> {

    constructor() {
        super();

        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            finished: false
        };

    }

    componentWillMount() {
        this.updateTime();
    }

    updateTime() {
        let time = this.getTime();

        if (time.h <= 0 && time.m <= 0 && time.s <= 0) {
            this.setState({finished: true});
            clearInterval(this.timer);
            return;
        }

        this.setState({
            hours: time.h,
            minutes: time.m,
            seconds: time.s
        });
    }

    componentDidMount() {
        this.timer = setInterval(() => {

            this.updateTime();

        }, 1000);
    }

    getTime() {

        let endUnix = moment().endOf("year").unix();
        // let endUnix = moment(18, "HH").unix();
        let nowUnix = moment().unix();

        let secondsToEnd = endUnix - nowUnix;
        let hourLeft = Math.floor(secondsToEnd / 60 / 60);
        let minutesLeft = Math.floor(secondsToEnd / 60 % 60);
        let secondsLeft = Math.floor(secondsToEnd % 60);

        return {
            h: hourLeft,
            m: minutesLeft,
            s: secondsLeft
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    //{/*<Container source={{uri: imgBase64}}>*/}
    render() {
        return (
            <Container source={{uri: imgBase64}}>
                <CountDownContainer>
                    <TitleText>Hours   Minutes   Seconds</TitleText>
                    <MyText>{this.state.hours} : {this.state.minutes} : {this.state.seconds}</MyText>
                    {this.state.finished ?
                        <NewYearText>Happy New Year</NewYearText>
                        :
                        <UntilText>Until 2019</UntilText>}
                </CountDownContainer>
            </Container>
        );
    }
}