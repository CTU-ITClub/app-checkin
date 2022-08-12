import React from 'react';
import {StatusBar, StyleSheet, Text, View} from "react-native";

const NewsScreen = () => {
    return (
        <>
            <StatusBar backgroundColor="#FFF" />
            <View style={styles.container}>
                <Text style={styles.text}>NewsScreen</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#000',
        margin: 5
    }
})

export default NewsScreen;