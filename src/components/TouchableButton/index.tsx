import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {isEmpty} from "../../utils/utils";
import Icons from "../Icons";

const TouchableButton = (props: any) => {

    const {title, style, onPress, iconName, iconType} = props;

    return (
        <TouchableHighlight style={{...styles.submit, ...style}} onPress={onPress} underlayColor='#fff'>
            <View style={styles.contentInline}>
                {
                    !isEmpty(iconName) &&
                    <Icons name={iconName} type={iconType} color={styles.submitText.color} size={20}/>
                }
                <Text style={styles.submitText}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#0068FF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        marginLeft: 10,
    },
    contentInline: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
})

TouchableButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.any,
    iconName: PropTypes.string,
    iconType: PropTypes.string,
};

TouchableButton.defaultProps = {
    title: 'Submit',
    style: {},
    iconName: 'gesture-tap-button',
    iconType: 'MaterialCommunityIcons',
}

export default TouchableButton;