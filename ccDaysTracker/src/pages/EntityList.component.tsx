import { Avatar, ListItem, Text } from "@rneui/themed";
import { FlatList, View } from "react-native"
type Props = {
    navigation: any;
};
const EntityList = ({ navigation }: Props) => {
    const list = [
        {
            days: 20,
            arrived: '2021-01-01',
            departed: '2021-01-20',
            status: 'PR'
        },
        {
            days: 20,
            arrived: '2021-01-01',
            departed: '2021-01-20',
            status: 'PR'
        },
        {
            days: 20,
            arrived: '2021-01-01',
            departed: '2021-01-20',
            status: 'PR'
        },
        {
            days: 20,
            arrived: '2021-01-01',
            departed: '2021-01-20',
            status: 'PR'
        },
        {
            days: 20,
            arrived: '2021-01-01',
            departed: '2021-01-20',
            status: 'PR'
        },
        {
            days: 20,
            arrived: '2021-01-01',
            departed: '2021-01-20',
            status: 'PR'
        },
        {
            days: 20,
            arrived: '2021-01-01',
            departed: '2021-01-20',
            status: 'PR'
        },
        {
            days: 20,
            arrived: '2021-01-01',
            departed: '2021-01-20',
            status: 'PR'
        },
    ];
    const keyExtractor = (item: any, index: number) => index.toString();
    const renderItem = ({ item }: any) => (
        <ListItem onPress={() => navigation.navigate('ViewEntry')}>
            <ListItem.Content>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',
                        gap: 10,
                    }}
                >
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Days: {item.days}</Text>
                        <Text style={{ fontSize: 15, fontWeight: '400', alignSelf: "flex-end", color: "#333" }}>Status: {item.status}</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: '400' }}>Arrived: {item.arrived}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '400' }}>Departed: {item.departed}</Text>

                </View>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );

    return (
        <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    )
}

export default EntityList;