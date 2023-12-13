import { Button, Divider, FAB, Image, Input, Switch, Tab, TabView } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    View,
} from 'react-native';

type Props = {
    navigation: any;
};
const ViewEntryScreen = ({ navigation }: Props) => {
    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Dimensions.get("window").height
                }}>
                    <View style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 200,
                    }}>
                        <Icon
                            name="arrow-left"
                            size={30}
                            color="black"
                        />
                        <Text style={{
                            fontSize: 26,
                            fontWeight: '600',
                            textAlign: 'center'
                        }}>
                            Trip #1
                        </Text>
                    </View>
                    <View style={{
                        flex: 0.8,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: 'flex-start',
                        marginLeft: 15,
                        gap: 15,
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '400',
                            }}
                        >
                            Status: Permanant Resident
                        </Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '400',
                        }}>
                            Arrived in Canada: 20 Feb 2022
                        </Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '400',
                        }}>
                            Departed from Canada: 20 Feb 2022
                        </Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '400',
                        }}>
                            Destination: USA
                        </Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '400',
                        }}>
                            Reason: For work at Bellingham
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignSelf: 'flex-end',
                            }}
                        >
                            <Button
                                onPress={() => { }}
                                type="clear"
                            >
                                Edit
                            </Button>
                            <Button
                                type="clear"
                                onPress={() => { }}>
                                Delete
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default ViewEntryScreen;