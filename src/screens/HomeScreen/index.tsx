import React, {useEffect, useState} from "react";
import {FlatList, StatusBar, StyleSheet, Text, View} from "react-native";
import auth from '@react-native-firebase/auth';
import Loading from "../../components/Loading";
// import AuthContext from "../../AuthContext";
// import * as Logger from "../../utils/logger";
// import * as Biometrics from "../../utils/biometrics";
// import {showSnackBar} from "../../utils/utils";
// import {postRequest} from "../../utils/api";
// import Backdrop from "../../components/Backdrop";
import useAuth from "../../hooks/useAuth";
import Swipeable from 'react-native-gesture-handler/Swipeable';

const todoList = [
    { id: '1', text: 'Learn JavaScript' },
    { id: '2', text: 'Learn React' },
    { id: '3', text: 'Learn TypeScript' },
];
const Separator = () => <View style={styles.itemSeparator} />;
const LeftSwipeActions = () => {
    return (
        <View
            style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
        >
            <Text
                style={{
                    color: '#40394a',
                    fontWeight: '600',
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                }}
            >
                Bookmark
            </Text>
        </View>
    );
};
const rightSwipeActions = () => {
    return (
        <View
            style={{
                backgroundColor: '#ff8303',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            <Text
                style={{
                    color: '#1b1a17',
                    paddingHorizontal: 30,
                    fontWeight: '600',
                    paddingVertical: 20,
                }}
                onPress={() => console.log('Deleted')}
            >
                Delete
            </Text>
        </View>
    );
};
const swipeFromLeftOpen = () => {
    console.log('Swipe from left');
};
const swipeFromRightOpen = () => {
    console.log('Swipe from right');
};
const ListItem = ({ text }) => (
    <Swipeable
        renderLeftActions={LeftSwipeActions}
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={swipeFromRightOpen}
        onSwipeableLeftOpen={swipeFromLeftOpen}
    >
        <View
            style={{
                paddingHorizontal: 30,
                paddingVertical: 20,
                backgroundColor: 'white',
            }}
        >
            <Text style={{ fontSize: 24 }} style={{ fontSize: 20 }}>
                {text}
            </Text>
        </View>
    </Swipeable>
);
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
                {/*<Text style={styles.text}>Welcome {user?.providerData[0]?.email}</Text>*/}
                <Text style={{ textAlign: 'center', marginVertical: 20 }}>
                    Welcome {user?.providerData[0]?.email}. Swipe right or left
                </Text>
                <FlatList
                    data={todoList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ListItem {...item} />}
                    ItemSeparatorComponent={() => <Separator />}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    text: {
        color: '#000',
        margin: 5,
    },
    itemSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
    },
})

export default HomeScreen;
