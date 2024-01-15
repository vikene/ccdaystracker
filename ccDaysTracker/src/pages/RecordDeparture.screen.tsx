import { Button, Dialog, FAB, Input, Switch } from "@rneui/themed";
import { useState } from "react";
import { Alert, Dimensions, ScrollView, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { DepartureLogDto } from "../DTOs/incoming/departureLog.dto";
import agent from "../../agent";
import { useMutation, useQueryClient } from "react-query";
const formatDate = (dateValue: Date) => {
    return dateValue.getFullYear() + "-" + ("0" + (dateValue.getMonth() + 1)).slice(-2) + "-" + ("0" + dateValue.getDate()).slice(-2)
}
type Props = {
    navigation: any;
};
const RecordDepartureScreen = ({ navigation }: Props) => {
    let queryClient = useQueryClient();
    const [dateDeparted, setDepartedDate] = useState(new Date())
    const [openDeparted, setDepartedOpen] = useState(false)
    const [dateValue, setDateValue] = useState(formatDate(dateDeparted))
    const [destination, setDestination] = useState('');
    const [reason, setReason] = useState('');
    const handleConfirmDeparted = (date: Date) => {
        setDepartedDate(date);
        setDateValue(formatDate(date));
        setDepartedOpen(false);
    }
    const handleCancelDeparted = () => {
        setDepartedOpen(false);
    }
    let recordDepartureMutation = useMutation({
        mutationFn: (departureDate: DepartureLogDto) => agent.TravelLog.postDepartureLog(departureDate),
    });
    if (recordDepartureMutation.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        )
    }
    if (recordDepartureMutation.isError) {
        let message = JSON.parse(JSON.stringify(recordDepartureMutation.error));
        Alert.alert(message.message);
    }
    if (recordDepartureMutation.isSuccess) {
        Alert.alert('Departure recorded');
        queryClient.invalidateQueries('entityList');
        queryClient.invalidateQueries('eligibleDays');
        recordDepartureMutation.reset();
        navigation.navigate('Home');
    }
    const submitDeparture = () => {
        if (dateValue === '') {
            Alert.alert('Please enter a date');
            return;
        }
        let departureDate: DepartureLogDto = {
            DepartureFromCanadaDate: dateValue,
            Destination: destination,
            ReasonForTravel: reason,
        };
        recordDepartureMutation.mutate(departureDate);
    }
    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginTop: 30,
                    height: Dimensions.get("window").height
                }}>
                    <Input
                        placeholder="mm/dd/yyyy"
                        label="Departed from Canada"
                        onPressIn={(e) => {
                            e.currentTarget.blur();
                            setDepartedOpen(true)
                        }}
                        value={dateValue}
                    />
                    <DatePicker
                        modal
                        open={openDeparted}
                        date={dateDeparted}
                        onConfirm={handleConfirmDeparted}
                        onCancel={handleCancelDeparted}
                        mode="date"
                    />
                    <Input
                        placeholder="Italy"
                        label="Destination (optional)"
                        onChangeText={(e) => setDestination(e)}
                    />
                    <Input
                        placeholder="Touring"
                        label="Reason for travel (optional)"
                        onChangeText={(e) => setReason(e)}
                    />
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Button
                            title="Record Departure"
                            buttonStyle={{
                                backgroundColor: 'black',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{
                                width: 200,
                                marginHorizontal: 150,
                                marginVertical: 10,
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={submitDeparture}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default RecordDepartureScreen;