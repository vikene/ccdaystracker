import { Button, Dialog, Divider, FAB, Image, Input, Switch, Tab, TabView } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import agent from '../../agent';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ERROR_CODES } from '../ErrorCodes/errorCodes';

type Props = {
    navigation: any;
};
const ViewEntryScreen = ({ navigation }: Props) => {
    const route: RouteProp<{ params: { TripUniqueId: string } }, 'params'> = useRoute();
    let queryClient = useQueryClient();
    const TripUniqueId: string = route.params.TripUniqueId;
    navigation.setOptions({
        title: `Trip #${TripUniqueId.slice(0, 4)}`
    });
    const viewTripQuery = useQuery('viewTrip', () => { return agent.TravelLog.getTravelLog(TripUniqueId) });
    const deleteTripMutation = useMutation('deleteTrip', {
        mutationFn: (travelId: string) => agent.TravelLog.deleteTravelLog(travelId),
    });
    if (deleteTripMutation.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        );
    }
    if (deleteTripMutation.isError) {
        try {
            let message = JSON.parse(JSON.stringify(deleteTripMutation.error));
            let messageBody = message.response.body;
            if (messageBody.appStatusCode === ERROR_CODES.TravelLogNotFoundException) {
                // two arrival events without a departure event
                Alert.alert("Trip not found");
                deleteTripMutation.reset();
                queryClient.invalidateQueries(['entityList']);
                queryClient.invalidateQueries(['eligibleDays']);
                navigation.navigate('Home');
            }
            if (messageBody.appStatusCode === ERROR_CODES.UnableToDeleteTravelLogException) {
                Alert.alert(messageBody.message);
                deleteTripMutation.reset();
            }
        }
        catch (e) {
            Alert.alert('Unknown error has occured. Please try again later.');
            deleteTripMutation.reset();
        }
    }
    if (deleteTripMutation.isSuccess) {
        Alert.alert('Trip deleted');
        queryClient.invalidateQueries(['entityList']);
        queryClient.invalidateQueries(['eligibleDays']);
        deleteTripMutation.reset();
        navigation.navigate('Home');
    }
    if (viewTripQuery.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        );
    }
    if (viewTripQuery.isError) {
        try {
            let message = JSON.parse(JSON.stringify(viewTripQuery.error));
            let messageBody = message.response.body;
            if (messageBody.appStatusCode === ERROR_CODES.TravelLogNotFoundException) {
                // two arrival events without a departure event
                Alert.alert("Trip not found");
                queryClient.invalidateQueries(['entityList']);
                queryClient.invalidateQueries(['eligibleDays']);
                navigation.navigate('Home');
            }
        }
        catch (e) {
            Alert.alert('Unknown error has occured. Please try again later.');
        }
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
                            flex: 0.9,
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
                                    flexDirection: 'column',
                                    alignSelf: 'center',
                                }}
                            >
                                <Button
                                    title="Edit Trip"
                                    buttonStyle={{
                                        backgroundColor: 'black',
                                        borderWidth: 2,
                                        borderColor: 'white',
                                        borderRadius: 30,
                                    }}
                                    containerStyle={{
                                        width: 200,
                                        marginHorizontal: 50,
                                        marginVertical: 10,
                                    }}
                                    titleStyle={{ fontWeight: 'bold' }}
                                />
                                <Button
                                    title="Delete Trip"
                                    buttonStyle={{
                                        backgroundColor: 'red',
                                        borderWidth: 2,
                                        borderColor: 'white',
                                        borderRadius: 30,
                                    }}
                                    containerStyle={{
                                        width: 200,
                                        marginHorizontal: 50,
                                        marginVertical: 10,
                                    }}
                                    titleStyle={{ fontWeight: 'bold' }}
                                    onPress={() => {
                                        deleteTripMutation.mutate(TripUniqueId);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </>
        );
    }
}

export default ViewEntryScreen;