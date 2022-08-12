import {createContext} from "react";
import * as React from "react";
import auth from "@react-native-firebase/auth";

const AuthContext = createContext({
    state: {user: {}},
    dispatch: (action: any) => {},
    signIn: (navigation: any, redirectTo: string, user?: any) => {},
    signOut: (navigation: any, redirectTo: string) => {},
    signUp: (navigation: any, redirectTo: string, user?: any) => {},
    restoreUser: (navigation: any, redirectTo: string, user?: any) => {},
});

export const AuthProvider = (props: {children: any}) => {

    const [state, dispatch] = React.useReducer(reducers, initialState);

    const authContext = React.useMemo(
        () => ({
            signIn: async (navigation: any, redirectTo: string = 'App', user: any = {}) => {
                await dispatch({type: 'SIGN_IN', user: user});
                // @ts-ignore
                navigation.reset({index: 0, routes: [{name: redirectTo}]});
                navigation.navigate(redirectTo);
            },
            signOut: async (navigation: any, redirectTo: string = 'Login') => {
                await auth().signOut().then(async () => {
                    await dispatch({type: 'SIGN_OUT', user: {}});
                    // @ts-ignore
                    navigation.reset({index: 0, routes: [{name: redirectTo}]});
                    navigation.navigate(redirectTo);
                })
            },
            signUp: async (navigation: any, redirectTo: string = 'App', user: any = {}) => {
                await dispatch({type: 'SIGN_IN', user: user});
            },
            restoreUser: async (navigation: any, redirectTo: string = 'Login', user: any = {}) => {
                await dispatch({type: 'RESTORE_TOKEN', user: user});
                // @ts-ignore
                navigation.reset({index: 0, routes: [{name: redirectTo}]});
                navigation.navigate(redirectTo);
            }
        }),
        []
    );

    return (
        <AuthContext.Provider value={{state, dispatch, ...authContext}}>
            {props.children}
        </AuthContext.Provider>
    )
}

const initialState = {
    isLoading: true,
    isSignOut: false,
    user: {}
}

const reducers = (prevState: any, action: any) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                user: action.user,
                isLoading: false,
            };
        case 'SIGN_IN':
            return {
                ...prevState,
                isSignOut: false,
                user: action.user,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                isSignOut: true,
                user: {},
            };
    }
}

export default AuthContext;