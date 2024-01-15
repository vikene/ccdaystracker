import { Button, Dialog, Divider, Image, Input, Switch, Tab, TabView } from '@rneui/themed';
import React, { useEffect } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import agent from "../../agent";
import { UserInfoDto } from '../DTOs/incoming/userInfo.dto';

type Props = {
    navigation: any;
};
const SettingsScreen = ({ navigation }: Props) => {
    let queryClient = useQueryClient();
    const settingsQuery = useQuery('userInfo', () => agent.User.getCurrentUserInfo());
    const userInfoMutation = useMutation({
        mutationFn: (userInfo: UserInfoDto) => agent.User.updateUserInfo(userInfo),
    })
    const [fullName, setFullName] = React.useState(settingsQuery.isSuccess ? settingsQuery.data.fullName : '');
    const [email, setEmail] = React.useState(settingsQuery.isSuccess ? settingsQuery.data.email : '');
    const [isPermanentResident, setIsPermanentResident] = React.useState(settingsQuery.isSuccess ? settingsQuery.data.IsPermanentResident : false);
    const [isThereChanges, setIsThereChanges] = React.useState(false);
    useEffect(() => {
        if (settingsQuery.isSuccess) {
            setFullName(settingsQuery.data.fullName);
            setEmail(settingsQuery.data.email);
            setIsPermanentResident(settingsQuery.data.IsPermanentResident);
        }
    }, settingsQuery.data);

    const submit = () => {
        if (fullName === '' || email === '') {
            Alert.alert('Error, full name and email are required.');
            return;
        }
        if (email.indexOf('@') === -1) {
            Alert.alert('Error, invalid email.');
            return;
        }
        let userInfo: UserInfoDto = {
            fullName: fullName,
            email: email,
            IsPermanentResident: isPermanentResident,
        }
        userInfoMutation.mutate(userInfo);
    }
    if (userInfoMutation.isError) {
        try {
            let message = JSON.parse(JSON.stringify(userInfoMutation.error));
            if (message.message === 'Unauthorized') {
                navigation.navigate('Login');
            }
            return <Text>
                Error: {message.message}
            </Text>
        }
        catch (e) {
            Alert.alert('Error, unable to reach server. Will retry in 5 seconds.');
            setTimeout(() => {
                queryClient.invalidateQueries('userInfo');
                userInfoMutation.reset();
            }, 5000);
        }
    }
    if (userInfoMutation.isSuccess) {
        queryClient.invalidateQueries('userInfo');
        userInfoMutation.reset();
        setIsThereChanges(false);
    }
    if (settingsQuery.isLoading || userInfoMutation.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        );
    }
    if (settingsQuery.isError) {
        try {
            let message = JSON.parse(JSON.stringify(settingsQuery.error));
            if (message.message === 'Unauthorized') {
                navigation.navigate('Login');
            }
            return <Text>
                Error: {message.message}
            </Text>
        }
        catch (e) {
            Alert.alert('Error, unable to reach server. Will retry in 5 seconds.');
            setTimeout(() => {
                queryClient.invalidateQueries('userInfo');
            }, 5000);
        }
    }
    if (settingsQuery.isSuccess) {
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
                    }}>
                        <Text style={{
                            fontSize: 26,
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: 30,
                        }}>
                            Settings
                        </Text>
                        <Input
                            placeholder="Full name"
                            label="Full name"
                            value={fullName}
                            onChangeText={(text) => {
                                if (text !== settingsQuery.data.fullName && isThereChanges === false) {
                                    setIsThereChanges(true);
                                }
                                setFullName(text)
                            }}
                        />
                        <Input
                            placeholder="Email"
                            label="Email"
                            value={email}
                            onChangeText={(text) => {
                                if (isThereChanges === false) {
                                    setIsThereChanges(true);
                                }
                                setEmail(text)
                            }}
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
                            <Switch value={isPermanentResident}
                                onValueChange={(value) => {
                                    if (isThereChanges === false) {
                                        setIsThereChanges(true);
                                    }
                                    setIsPermanentResident(value);
                                }}
                            />
                        </View>
                        {isThereChanges &&
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginTop: 30,
                                }}
                            >
                                <Button
                                    title="Save changes"
                                    buttonStyle={{
                                        backgroundColor: 'black',
                                        borderWidth: 2,
                                        borderColor: 'white',
                                        borderRadius: 30,
                                    }}
                                    containerStyle={{
                                        width: 200,
                                        marginHorizontal: 50,
                                        marginVertical: 10,
                                    }}
                                    titleStyle={{ fontWeight: 'bold' }}
                                    onPress={submit}
                                />
                            </View>
                        }
                    </View>
                </ScrollView>
            </>
        );
    }

}

export default SettingsScreen;