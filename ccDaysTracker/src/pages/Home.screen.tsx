import { Button, Divider, Image, Input, Tab, TabView } from '@rneui/themed';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import DashboardScreen from './Dashboard.screen';
import SettingsScreen from './Settings.screen';

const HomeScreen = () => {
    const [index, setIndex] = React.useState(0);

    return (
        <>
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    <DashboardScreen />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <SettingsScreen />
                </TabView.Item>
            </TabView>
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
