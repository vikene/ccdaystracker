import { Button, Divider, FAB, Image, Input, Tab, TabView } from '@rneui/themed';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import DashboardScreen from './Dashboard.screen';
import SettingsScreen from './Settings.screen';
import { QueryClient, useQuery } from 'react-query';
import agent from '../../agent';

type Props = {
    navigation: any;
};
const HomeScreen = ({ navigation }: Props) => {
    const [index, setIndex] = React.useState(0);
    const { isLoading, isError, status, error, data } = useQuery('authenticationState', () => {
        return agent.Authentication.current();
    });
    if (isLoading) return <Text>Loading...</Text>;
    if (isError) {
        if (error instanceof Error) {
            let message = JSON.parse(error.message);
            if (message["message"] === 'Unauthorized') {
                navigation.navigate('Login');
            }
            return <Text>
                Error: {error.message}
            </Text>;
        }
    }
    return (
        <>
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    <DashboardScreen navigation={navigation} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <SettingsScreen />
                </TabView.Item>
            </TabView>
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
                    icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="Settings"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                />
            </Tab>
        </>
    )
}

export default HomeScreen;
