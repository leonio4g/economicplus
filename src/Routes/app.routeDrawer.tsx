import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import DeviceInfo from "react-native-device-info";
import { View, Text } from 'react-native';
import { AppRoutes } from './app.routes';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {

    return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#3e3b47' }} {...props}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            color: '#ff9000',
                            fontSize: 18,
                            margin: 25,
                            fontWeight: 'bold',
                            marginBottom: 18,
                        }}>
                        MENU
                    </Text>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            height: 1,
                            marginBottom: 10,
                        }}
                    />


                    <DrawerItem
                    style={{width: '100%'}}
                        {...props}
                        label={() => (
                            <Text style={{ 
                                fontWeight: 'bold', 
                                color: '#fff', 
                                borderWidth: 1,
                                textAlign: 'center' ,
                                borderColor: '#ff9000',
                                padding: 11,
                                borderRadius: 12
                                }}>
                                Meus Cartões
                            </Text>
                        )}
                        onPress={() => props.navigation.navigate('myCard')}
                    />

                    <DrawerItem
                    style={{width: '100%'}}
                        {...props}
                        label={() => (
                            <Text style={{ 
                                fontWeight: 'bold', 
                                color: '#fff', 
                                borderWidth: 1,
                                textAlign: 'center' ,
                                borderColor: '#ff9000',
                                padding: 11,
                                borderRadius: 15
                                }}>
                                Contas Pagas
                            </Text>
                        )}
                        onPress={() => props.navigation.navigate('purchaseIncome')}
                    />

                    <DrawerItem
                    style={{width: '100%'}}
                        {...props}
                        label={() => (
                            <Text style={{ 
                                fontWeight: 'bold', 
                                color: '#fff', 
                                borderWidth: 1,
                                textAlign: 'center' ,
                                borderColor: '#ff9000',
                                padding: 11,
                                borderRadius: 15
                                }}>
                                Envio de Reporte
                            </Text>
                        )}
                        onPress={() => props.navigation.navigate('report')}
                    />
                </View>



                <View style={{ justifyContent: 'flex-end' }}>
                    <Text
                        style={{
                            color: '#fff',
                            margin: 32,
                            marginBottom: 24,
                        }}>
                        Versão {DeviceInfo.getVersion()}
                    </Text>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            detachInactiveScreens={true}
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
            }}>
            <Drawer.Screen name="home" component={AppRoutes} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
