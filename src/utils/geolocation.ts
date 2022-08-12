/**
 * https://www.npmjs.com/package/react-native-get-location (React Native >= 0.60.0; iOS >= 9.0)
 * @install: yarn add react-native-get-location / npm i -S react-native-get-location
 * @android post install: update AndroidManifest.xml
 * <!-- Define ACCESS_FINE_LOCATION if you will use enableHighAccuracy=true  -->
 * <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
 *
 * <!-- Define ACCESS_COARSE_LOCATION if you will use enableHighAccuracy=false  -->
 * <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
 * @iOS post install: update Info.plist (default is enabled when you create a project with react-native init)
 * <key>NSLocationWhenInUseUsageDescription</key>
 * <string>This app needs to get your location...</string>
 */
import GetLocation from 'react-native-get-location';

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                resolve({code: 'success', message: 'Get current location success', data: {location}});
            })
            .catch(error => {
                const { code, message } = error;
                reject({code: 'error', message: 'Get current location fail', data: {code, message}});
            })
    })
}

export {
    getCurrentLocation,
}
