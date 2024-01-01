import { Button, Divider, Image, Input, Tab, TabView } from '@rneui/themed';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import EntityList from './EntityList.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import agent from '../../agent';
import { Dialog } from '@rneui/base';
type Props = {
    navigation: any;
};
const DashboardScreen = ({ navigation }: Props) => {

    const eligibleDaysQuery = useQuery('eligibleDays', () => agent.TravelLog.getEligibleDays());
    if (eligibleDaysQuery.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        );
    }
    if (eligibleDaysQuery.isSuccess) {
        let data = JSON.parse(JSON.stringify(eligibleDaysQuery.data));
        console.log(data);
        return (
            <>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#7068EE',
                        height: 200,
                        flexDirection: 'column',
                    }}
                    >
                        <View
                            style={{
                                flex: 0.4,
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Text style={{
                                fontSize: 55,
                                fontWeight: '600',
                                textAlign: 'center',
                                color: 'white',
                            }}>
                                {1095 - data["EligibleDays"]} <Text style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    color: 'white',
                                }}>
                                    days
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 0.3,
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                            }}>
                                To be eligible for Canadian Citizenship
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 100,
                        flexDirection: 'row',
                    }}>
                        <View
                            style={{
                                backgroundColor: "#F49191",
                                height: 100,
                                flex: 0.5,
                                gap: 20
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    color: 'white',
                                    marginTop: 10,
                                }}
                            >
                                Non-PR days
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    color: 'white',
                                }}
                            >
                                {data["NonPrDays"]}
                            </Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: "#63D177",
                                height: 100,
                                flex: 0.5,
                                gap: 20
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    color: 'white',
                                    marginTop: 10,
                                }}
                            >
                                PR days
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    color: 'white',
                                }}
                            >
                                {data["PrDays"]}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            gap: 20,
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '600',
                            marginTop: 20,
                            marginLeft: 10,
                        }}
                        >
                            Travel logs
                        </Text>
                        <SafeAreaView>
                            <EntityList navigation={navigation} />
                        </SafeAreaView>
                    </View>
                </ScrollView>
            </>
        );
    }

}

export default DashboardScreen;