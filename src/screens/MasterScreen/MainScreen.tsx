import * as React from 'react';
import HomeScreen from "../HomeScreen";
import TabNavigator from "../../components/TabNavigator";
import {StatusBar} from "react-native";
import ProfileScreen from "../ProfileScreen";
import {GestureHandlerRootView} from "react-native-gesture-handler";
// import MyDayScreen from "../MyDayScreen";

const MainScreen = () => {

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar backgroundColor="#FFF" hidden={false} animated={true} />
            <TabNavigator routes={[
                {screen: 'Home', render: HomeScreen},
                // {screen: 'My Day', render: MyDayScreen},
                {screen: 'Profile', render: ProfileScreen}
            ]}/>
        </GestureHandlerRootView>
    );
}

export default MainScreen;
