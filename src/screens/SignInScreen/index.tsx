import React, {useEffect, useState} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as Logger from '../../utils/logger';
import {isEmpty, showSnackBar} from "../../utils/utils";
import Backdrop from "../../components/Backdrop";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import TouchableButton from "../../components/TouchableButton";
import {userWhitelist} from "../../constants/whitelist";

GoogleSignin.configure({
    webClientId: '631195338471-ca6oqe7qkip94itp9fsal7lu1eii4ajm.apps.googleusercontent.com',
});

const SignInScreen = (props: { navigation: any }) => {

    const {handleLogin, handleLogout, authLoading, setAuthLoading} = useAuth({navigation: props.navigation});
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);

    const handleAuthError = (error: any) => {
        setAuthLoading(false);
        Logger.error('LoginScreen', 'error', {error, code: error.code, message: error.message})
        if (['auth/email-already-in-use'].includes(error.code)) {
            showSnackBar('That email address is already in use!', 'red');
            return;
        }
        if (['auth/invalid-email'].includes(error.code)) {
            showSnackBar('That email address is invalid!', 'red');
            return;
        }
        if (['auth/user-not-found'].includes(error.code)) {
            showSnackBar('Identifier not found. The user may have been deleted!', 'red');
            return;
        }

        if (['auth/invalid-credential'].includes(error.code)) {
            showSnackBar('The supplied auth credential is malformed or has expired.', 'red');
            return;
        }

        showSnackBar(`Login fail with error: ${error.message}`, 'red');
    }

    const handleGoogleSignIn = () => {
        setAuthLoading(true);
        return onGoogleButtonPress().then(() => {
            Logger.info('LoginScreen', 'Signed in with Google!');
        }).catch(handleAuthError)
    }

    // Handle user state changes
    const onAuthStateChanged = async (user: any) => {
        Logger.info('LoginScreen', 'User changed', user?.uid);
        if (initializing) {
            setInitializing(false);
            if (!isEmpty(user)) {
                const {email} = user?.providerData[0];
                if (!userWhitelist.includes(email)) {
                    console.log('User not permit');
                    showSnackBar('Tài khoản chưa được cấp phép!', 'red')
                    auth().currentUser?.delete();
                    handleLogout();
                    return;
                }
                handleLogin(user);
            }
        }
    }

    const onGoogleButtonPress = async () => {
        // Get the users ID token
        const {idToken} = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }



    useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, []);

    return (
        <>
            <StatusBar backgroundColor="#FFF"/>
            {
                authLoading && <Backdrop>
					<Loading/>
				</Backdrop>
            }
            <View style={{...styles.container, backgroundColor: '#FFF'}}>
                <Image source={require('../../images/circle-itclub-logo-v2.png')} style={styles.logo}/>

                <TouchableButton
                    title="Đăng nhập bằng Google"
                    style={{width: '90%'}}
                    iconName="google"
                    iconType="FontAwesome"
                    onPress={handleGoogleSignIn}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10
    },
    text: {
        color: '#000',
        marginLeft: 5,
        marginRight: 5
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        margin: 20,
        color: '#000',
        borderRadius: 20
    },
    contentInline: {
        margin: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})

export default SignInScreen;
