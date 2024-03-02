import { Button, Dialog, FAB, Input, Switch } from "@rneui/themed";
import { useState } from "react";
import { Dimensions, ScrollView, Text, View, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import agent from "../../agent";
import { ArrivalLogDto } from "../DTOs/incoming/arrivalLog.dto";
import { useMutation, useQueryClient } from "react-query";
import { ERROR_CODES } from "../ErrorCodes/errorCodes";

type Props = {
    navigation: any;
};
const formatDate = (dateValue: Date) => {
    return dateValue.getFullYear() + "-" + ("0" + (dateValue.getMonth() + 1)).slice(-2) + "-" + ("0" + dateValue.getDate()).slice(-2)
}
const RecordArrivalScreen = ({ navigation }: Props) => {
    const queryClient = useQueryClient();
    const [dateArrived, setArrivedDate] = useState(new Date())
    const [openArrived, setArrivedOpen] = useState(false)
    const [dateValue, setDateValue] = useState(formatDate(dateArrived))
    const [isPermanentResident, setIsPermanentResident] = useState(false)
    const handleConfirmArrived = (date: Date) => {
        setArrivedDate(date)
        setDateValue(formatDate(date))
        setArrivedOpen(false)
    }
    const handleCancelArrived = () => {
        setArrivedOpen(false)
    }
    let recordArrivalMutation = useMutation({
        mutationFn: (arrivalDate: ArrivalLogDto) => agent.TravelLog.postArrivalLog(arrivalDate),
    });
    if (recordArrivalMutation.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        )
    }
    if (recordArrivalMutation.isError) {
        try {
            let message = JSON.parse(JSON.stringify(recordArrivalMutation.error));
            let messageBody = message.response.body;
            if (messageBody.appStatusCode === ERROR_CODES.NoDepartureBetweenTwoArrivalEventException) {
                // two arrival events without a departure event
                Alert.alert(messageBody.message);
                recordArrivalMutation.reset();
            }
            if (messageBody.appStatusCode === ERROR_CODES.UnauthorizedException) {
                Alert.alert("Error, unauthorized. Please log in again.");
                recordArrivalMutation.reset();
                navigation.navigate('Login');
            }
            if (messageBody.appStatusCode === ERROR_CODES.TokenExpiredException) {
                Alert.alert("Error, token expired. Please log in again.");
                recordArrivalMutation.reset();
                navigation.navigate('Login');
            }
            if (messageBody.appStatusCode === ERROR_CODES.JsonWebTokenException
                || messageBody.appStatusCode === ERROR_CODES.NotBeforeException) {
                Alert.alert("Error, token invalid. Please log in again.");
                recordArrivalMutation.reset();
                navigation.navigate('Login');
            }
        }
        catch (err) {
            Alert.alert('Error, unable to reach server. Try again later.');
            recordArrivalMutation.reset();
        }

    }
    if (recordArrivalMutation.isSuccess) {
        Alert.alert('Arrival recorded');
        queryClient.invalidateQueries([
            'entityList'
        ]);
        queryClient.invalidateQueries('eligibleDays');
        recordArrivalMutation.reset();
        navigation.navigate('Home');
    }
    const submitArrival = () => {
        if (dateValue === '') {
            Alert.alert('Please enter a date');
            return;
        }
        let arrivalDate: ArrivalLogDto = {
            ArrivalInCanadaDate: dateValue,
            IsPermanentResident: isPermanentResident,
        }
        recordArrivalMutation.mutate(arrivalDate);
    }

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
                    height: Dimensions.get("window").height
                }}>
                    <Input
                        placeholder="mm/dd/yyyy"
                        label="Arrived in Canada"
                        onPressIn={(e) => {
                            e.currentTarget.blur();
                            setArrivedOpen(true)
                        }}
                        value={dateArrived.toDateString()}
                    />
                    <DatePicker
                        modal
                        open={openArrived}
                        date={dateArrived}
                        onConfirm={handleConfirmArrived}
                        onCancel={handleCancelArrived}
                        mode="date"
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
                        <Switch value={isPermanentResident} onValueChange={(status) => setIsPermanentResident(status)} />
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Button
                            title="Record Arrival"
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
                            onPress={submitArrival}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
export default RecordArrivalScreen;