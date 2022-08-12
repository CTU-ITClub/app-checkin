import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from "react-native";

const Backdrop = (props: any) => {
    const {children, color, opacity} = props;

    return <View style={{...styles.container, backgroundColor: color, opacity}}>{children}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        // opacity: 0.5,
        // backgroundColor: 'black',
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

Backdrop.propTypes = {
    children: PropTypes.any,
    color: PropTypes.string,
    opacity: PropTypes.number,
};

Backdrop.defaultProps = {
    color: '',
    opacity: 1
}

export default Backdrop;
