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

type Props = {
    navigation: any;
};
const LoginScreen = ({ navigation }: Props) => {
    const queryClient = useQueryClient();
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
        let message = JSON.parse(error.message);
        if (message["statusCode"] === 401) {
            Alert.alert('Invalid email or password');
            loginMutation.reset();
            return;
        }
    }
    if (loginMutation.isSuccess) {
        let data = JSON.parse(JSON.stringify(loginMutation.data));
        let tokenString: string = data["token"];
        agent.setToken(tokenString);
        loginMutation.reset();
        queryClient.invalidateQueries('authenticationState');
        navigation.navigate('Home');
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
