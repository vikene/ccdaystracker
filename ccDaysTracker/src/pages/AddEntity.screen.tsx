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
const AddEntityScreen = ({ navigation }: Props) => {
    const [dateArrived, setArrivedDate] = useState(new Date())
    const [openArrived, setArrivedOpen] = useState(false)
    const handleConfirmArrived = (date: Date) => {
        setArrivedDate(date)
        setArrivedOpen(false)
    }
    const handleCancelArrived = () => {
        setArrivedOpen(false)
    }

    const [dateDeparted, setDepartedDate] = useState(new Date())
    const [openDeparted, setDepartedOpen] = useState(false)
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    height: Dimensions.get("window").height
                }}>
                    <Text style={{
                        fontSize: 26,
                        fontWeight: '600',
                        textAlign: 'center',
                        marginBottom: 30,
                    }}>
                        Add Entry
                    </Text>

                    <Input
                        placeholder="mm/dd/yyyy"
                        label="Arrived in Canada"
                        onPressIn={(e) => {
                            e.currentTarget.blur();
                            setArrivedOpen(true)
                        }}
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
                    />
                    <Input
                        placeholder="Touring"
                        label="Reason for travel"

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
                        <Switch />
                    </View>
                    <FAB
                        visible={true}
                        onPress={() => { navigation.navigate('AddEntity') }}
                        placement="right"
                        title="Add Entry"
                        icon={{ name: 'edit', color: 'white' }}
                        color="red"
                        style={{
                            position: 'absolute',
                            bottom: 60,
                            right: 10,
                        }}
                    />
                </View>
            </ScrollView>
        </>
    );
}

export default AddEntityScreen;