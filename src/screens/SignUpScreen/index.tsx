import React, {useState} from 'react';
import {Button, StatusBar, StyleSheet, Text, TextInput, View} from "react-native";
import AuthContext from "../../AuthContext";

function SignUpScreen(props: { navigation: any }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<any>(null);
    const {signUp} = React.useContext(AuthContext);

    const handleSignUp = () => {
        // TODO: Firebase stuff...
        setMessage('handleSignUp');
        signUp(props.navigation, 'App');
    }

    const handlePressLogin = () => {
        props.navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFF" />
            <Text style={{color: '#000'}}>Sign Up</Text>
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
            />
            <Text style={{margin: 5, color: 'red' }}>
                {message}
            </Text>
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <View style={{marginRight: 10}}>
                    <Button title="Sign Up" onPress={handleSignUp} />
                </View>
                <View>
                    <Button title="Already have an account? Login" onPress={handlePressLogin}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        color: '#000',
        borderRadius: 20,
    }
})

export default SignUpScreen;
