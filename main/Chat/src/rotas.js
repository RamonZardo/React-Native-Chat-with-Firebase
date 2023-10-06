import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./telas/Login";
import Registro from "./telas/Registro";
import Splash from '../src/telas/Splash'
import Chat from "./telas/Chat/Index";




import { createNativeStackNavigator } from "@react-navigation/native-stack";



const Stack = createNativeStackNavigator();

export default function Rotas() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                
                <Stack.Screen
                    options={{
                        title: '',
                        headerTransparent: true,
                        headerShown: false
    
                    }}
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    options={{
                        title: '',
                        headerTransparent: true,
                        headerShown: false
    
                    }}
                    name="Registro"
                    component={Registro}
                />
                
                <Stack.Screen
                    options={{
                        title: "",
                        headerTransparent: true,
                        headerShown: false
                    }}
                    name="Splash"
                    component={Splash}
                
                />
                <Stack.Screen
                    options={{
                        title: "",
                        headerTransparent: true,
                        headerShown: false
                    }}
                    name="Chat"
                    component={Chat}
                
                />
                
                
                
                  
            </Stack.Navigator>
        </NavigationContainer>
    )
}