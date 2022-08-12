import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import MainScreen from "./MainScreen";
import SignUpScreen from "../SignUpScreen";
import SignInScreen from "../SignInScreen";
import AuthLoadingScreen from "../AuthLoadingScreen";

const Stack = createStackNavigator();

const MasterScreen = () => {
    const ref = React.useRef<any>(null);

    return (
        <View style={{flex: 1}}>
            <StatusBar backgroundColor="transparent" hidden={false}/>
            <NavigationContainer ref={ref}>
                <Stack.Navigator initialRouteName="Auth">
                    <Stack.Screen name="Auth" component={AuthLoadingScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Login" component={SignInScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="App" component={MainScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="SignUp" component={SignUpScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );

}

export default MasterScreen;
