import { Button, Divider, Image, Input, Switch, Tab, TabView } from '@rneui/themed';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';

const SettingsScreen = () => {
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
                    />
                    <Input
                        placeholder="Email"
                        label="Email" />
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
                        <Switch />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default SettingsScreen;