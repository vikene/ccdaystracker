import { Button, Dialog, Divider, Image, Input, Switch, Tab, TabView } from '@rneui/themed';
import React from 'react';
import {
    Alert,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import agent from "../../agent";

type Props = {
    navigation: any;
};
const SettingsScreen = ({ navigation }: Props) => {
    let queryClient = useQueryClient();
    const settingsQuery = useQuery('userInfo', () => agent.User.getCurrentUserInfo());
    if (settingsQuery.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        );
    }
    if (settingsQuery.isError) {
        try {
            let message = JSON.parse(JSON.stringify(settingsQuery.error));
            if (message.message === 'Unauthorized') {
                navigation.navigate('Login');
            }
            return <Text>
                Error: {message.message}
            </Text>
        }
        catch (e) {
            Alert.alert('Error, unable to reach server. Will retry in 5 seconds.');
            setTimeout(() => {
                queryClient.invalidateQueries('userInfo');
            }, 5000);
        }
    }
    if (settingsQuery.isSuccess) {
        return (
            <>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                    }}>
                        <Text style={{
                            fontSize: 26,
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: 30,
                        }}>
                            Settings
                        </Text>
                        <Input
                            placeholder="Full name"
                            label="Full name"
                            value={settingsQuery.data.fullName}
                        />
                        <Input
                            placeholder="Email"
                            label="Email"
                            value={settingsQuery.data.email}
                        />
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignSelf: 'flex-start',
                                marginLeft: 15,
                                gap: 15,
                            }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '600',

                            }}>
                                Permanant resident
                            </Text>
                            <Switch value={settingsQuery.data.IsPermanentResident} />
                        </View>
                    </View>
                </ScrollView>
            </>
        );
    }

}

export default SettingsScreen;