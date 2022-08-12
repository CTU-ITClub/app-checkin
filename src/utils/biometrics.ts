// https://www.npmjs.com/package/react-native-biometrics
// Install: yarn add react-native-biometrics / npm install react-native-biometrics --save
// Apply to iOS: npx pod-install
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import * as Logger from "./logger";

/**
 * @Notes: Boolean that will enable the ability for
 * the device passcode to be used instead of biometric information.
 * On iOS, the prompt will only be shown after biometrics has failed twice.
 * On Android, the prompt will be shown on the biometric prompt
 * and does not require the user to attempt to use biometrics information first.
 * Note: This feature is not supported on Android versions prior to API 30.
 */
const instance = new ReactNativeBiometrics({ allowDeviceCredentials: true });
// Perform operations as normal
// All prompts will allow for fallback to the device's credentials for authentication

/**
 * Detects what type of biometric sensor is available.
 * Returns a Promise that resolves to an object with details about biometrics availability
 */
const isAvailable = () => {
    return new Promise((resolve, reject) => {
        instance.isSensorAvailable()
            .then((resultObject) => {
                const { available, biometryType } = resultObject

                if (available && biometryType === BiometryTypes.TouchID) {
                    Logger.info('BiometricsUtils', 'TouchID is supported');
                    return resolve({code: 'success', type: 'TouchID', message: 'TouchID is supported', trace: resultObject});
                } else if (available && biometryType === BiometryTypes.FaceID) {
                    Logger.info('BiometricsUtils', 'FaceID is supported');
                    return resolve({code: 'success', type: 'FaceID', message: 'FaceID is supported', trace: resultObject});
                } else if (available && biometryType === BiometryTypes.Biometrics) {
                    Logger.info('BiometricsUtils', 'Biometrics is supported');
                    return resolve({code: 'success', type: 'Fingerprint', message: 'Biometrics is supported', trace: resultObject});
                } else {
                    Logger.info('BiometricsUtils', 'Biometrics not supported');
                    return reject({code: 'error', message: 'Biometrics not supported', trace: resultObject});
                }
            })
            .catch((exception) => {
                return reject({code: 'error', message: 'Biometrics not supported', trace: exception})
            })
    })
}

/**
 * Generates a public private RSA 2048 key pair that will be stored in the device keystore.
 * Returns a Promise that resolves to an object providing details about the keys.
 */
const createBioKey = () => {
    return new Promise((resolve, reject) => {
       instance.createKeys()
           .then((resultObject) => {
               const { publicKey } = resultObject;
               resolve({code: 'success', message: 'Biometrics handled key pair', data: {publicKey}});
           })
           .catch((error) => {
               reject({code: 'error', message: 'Biometrics unhandled key pair', trace: {error}});
           })
    });
}

/**
 * Detects if keys have already been generated and exist in the keystore.
 * Returns a Promise that resolves to an object indicating details about the keys.
 */
const biometricKeysExist = () => {
    return new Promise((resolve, reject) => {
        instance.biometricKeysExist()
            .then((resultObject) => {
                const { keysExist } = resultObject

                if (keysExist) {
                    resolve({code: 'success', message: 'Keys exist'})
                } else {
                    reject({code: 'error', message: 'Keys do not exist or were deleted'})
                }
            })
            .catch((error) => {
                reject({code: 'error', message: 'Biometrics key not found', trace: {error}});
            })
    })
}

/**
 * Deletes the generated keys from the device keystore.
 * Returns a Promise that resolves to an object indicating details about the deletion.
 */
const deleteKeys = () => {
    return new Promise((resolve, reject) => {
        instance.deleteKeys()
            .then((resultObject) => {
                const { keysDeleted } = resultObject

                if (keysDeleted) {
                    resolve({code: 'success', message: 'Successful deletion'})
                } else {
                    reject({code: 'error', message: 'Unsuccessful deletion because there were no keys to delete'})
                }
            })
            .catch((error) => {
                reject({code: 'error', message: 'Biometrics key not deleted', trace: {error}});
            })
    })
}

/**
 * Prompts the user for their fingerprint or face id in order to retrieve the private key
 * from the keystore, then uses the private key to generate a RSA PKCS#1v1.5 SHA 256 signature.
 * Returns a Promise that resolves to an object with details about the signature.
 *
 * **NOTE: No biometric prompt is displayed in iOS simulators when attempting to retrieve
 * keys for signature generation, it only occurs on actual devices.
 * @param message
 * @param payload
 */
const createSignature = (message: string = 'Sign in', payload: string = '') => {
    return new Promise((resolve, reject) => {
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        payload = epochTimeSeconds + '_' + payload;

        instance.createSignature({promptMessage: message, payload})
            .then((resultObject) => {
                const { success, signature } = resultObject

                if (success) {
                    return resolve({code: 'success', message: 'Signature was created', data: {signature, payload}});
                }
                return reject({code: 'error', message: 'Signature was not created'});
            })
            .catch((error) => {
                reject({code: 'error', message: 'Signature was not created', trace: {error}});
            })
    });
}

/**
 * Prompts the user for their fingerprint or face id.
 * Returns a Promise that resolves if the user provides a valid biometrics
 * or cancel the prompt, otherwise the promise rejects.
 *
 * **NOTE: This only validates a user's biometrics.
 * This should not be used to log a user in or authenticate with a server, instead use createSignature.
 * It should only be used to gate certain user actions within an app.
 * @param message
 */
const simplePrompt = (message: string = 'Confirm fingerprint') => {
    return new Promise((resolve, reject) => {
        instance.simplePrompt({promptMessage: message})
            .then((resultObject) => {
                const {success} = resultObject;

                if (success) {
                    return resolve({code: 'success', message: 'Successful biometrics provided'});
                } else {
                    return reject({code: 'error', message: 'User cancelled biometric prompt'});
                }
            })
            .catch(() => {
                return reject({code: 'error', message: 'Biometrics failed'});
            })
    })
}

export {
    instance,
    BiometryTypes,
    isAvailable,
    createBioKey,
    biometricKeysExist,
    deleteKeys,
    createSignature,
    simplePrompt,
}
