import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from "react-native";

const DividerLine = (props: any) => {
    const {lineColor, lineText} = props;

    return (
        <View style={styles.lineWrapper}>
            <View style={{...styles.lineView, backgroundColor: lineColor}}/>
            {
                lineText && <>
		            <View>
			            <Text style={{...styles.lineText, color: lineColor}}>{lineText}</Text>
		            </View>
		            <View style={{...styles.lineView, backgroundColor: lineColor}}/>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    lineWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    lineView: {
        flex: 1,
        height: 1
    },
    lineText: {
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5
    }
});

DividerLine.propTypes = {
    lineColor: PropTypes.string.isRequired,
    lineText: PropTypes.string
};

DividerLine.defaultProps = {
    lineColor: 'black',
    lineText: ''
};

export default DividerLine;