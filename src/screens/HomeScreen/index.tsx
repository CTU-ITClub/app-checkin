import React, {useEffect, useState} from "react";
import {StatusBar, StyleSheet, Text, View} from "react-native";
import auth from '@react-native-firebase/auth';
import Loading from "../../components/Loading";
import AuthContext from "../../AuthContext";
import * as Logger from "../../utils/logger";
import * as Biometrics from "../../utils/biometrics";
import {showSnackBar} from "../../utils/utils";
import {postRequest} from "../../utils/api";
import Backdrop from "../../components/Backdrop";
import useAuth from "../../hooks/useAuth";

function HomeScreen(props: { navigation: any }) {

    const authDriven = useAuth({navigation: props.navigation});
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<any>({});

    // Handle user state changes
    const onAuthStateChanged = async (user: any) => {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return <Loading />;
    }

    return (
        <>
            <StatusBar backgroundColor="#FFF" />
            <View style={styles.container}>
                <Text style={styles.text}>Welcome {user?.providerData[0]?.email}</Text>
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

export default HomeScreen;
