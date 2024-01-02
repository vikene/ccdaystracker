import { Button, Divider, FAB, Image, Input, Switch, Tab, TabView } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type Props = {
    navigation: any;
};
const ViewEntryScreen = ({ navigation }: Props) => {
    const route: RouteProp<{ params: { TripUniqueId: string } }, 'params'> = useRoute();
    const TripUniqueId: string = route.params.TripUniqueId;
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
                        flex: 0.1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: Dimensions.get("window").width,
                        flexDirection: 'row',
                    }}>
                        <Icon
                            name="arrow-left"
                            size={30}
                            color="black"
                            style={{
                                position: 'absolute',
                                left: 10,
                            }}
                            onPress={() => { navigation.goBack() }}
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
                        flex: 0.9,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: 'flex-start',
                        marginLeft: 15,
                        gap: 15,
                        marginTop: 30,
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