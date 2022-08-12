import React, {useContext, useEffect} from 'react';
import SplashView from "../../components/SplashView";
import AuthContext from "../../AuthContext";
import auth from "@react-native-firebase/auth";
import {isEmpty} from "../../utils/utils";
import {DEFAULT_TIMEOUT} from "../../constants/common";

const AuthLoadingScreen = (props: { navigation: any, callback?: any }) => {

    const {restoreUser} = useContext(AuthContext);

    // Handle user state changes
    const onAuthStateChanged = (user: any) => {
        const delaySplashScreen = setTimeout(async () => {
            restoreUser(props.navigation, isEmpty(user) ? 'Login' : 'App', user);
        }, DEFAULT_TIMEOUT);

        return () => clearTimeout(delaySplashScreen);
    }

    useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, []);

    return <SplashView/>;
}

export default AuthLoadingScreen;