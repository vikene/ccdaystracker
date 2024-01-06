import { Button, Dialog, Divider, FAB, Image, Input, Switch, Tab, TabView } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import agent from '../../agent';
import { useQuery } from 'react-query';

type Props = {
    navigation: any;
};
const ViewEntryScreen = ({ navigation }: Props) => {
    const route: RouteProp<{ params: { TripUniqueId: string } }, 'params'> = useRoute();
    const TripUniqueId: string = route.params.TripUniqueId;
    const viewTripQuery = useQuery('viewTrip', () => { return agent.TravelLog.getTravelLog(TripUniqueId) });
    if (viewTripQuery.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        );
    }
    if (viewTripQuery.isSuccess) {
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
                                Trip #{TripUniqueId.slice(0, 4)}
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
                                Status: {(viewTripQuery.data.IsPermanentResident === true) ? "Permanent resident" : "Temporary resident"}
                            </Text>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '400',
                            }}>
                                Arrived in Canada: {viewTripQuery.data.ArrivalInCanadaDate}
                            </Text>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '400',
                            }}>
                                Departed from Canada: {viewTripQuery.data.DepartedCanadaOnDate}
                            </Text>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '400',
                            }}>
                                Destination: {viewTripQuery.data.Destination}
                            </Text>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '400',
                            }}>
                                Reason: {viewTripQuery.data.Reason}
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
}

export default ViewEntryScreen;