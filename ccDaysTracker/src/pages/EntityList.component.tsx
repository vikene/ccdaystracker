import { Dialog, Text } from "@rneui/themed";
import { Alert, TouchableOpacity, View } from "react-native";
import agent from "../../agent";
import { useQuery, useQueryClient } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { format, parse } from "date-fns";
import { ERROR_CODES } from "../ErrorCodes/errorCodes";

type Props = {
    navigation: any;
    setHasTokenExpired: any;
};
const EntityList = ({ navigation, setHasTokenExpired }: Props) => {
    const entityListQuery = useQuery(
        'entityList',
        () => agent.TravelLog.getTravelLogs(),
    );
    if (entityListQuery.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        );
    }
    if (entityListQuery.isError) {
        try {
            let message = JSON.parse(JSON.stringify(entityListQuery.error));
            let messageBody = message.response.body;
            if (messageBody.appStatusCode === ERROR_CODES.UnauthorizedException) {
                Alert.alert("Error, unauthorized. Please log in again.");
            }
            if (messageBody.appStatusCode === ERROR_CODES.TokenExpiredException) {
                setHasTokenExpired();
            }
            if (messageBody.appStatusCode === ERROR_CODES.JsonWebTokenException
                || messageBody.appStatusCode === ERROR_CODES.NotBeforeException) {
                setHasTokenExpired();
            }
        }
        catch (e) {
            Alert.alert('Error, unable to reach server. Try again later.');
        }
    }
    if (entityListQuery.isSuccess) {
        let data = JSON.parse(JSON.stringify(entityListQuery.data));
        let events = data["Events"];

        const onEntityItemPress = (TripUniqueId: string) => {
            navigation.navigate('ViewEntry', { TripUniqueId: TripUniqueId });
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                {
                    events.map((item: any) => {
                        let arrivedDate = parse(item.ArrivalInCanadaDate, "yyyy-MM-dd", new Date());
                        let departedDate = undefined;
                        if (item.DepartedCanadaOnDate !== undefined) {
                            departedDate = parse(item.DepartedCanadaOnDate, "yyyy-MM-dd", new Date());
                        }
                        return (
                            <>
                                <TouchableOpacity
                                    onPress={() => onEntityItemPress(item.TripUniqueId)}
                                    key={item.TripUniqueId}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            width: '100%',
                                            gap: 10,
                                            padding: 15
                                        }}
                                        key={item.TripUniqueId}
                                    >
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            width: '100%',
                                        }}>
                                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Days: {item.Days}</Text>
                                            <Text style={{ fontSize: 15, fontWeight: '400', alignSelf: "flex-end", color: "#333" }}>Status: {(item.IsPermanentResident === true) ? "PR" : "TRV"}</Text>
                                        </View>
                                        <Text style={{ fontSize: 15, fontWeight: '400' }}>Arrived: {format(arrivedDate, "MMM dd yyyy")}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '400' }}>Departed: {departedDate !== undefined ? format(departedDate, "MMM dd yyyy") : "N/A"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </>);
                    })
                }

            </SafeAreaView>
        )
    }
}

export default EntityList;