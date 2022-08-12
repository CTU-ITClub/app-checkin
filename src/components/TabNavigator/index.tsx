import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from "../Icons";

const Tab = createBottomTabNavigator();

function TabNavigator(props: any) {

    const {routes} = props;

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => iconForRoute(route, color, size),
                ...TabNavigatorOptions, title: route.name
            })}
        >
            {
                routes?.length > 0 && routes.map((route: any, index: number) => (
                    <Tab.Screen key={index} name={route.screen} component={route.render}/>
                ))
            }
        </Tab.Navigator>
    );
}

const TabNavigatorOptions = {
    headerShown: true,
    tabBarStyle: {backgroundColor: 'white'},
    tabBarActiveTintColor: 'black',
    unmountOnBlur: true
}

const iconForRoute = (route: any, color: string, size: number) => {
    let icons = {iconName: 'question', type: 'SimpleLineIcons'}
    switch (route.name) {
        case 'Home':
            icons = {iconName: 'home', type: 'Octicons'};
            break;
        case 'My Day':
            icons = {iconName: 'account-group-outline', type: 'MaterialCommunityIcons'};
            break;
        case 'Work':
            icons = {iconName: 'work-outline', type: 'MaterialIcons'};
            break;
        case 'Contact':
            icons = {iconName: 'list', type: 'Feather'};
            break;
        case 'Profile':
            icons = {iconName: 'account-settings-outline', type: 'MaterialCommunityIcons'};
            break;
        default:
            break;
    }
    return <Icons name={icons.iconName} size={size} color={color} type={icons.type}/>;
}

export default TabNavigator;
