import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from "react-native";
import { Icon } from 'react-native-vector-icons/Icon';

const IconButton = (props: any) => {
    const { onPress, icon, title, backgroundColor } = props;

    return (
        <View style={styles.appButtonContainer}>
            <Icon.Button
                name={icon}
                backgroundColor={backgroundColor}
                onPress={onPress}
                style={styles.appButton}
            >
                <Text style={styles.appButtonText}>{title}</Text>
            </Icon.Button>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 80,
        backgroundColor: "#555",
    },
    appButton: {
        padding: 12,
    },
    appButtonText: {
        fontSize: 17,
    },
    appButtonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
});

IconButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string
};

export default IconButton;
