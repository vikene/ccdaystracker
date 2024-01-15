import { Button, Dialog, Divider, FAB, Image, Input, SpeedDial, Tab, TabView } from '@rneui/themed';
import React from 'react';
import {
    Alert,
    Text
} from 'react-native';
import DashboardScreen from './Dashboard.screen';
import SettingsScreen from './Settings.screen';
import { useQuery, useQueryClient } from 'react-query';
import agent from '../../agent';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();
type Props = {
    navigation: any;
};
const HomeScreen = ({ navigation }: Props) => {
    const queryClient = useQueryClient();
    const [authToken, setAuthToken] = useMMKVStorage('authenticationToken', storage, '');
    if (authToken !== '') {
        agent.setToken(authToken!);
    }
    const [index, setIndex] = React.useState(0);
    const [speedDialOpen, setSpeedDialOpen] = React.useState(false);
    const { isLoading, isError, error } = useQuery('authenticationState', () => {
        return agent.Authentication.current();
    });

    if (isLoading) return (
        <Dialog isVisible={true}>
            <Dialog.Loading />
        </Dialog>
    );
    if (isError) {
        if (error instanceof Error) {
            try {
                let message = JSON.parse(error.message);
                if (message["message"] === 'Unauthorized') {
                    navigation.navigate('Login');
                }
                return <Text>
                    Error: {error.message}
                </Text>;
            }
            catch (e) {
                Alert.alert('Error, unable to reach server. Will retry in 5 seconds.');
                setTimeout(() => {
                    queryClient.invalidateQueries('authenticationState');
                }, 5000);
            }

        }
    }
    return (
        <>
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    <DashboardScreen navigation={navigation} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <SettingsScreen navigation={navigation} />
                </TabView.Item>
            </TabView>
            <SpeedDial
                isOpen={speedDialOpen}
                onOpen={() => setSpeedDialOpen(!speedDialOpen)}
                onClose={() => setSpeedDialOpen(!speedDialOpen)}
                openIcon={{ name: 'close', color: '#fff' }}
                icon={{ name: 'add', color: 'white' }}
                placement="right"
                style={{
                    marginBottom: 60,
                }}
            >
                <SpeedDial.Action
                    icon={{ name: 'flight', color: 'white' }}
                    title="Record Arrival"
                    onPress={() => {
                        setSpeedDialOpen(!speedDialOpen);
                        navigation.navigate('RecordArrival');
                    }}
                />
                <SpeedDial.Action
                    title="Record Departure"
                    icon={{ name: 'rotate-right', color: 'white' }}
                    onPress={() => {
                        setSpeedDialOpen(!speedDialOpen);
                        navigation.navigate('RecordDeparture')
                    }} />
            </SpeedDial>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
            >
                <Tab.Item
                    title="Home"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'home', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="Settings"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'settings', type: 'ionicon', color: 'white' }}
                />
            </Tab>
        </>
    )
}

export default HomeScreen;
