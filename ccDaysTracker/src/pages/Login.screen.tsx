import { Button, Divider, Image, Input } from '@rneui/themed';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
type Props = {
    navigation: any;
};
const LoginScreen = ({ navigation }: Props) => {
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
                <Input placeholder='Email' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} />
                <Input placeholder='Password' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} secureTextEntry={true} />
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
