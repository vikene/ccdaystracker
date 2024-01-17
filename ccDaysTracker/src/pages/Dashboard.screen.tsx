import { Button, Divider, Image, Input, Tab, TabView } from '@rneui/themed';
import React from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native';
import EntityList from './EntityList.component';
import { useQuery, useQueryClient } from 'react-query';
import agent from '../../agent';
import { Dialog } from '@rneui/base';
import { ERROR_CODES } from '../ErrorCodes/errorCodes';

type Props = {
    navigation: any;
};
const DashboardScreen = ({ navigation }: Props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const queryClient = useQueryClient();
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        eligibleDaysQuery.refetch()
            .then(() => {
                setRefreshing(false);
            });
        queryClient.invalidateQueries(['entityList']);
    }, []);
    const eligibleDaysQuery = useQuery('eligibleDays', () => agent.TravelLog.getEligibleDays());
    if (eligibleDaysQuery.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        );
    }
    if (eligibleDaysQuery.isError) {
        try {
            let message = JSON.parse(JSON.stringify(eligibleDaysQuery.error));
            let messageBody = message.response.body;
            if (messageBody.appStatusCode === ERROR_CODES.UnauthorizedException) {
                Alert.alert("Error, unauthorized. Please log in again.");
                navigation.navigate('Login');
            }
        }
        catch (e) {
            Alert.alert('Error, unable to reach server. Try again later.');
        }
    }
    if (eligibleDaysQuery.isSuccess) {
        let data = JSON.parse(JSON.stringify(eligibleDaysQuery.data));
        return (
            <>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
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
                        <EntityList navigation={navigation} />
                    </View>
                </ScrollView>
            </>
        );
    }

}

export default DashboardScreen;