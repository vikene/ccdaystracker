import { RouteProp, useRoute } from '@react-navigation/native';
import { Button, Divider, FAB, Image, Input, Switch, Tab, TabView } from '@rneui/themed';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

type Props = {
    navigation: any;
};
const EditEntityScreen = ({ navigation }: Props) => {
    const route: RouteProp<{ params: { TripUniqueId: string, data: any } }, 'params'> = useRoute();
    const [dateArrived, setArrivedDate] = useState(new Date(Date.parse(route.params.data.ArrivalInCanadaDate)));
    const [openArrived, setArrivedOpen] = useState(false)
    const handleConfirmArrived = (date: Date) => {
        setArrivedDate(date)
        setArrivedOpen(false)
    }
    const handleCancelArrived = () => {
        setArrivedOpen(false)
    }

    const [dateDeparted, setDepartedDate] = useState(new Date(Date.parse(route.params.data.DepartedCanadaOnDate)))
    const [openDeparted, setDepartedOpen] = useState(false)
    const [destination, setDestination] = useState(route.params.data.Destination)
    const [reason, setReason] = useState(route.params.data.ReasonForTravel)
    const [isPermanentResident, setIsPermanentResident] = useState(route.params.data.IsPermanentResident)
    const [tripUniqueId, _] = useState(route.params.TripUniqueId)
    const handleConfirmDeparted = (date: Date) => {
        setDepartedDate(date)
        setDepartedOpen(false)
    }
    const handleCancelDeparted = () => {
        setDepartedOpen(false)
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
                        value={dateArrived.toDateString()}
                    />
                    <DatePicker
                        modal
                        open={openArrived}
                        date={dateArrived}
                        onConfirm={handleConfirmArrived}
                        onCancel={handleCancelArrived}
                    />
                    <Input
                        placeholder="mm/dd/yyyy"
                        label="Departed from Canada"
                        onPressIn={(e) => {
                            e.currentTarget.blur();
                            setDepartedOpen(true)
                        }}
                        value={dateDeparted.toDateString()}
                    />
                    <DatePicker
                        modal
                        open={openDeparted}
                        date={dateDeparted}
                        onConfirm={handleConfirmDeparted}
                        onCancel={handleCancelDeparted}
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
                </View>
            </ScrollView>
        </>
    );
}

export default EditEntityScreen;