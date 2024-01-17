import { Button, Dialog, Divider, Image, Input } from '@rneui/themed';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Alert
} from 'react-native';
import { Mutation, useMutation, useQueryClient } from 'react-query';
import agent from '../../agent';
import { LoginDto } from '../DTOs/incoming/login.dto';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import { ERROR_CODES } from '../ErrorCodes/errorCodes';

const storage = new MMKVLoader().initialize();
type Props = {
    navigation: any;
};
const LoginScreen = ({ navigation }: Props) => {
    const queryClient = useQueryClient();
    const [authToken, setAuthToken] = useMMKVStorage('authenticationToken', storage, '');
    const loginMutation = useMutation({
        mutationFn: (loginDto: LoginDto) => agent.Authentication.login(loginDto.email, loginDto.password),
    })
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const submit = () => {
        if (email === '') {
            Alert.alert('Please enter your email');
            return;
        }
        if (email.indexOf('@') === -1) {
            Alert.alert('Please enter a valid email');
            return;
        }
        if (password.length < 8) {
            Alert.alert('Password must be at least 8 characters');
            return;
        }
        let loginDto: LoginDto = {
            'email': email.toLocaleLowerCase(),
            'password': password,
        }
        loginMutation.mutate(loginDto);
    }
    if (loginMutation.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        )
    }
    if (loginMutation.isError) {
        let error = loginMutation.error as Error;
        try {
            let message = JSON.parse(JSON.stringify(error));
            let messageBody = message.response.body;
            if (messageBody.appStatusCode === ERROR_CODES.InCorrectPasswordException) {
                Alert.alert('Invalid email or password');
                loginMutation.reset();
                return;
            }
        }
        catch (e) {
            Alert.alert('Error, unable to reach server. Try again later.');
            loginMutation.reset();
        }
    }
    if (loginMutation.isSuccess) {
        let data = JSON.parse(JSON.stringify(loginMutation.data));
        let tokenString: string = data["token"];
        agent.setToken(tokenString);
        setAuthToken(tokenString);
        loginMutation.reset();
        queryClient.invalidateQueries('authenticationState');
        navigation.navigate('Home');
    }
    if (authToken !== '') {
        navigation.navigate('Home');
        agent.setToken(authToken);
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
            }}
            >
                <Image
                    source={require('../../assets/images/ccLogo.png')}
                    style={{ width: 200, height: 200 }}
                ></Image>
            </View>
            <View>

                <Text style={{
                    fontSize: 26,
                    fontWeight: '600',
                    textAlign: 'center',
                }}
                >
                    Login
                </Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <Input placeholder='Email' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} onChangeText={(email) => setEmail(email)} />
                <Input placeholder='Password' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <Button
                        title="LOG IN"
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
            </View>
            <Divider style={{ marginTop: 15 }} inset={true} insetType={"middle"} />
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 15,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '300',
                    textAlign: 'center',
                }}
                >
                    Not having a account?
                </Text>
                <Button type="clear" onPress={() => navigation.navigate('Register')}>Sign up now!</Button>
            </View>
        </ScrollView >
    )
}

export default LoginScreen;
