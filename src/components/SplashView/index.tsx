import React from 'react';
import PropTypes from 'prop-types';
import {Image, StatusBar, StyleSheet, Text} from "react-native";
import Backdrop from "../Backdrop";
import {getApplicationName} from "react-native-device-info";

const SplashView = (props: any) => {
    const {backgroundColor, textColor} = props;
    return (
        <Backdrop color={backgroundColor}>
            <StatusBar backgroundColor={backgroundColor} hidden={false} />
            <Image source={require('../../images/circle-itclub-logo.png')} style={styles.image}/>
            <Text style={{...styles.text, color: textColor}}>{getApplicationName()}</Text>
        </Backdrop>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    image: {
        width: 120,
        height: 120
    },
    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
});

SplashView.propTypes = {
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
};

SplashView.defaultProps = {
    backgroundColor: 'blue',
    textColor: 'white',
}

export default SplashView;
