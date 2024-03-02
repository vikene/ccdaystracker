import { RouteProp, useRoute } from '@react-navigation/native';
import { Button, Dialog, Input, Switch } from '@rneui/themed';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    Text,
    View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { UpdateTravelLogDto } from '../DTOs/incoming/updateTravelLog.dto';
import { useMutation, useQueryClient } from 'react-query';
import agent from "../../agent";
import { ERROR_CODES } from '../ErrorCodes/errorCodes';
import { format, parse } from 'date-fns';

type Props = {
    navigation: any;
};
const formatDate = (dateValue: Date) => {
    return dateValue.getFullYear() + "-" + ("0" + (dateValue.getMonth() + 1)).slice(-2) + "-" + ("0" + dateValue.getDate()).slice(-2)
}
const EditEntityScreen = ({ navigation }: Props) => {
    const route: RouteProp<{ params: { TripUniqueId: string, data: any } }, 'params'> = useRoute();
    let queryClient = useQueryClient();
    const [dateArrived, setArrivedDate] = useState(parse(route.params.data.ArrivalInCanadaDate, "yyyy-MM-dd", new Date()));
    const [openArrived, setArrivedOpen] = useState(false)
    const [dateDeparted, setDepartedDate] = useState(route.params.data.DepartedCanadaOnDate !== undefined ? parse(route.params.data.DepartedCanadaOnDate, "yyyy-MM-dd", new Date()) : "N/A")
    const [openDeparted, setDepartedOpen] = useState(false)
    const [destination, setDestination] = useState(route.params.data.Destination)
    const [reason, setReason] = useState(route.params.data.ReasonForTravel)
    const [isPermanentResident, setIsPermanentResident] = useState(route.params.data.IsPermanentResident)
    const [tripUniqueId, _] = useState(route.params.TripUniqueId)

    const handleConfirmArrived = (date: Date) => {
        setArrivedDate(date)
        setArrivedOpen(false)
    }
    const handleCancelArrived = () => {
        setArrivedOpen(false)
    }
    let updateTravelLogMutation = useMutation({
        mutationFn: (updateTravelLog: UpdateTravelLogDto) => agent.TravelLog.updateTravelLog(updateTravelLog.TripUniqueId, updateTravelLog),
    });
    const handleConfirmDeparted = (date: Date) => {
        setDepartedDate(date)
        setDepartedOpen(false)
    }
    const handleCancelDeparted = () => {
        setDepartedOpen(false)
    }
    const updateTrip = () => {
        if (dateArrived === null || dateDeparted === null) {
            Alert.alert('Please enter a date');
            return;
        }
        if (dateArrived === undefined || dateDeparted === undefined) {
            Alert.alert('Please enter a date');
            return;
        }
        if (dateArrived > dateDeparted) {
            Alert.alert('Arrival date cannot be after departure date');
            return;
        }

        let trip: UpdateTravelLogDto = {
            TripUniqueId: tripUniqueId,
            ArrivedInCanadaOn: formatDate(dateArrived),
            DepartedCanadaOn: typeof dateDeparted !== "string" ? formatDate(dateDeparted) : undefined,
            Destination: destination,
            ReasonForTravel: reason,
            IsPermanentResident: isPermanentResident,
        }
        updateTravelLogMutation.mutate(trip);
    }
    if (updateTravelLogMutation.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        )
    }
    if (updateTravelLogMutation.isError) {
        try {
            let message = JSON.parse(JSON.stringify(updateTravelLogMutation.error));
            let messageBody = message.response.body;
            if (messageBody.appStatusCode === ERROR_CODES.ArrivalEventOverlapsException) {
                Alert.alert("Error, arrival event overlaps with another travel log.");
                updateTravelLogMutation.reset();
            }
            if (messageBody.appStatusCode === ERROR_CODES.DepartureEventOverlapsException) {
                Alert.alert("Error, departure event overlaps with another travel log.");
                updateTravelLogMutation.reset();
            }
            if (messageBody.appStatusCode === ERROR_CODES.UpdateTravelLogException) {
                Alert.alert("Failed to update travel log. We are working to resolve this issue.");
                updateTravelLogMutation.reset();
            }
            if (messageBody.appStatusCode === ERROR_CODES.UnauthorizedException) {
                Alert.alert("Error, unauthorized. Please log in again.");
                updateTravelLogMutation.reset();
                queryClient.invalidateQueries('authenticationState');
            }
            if (messageBody.appStatusCode === ERROR_CODES.TokenExpiredException) {
                Alert.alert("Error, token expired. Please log in again.");
                updateTravelLogMutation.reset();
                queryClient.invalidateQueries('authenticationState');
            }
            if (messageBody.appStatusCode === ERROR_CODES.JsonWebTokenException
                || messageBody.appStatusCode === ERROR_CODES.NotBeforeException) {
                Alert.alert("Error, token invalid. Please log in again.");
                updateTravelLogMutation.reset();
                queryClient.invalidateQueries('authenticationState');
            }
            if (messageBody !== undefined) {
                Alert.alert("Unknown error has occured. Please try again later.");
            }
        }
        catch (e) {
            Alert.alert('Error, unable to reach server. Try again later.');
        }
        finally {
            updateTravelLogMutation.reset();
        }
    }
    if (updateTravelLogMutation.isSuccess) {
        Alert.alert('Trip updated');
        updateTravelLogMutation.reset();
        queryClient.invalidateQueries('entityList');
        queryClient.invalidateQueries('eligibleDays');
        navigation.navigate('Home');
    }
    let departureDate: Date;
    if (dateDeparted === "N/A" || typeof dateDeparted === "string") {
        departureDate = new Date();
    }
    else {
        departureDate = dateDeparted;
    }

    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 30,
                    height: Dimensions.get("window").height
                }}>
                    <Input
                        placeholder="mm/dd/yyyy"
                        label="Arrived in Canada"
                        onPressIn={(e) => {
                            e.currentTarget.blur();
                            setArrivedOpen(true)
                        }}
                        value={format(dateArrived, 'MMM dd, yyyy')}
                    />
                    <DatePicker
                        modal
                        open={openArrived}
                        date={dateArrived}
                        onConfirm={handleConfirmArrived}
                        onCancel={handleCancelArrived}
                        mode='date'
                    />
                    <Input
                        placeholder="mm/dd/yyyy"
                        label="Departed from Canada"
                        onPressIn={(e) => {
                            e.currentTarget.blur();
                            setDepartedOpen(true)
                        }}
                        value={dateDeparted === "N/A" ? "N/A" : format(dateDeparted, 'MMM dd, yyyy')}
                    />
                    <DatePicker
                        modal
                        open={openDeparted}
                        date={departureDate}
                        onConfirm={handleConfirmDeparted}
                        onCancel={handleCancelDeparted}
                        mode='date'
                    />
                    <Input
                        placeholder="Italy"
                        label="Destination"
                        value={destination}
                        onChangeText={(text) => setDestination(text)}
                    />
                    <Input
                        placeholder="Touring"
                        label="Reason for travel"
                        value={reason}
                        onChangeText={(text) => setReason(text)}
                    />
                    <View
                        style={{
                            flex: 0.25,
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
                        <Switch
                            value={isPermanentResident}
                            onValueChange={(value) => setIsPermanentResident(value)}
                        />
                    </View>
                    <Button
                        title="Update Trip"
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
                        onPress={updateTrip}
                    />
                </View>
            </ScrollView>
        </>
    );
}

export default EditEntityScreen;