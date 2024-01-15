import { Dialog, Text } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import agent from "../../agent";
import { useQuery } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
type Props = {
    navigation: any;
};
const EntityList = ({ navigation }: Props) => {
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
    if (entityListQuery.isSuccess) {
        let data = JSON.parse(JSON.stringify(entityListQuery.data));
        let events = data["Events"];

        const onEntityItemPress = (TripUniqueId: string) => {
            console.log(TripUniqueId);
            navigation.navigate('ViewEntry', { TripUniqueId: TripUniqueId });
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                {
                    events.map((item: any) => {
                        return (
                            <>
                                <TouchableOpacity
                                    onPress={() => onEntityItemPress(item.TripUniqueId)}
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
                                        <Text style={{ fontSize: 15, fontWeight: '400' }}>Arrived: {item.ArrivalInCanadaDate}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '400' }}>Departed: {item.DepartedCanadaOnDate}</Text>

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