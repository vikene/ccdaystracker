import { Button, Divider, Image, Input } from '@rneui/themed';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';

const RegisterScreen = () => {
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
                    Register
                </Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <Input placeholder='Full name' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} />
                <Input placeholder='Email' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} />
                <Input placeholder='Password' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} secureTextEntry={true} />
                <Input placeholder='Re-Enter Password' inputContainerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 10 }} secureTextEntry={true} />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
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
                    />
                </View>
            </View>
        </ScrollView >
    )
}

export default RegisterScreen;
