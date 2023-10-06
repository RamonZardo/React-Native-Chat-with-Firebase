import React, { useState, useEffect } from 'react';
import {Box, Checkbox} from 'native-base'
import
{
    KeyboardAvoidingView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Animated,
    Keyboard
} from 'react-native';

import logoAut from '../../assets/logoAut.png'
import {auth} from '../../service/fireBaseConfig'
import{ signInWithEmailAndPassword} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyleLogin from './StyleLogin';

  
  
  

export default function Login({navigation}) {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [lembrarSenha, setLembrarSenha]= useState(false)  // constante para lembrar a senha
    const [error, setError] = useState(null); // armazena a mensagem de erro 
    const [emailNotRegistered, setEmailNotRegistered] = useState(false);// deu errado procurar consertar amanhã

    const FazerLogin = ()=> {
        signInWithEmailAndPassword(auth, email, password) // funçao para executar o Login via Firebase
            .then((userCredential) => {
                const user = userCredential.user; 
                navigation.navigate('Chat')
                if(lembrarSenha) { /// metodo dentro do fazerLogin que executa a função de salvar senha
                    AsyncStorage.setItem('storedEmail', email)
                    AsyncStorage.setItem('storedPassword', password)

                }
                setError(null);
                console.log(user);
                
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage.includes('no user record corresponding to this identifier')) {
                setEmailNotRegistered(true);
                setError('Email não cadastrado.');
                } else {
                setError(errorMessage);
                }
            });

    } 

    

    useEffect(()=>{ // componente para lembrar o email e senha, não está salvando a senha quando faz reloud do app.
        const storedEmail = AsyncStorage.getItem('storedEmail'); 
        const storedPassword = AsyncStorage.getItem('storedPassword');

        if (storedEmail && storedPassword) {
            setEmail(storedEmail)
            setPassword(storedPassword)
            setLembrarSenha(true);
        }

    }, [])

    

    
    return (
        <>
            <KeyboardAvoidingView style={StyleLogin.container}>

                <Image source={logoAut} style={{ width: 210, height: 210, top: -100,  }} />

               
                <TextInput
                    style={StyleLogin.input}
                    placeholder="Email"
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
                    style={StyleLogin.input}
                    placeholder="Senha"
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
                <Box top={-55} left={-40}>
                    <Checkbox isChecked={lembrarSenha} onChange={(value)=> setLembrarSenha(value)}>
                        Lembrar sua Senha
                    </Checkbox>
                </Box>

                <TouchableOpacity style={StyleLogin.buttonSubmit} onPress={ FazerLogin}>
                    <Text style={StyleLogin.submitText}>Acessar</Text>
                </TouchableOpacity>
                
                
                {error && <Text style={StyleLogin.errorText}>email ou senha incorretos</Text>}
                {emailNotRegistered && (
                    <Text style={StyleLogin.errorText}>
                        Este email não está cadastrado.
                    </Text>
                )}  

                 
                <TouchableOpacity style={StyleLogin.buttonRegister} onPress={()=> navigation.navigate('Registro')}>
                    <Text style={StyleLogin.registerText}>Criar conta gratuita</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        
        
        
        
        </>

    )
}
