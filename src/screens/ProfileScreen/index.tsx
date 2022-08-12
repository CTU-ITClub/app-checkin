import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import * as Logger from '../../utils/logger';
import Icons from "../../components/Icons";
import Backdrop from "../../components/Backdrop";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import {isEmpty, showSnackBar} from "../../utils/utils";
import storage from "../../utils/storage";
import {DEFAULT_TIMEOUT} from "../../constants/common";
import * as Geolocation from "../../utils/geolocation";

const ProfileScreen = (props: { navigation: any }) => {

    const {user, authLoading, setAuthLoading, handleLogout} = useAuth({navigation: props.navigation});
    const [avatar, setAvatar] = useState<any>(require('../../images/default-personal-avatar.png'));

    const handlePressItem = (item: any) => {
        Logger.info('ProfileScreen', 'Handle press item: ', item)
        item.onPress();
    }

    const freeUpSpace = async () => {
        setAuthLoading(true);
        storage.clearMap().then(() => {
            Logger.info('SettingsScreen', 'Free up space success');
        }).catch((error: any) => {
            Logger.error('SettingsScreen', 'Free up space error', error);
        });
        setTimeout(() => {
            showSnackBar('Free up space success')
            setAuthLoading(false);
        }, DEFAULT_TIMEOUT);
    }

    const getPosition = async () => {
        setAuthLoading(true);
        await Geolocation.getCurrentLocation()
            .then((result: any) => {
                // setPosition(result.data?.location);
                const {latitude, longitude} = result.data?.location || {latitude: 0, longitude: 0};
                showSnackBar(`Lat/Long: ${latitude}/${longitude}`);
            })
            .catch((error: any) => {
                showSnackBar(error.message, 'red');
            })
            .finally(() => {
                setAuthLoading(false);
            })
    }

    const handlePressLogout = () => {
        handleLogout(user);
    }

    const getDisplayName = (user: any = {}) => {
        const {displayName, email, phone, uid} = user;
        return !isEmpty(displayName) ? displayName : !isEmpty(email) ? email : !isEmpty(phone) ? phone : uid;
    }

    useEffect(() => {
        // @ts-ignore
        const {photoURL} = user;
        if (!isEmpty(photoURL)) {
            setAvatar({uri: photoURL});
        }
    }, [user]);

    return (
        <>
            {
                authLoading && <Backdrop>
					<Loading/>
				</Backdrop>
            }
            <View>
                <View style={styles.avatarView}>
                    <Image source={avatar} style={styles.avatarImage}/>
                    <Text style={styles.text}>{getDisplayName(user)}</Text>
                </View>
                <FlatList
                    data={[
                        {
                            key: 'storage',
                            label: 'Free up space',
                            icon: {name: 'storage', type: 'MaterialIcons'},
                            onPress: freeUpSpace
                        },
                        {
                            key: 'location',
                            label: 'Get position',
                            icon: {name: 'location-arrow', type: 'FontAwesome'},
                            onPress: getPosition
                        },
                        {
                            key: 'sign_out',
                            label: 'Sign Out',
                            subLabel: '',
                            icon: {name: 'sign-out', type: 'Octicons'},
                            onPress: handlePressLogout
                        },
                    ]}
                    renderItem={({item}) => (
                        <View
                            style={{...styles.itemBorder, ...styles.contentInline, justifyContent: 'space-between'}}
                            onTouchStart={() => handlePressItem(item)}
                        >
                            <View style={styles.contentInline}>
                                <View style={{width: 30}}>
                                    <Icons size={24} name={item.icon.name} type={item.icon.type}/>
                                </View>
                                <Text style={styles.text}>{item.label}</Text>
                            </View>
                            <View style={styles.contentInline}>
                                <Text style={{...styles.text, opacity: 0.6, fontStyle: 'italic'}}>
                                    {item.subLabel}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    avatarView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 100
    },
    itemBorder: {
        backgroundColor: '#FFF',
        borderColor: '#000',
        margin: 1,
    },
    text: {
        fontSize: 18,
        color: '#000',
        marginLeft: 5,
        marginRight: 5
    },
    contentInline: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    }
});

export default ProfileScreen;