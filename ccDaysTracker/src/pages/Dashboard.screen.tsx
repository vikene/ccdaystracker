import { Button, Divider, Image, Input, Tab, TabView } from '@rneui/themed';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import EntityList from './EntityList.component';

const DashboardScreen = () => {
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
                            1098 <Text style={{
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
                            To be elidgible for Canadian Citizenship
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
                            270
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
                            300
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
                    <EntityList />
                </View>
            </ScrollView>
        </>
    );
}

export default DashboardScreen;