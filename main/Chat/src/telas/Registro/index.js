import { useState } from "react";
import { 
    TextInput, 
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
    View
} from "react-native";

import {AntDesign} from '@expo/vector-icons'
import StyleRegistro from "./StyleRegistro";

import {auth} from '../../service/fireBaseConfig'
import { createUserWithEmailAndPassword} from 'firebase/auth'



export default function Registro({navigation}) {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [nome, setNome]= useState('');
    

    const FazerRegistro = ()=> {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Chat')
                               
                
                console.log(user)
                
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log('erro ao registrar:', errorMessage);
            });
    }

    
    
    return (
         <>
            
           
            <KeyboardAvoidingView style={StyleRegistro.container}>
                <View style={StyleRegistro.ViewSeta}>
                    <TouchableOpacity style={StyleRegistro.arrowLeft} onPress={()=>navigation.navigate('Login')}>
                        <AntDesign name="arrowleft" size={30} color="#000000" />
                    </TouchableOpacity> 
                </View>
                    
               
                <TextInput
                   style={StyleRegistro.input}
                   placeholder="Digite seu nome"
                   autoCorrect={false}
                   value={nome}
                   onChangeText={(val) => {
                        setNome(val)
                   }}
                /> 
                <TextInput
                   style={StyleRegistro.input}
                   placeholder="Digite seu Email"
                   keyboardType="email-address"
                   textContentType="emailAddress"
                   autoCapitalize="none"
                   autoCompleteType="email"
                   autoCorrect={false}
                   value={email}
                   onChangeText={(val) => {
                        setEmail(val)
                   }}
                /> 


                <TextInput
                    style={StyleRegistro.input}
                    placeholder="Digite sua senha"
                    //keyboardType="visible-password"
                    textContentType="password"
                    autoCapitalize="none"
                    autoCompleteType="password"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(val) => {
                        setPassword(val)
                    }}
                />  
                
               

                    
                <TouchableOpacity style={StyleRegistro.buttonSubmit} onPress={FazerRegistro}>
                    <Text style={StyleLogin.submitText}>Registrar</Text>
                </TouchableOpacity>                 

            </KeyboardAvoidingView>
            
            
            
            
        </>
    )
}