import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import {StatusBar} from "react-native";
import EmptyScreen from "../../components/EmptyScreen";

const TopTab = createMaterialTopTabNavigator();

const MyDayScreen = () => {

    return (
        <>
            <StatusBar backgroundColor="#FFF" />
            <TopTab.Navigator>
                <TopTab.Screen name="News" component={EmptyScreen} />
                <TopTab.Screen name="Groups" component={EmptyScreen} />
                <TopTab.Screen name="Events" component={EmptyScreen} />
            </TopTab.Navigator>
        </>
    );
}

export default MyDayScreen;