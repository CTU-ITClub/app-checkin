import Snackbar from "react-native-snackbar";
import {DEFAULT_TIMEOUT} from "../constants/common";

const typeOf = (value: any) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

const isArr = (value: any) => typeOf(value) === 'array';
const isFn = (value: any) => typeOf(value) === 'function';
const isStr = (value: any) => typeOf(value) === 'string';
const isObj = (value: any) => typeOf(value) === 'object';
const isNumber = (value: any) => typeOf(value) === 'number';

const isEmpty = (value: any) => {
    return isArr(value) ? value.length <= 0 : !value;
}

const showSnackBar = (message: string = 'message', undoColor: string = 'green', callback?: () => {}) => {
    Snackbar.show({
        text: message,
        duration: DEFAULT_TIMEOUT,
        action: {
            text: 'Close',
            textColor: undoColor,
            onPress: () => {
                if (callback && isFn(callback)) {
                    callback();
                }
            },
        },
    });
}

export {
    typeOf,
    isArr,
    isFn,
    isStr,
    isObj,
    isNumber,
    isEmpty,
    showSnackBar,
}
