import { Button, Divider, Switch, Image, Input, Dialog } from '@rneui/themed';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Alert
} from 'react-native';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import agent from '../../agent';
import { SignupDto } from '../DTOs/incoming/signup.dto';
type Props = {
    navigation: any;
};
const RegisterScreen = ({ navigation }: Props) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (signupDto: SignupDto) => agent.Authentication.register(signupDto),
    });
    const [password, setPassword] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isPermanentResident, setIsPermanentResident] = React.useState(false);
    const submit = () => {
        if (fullName === '') {
            Alert.alert('Please enter your full name');
            return;
        }
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
        let signupDto: SignupDto = {
            'email': email.toLocaleLowerCase(),
            'password': password,
            'fullName': fullName,
            'IsPermanentResident': isPermanentResident,
        }
        mutation.mutate(signupDto);
    }

    if (mutation.isLoading) {
        return (
            <Dialog isVisible={true} onBackdropPress={() => { }}>
                <Dialog.Loading />
            </Dialog>
        )
    }
    if (mutation.isError) {
        let error = mutation.error as Error;
        let message = JSON.parse(error.message);
        if (message["statusCode"] === 409) {
            Alert.alert('User already exists, Please use login.');
            mutation.reset();
        }
        else {
            Alert.alert('Failed creating user, Please try again.');
            mutation.reset();
        }
    }
    if (mutation.isSuccess) {
        Alert.alert('User created successfully.');
        let data = JSON.parse(JSON.stringify(mutation.data));
        agent.setToken(data["token"]);
        mutation.reset();
        queryClient.invalidateQueries({ queryKey: ['authenticationState'] });
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
                marginTop: 15,
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
                    Register
                </Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <Input placeholder='Full name' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} onChangeText={text => setFullName(text)} />
                <Input placeholder='Email' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} onChangeText={text => setEmail(text)} />
                <Input placeholder='Password' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} secureTextEntry={true} onChangeText={password => setPassword(password)} />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 20,
                    }}
                >
                    <Text>Permanent resident ?</Text>
                    <Switch value={isPermanentResident} onValueChange={(value) => setIsPermanentResident(value)} />
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingTop: 20,
                }}>
                    <Button
                        title="Register"
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
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '300',
                        textAlign: 'center',
                    }}
                    >
                        Already having an account?
                    </Text>
                    <Button type="clear" onPress={() => navigation.navigate('Login')}>Login up now!</Button>
                </View>
            </View>
        </ScrollView >
    )
}

export default RegisterScreen;
