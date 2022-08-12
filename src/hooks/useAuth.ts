import {useContext, useState} from 'react';
import * as Logger from "../utils/logger";
import AuthContext from "../AuthContext";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

const useAuth = (initialState: { navigation: any }) => {

    const {navigation} = initialState;
    // Set an initializing state whilst Firebase connects
    const [authLoading, setAuthLoading] = useState(false);
    const {state, signIn, signOut} = useContext(AuthContext);

    const handleLogin = async (user: any = {}) => {
        setAuthLoading(true);
        console.log(JSON.stringify(user));
        await signIn(navigation, 'App', user);
        setAuthLoading(false);
    }

    const handleLogout = () => {
        setAuthLoading(true);
        GoogleSignin.revokeAccess().finally(() => {
            signOut(navigation, 'Login');
            setAuthLoading(false);
        })
    }

    return {handleLogin, handleLogout, authLoading, setAuthLoading, user: state.user || {}}
}

export default useAuth;