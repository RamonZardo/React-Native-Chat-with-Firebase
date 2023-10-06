import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { GiftedChat} from "react-native-gifted-chat";
import { Box } from "native-base";
import {Octicons} from '@expo/vector-icons'

// importações referentes  a configuração do firebase
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../../service/fireBaseConfig";
import {auth} from '../../service/fireBaseConfig'
import {signOut} from 'firebase/auth'



export default function Chat({navigation}) {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const chatRef = collection(database, "Chat");
    const q = query(chatRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageDocs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        _id: doc.id,
      }));
      setMessages(messageDocs);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = async (newMessages = []) => {
    for (const message of newMessages) {
      await addDoc(collection(database, "Chat"), {
        text: message.text,
        createdAt: new Date().getTime(),
        user: {
          _id: 1, // Pode ser o ID do usuário autenticado
          name: "Nome do Usuário", // Nome do usuário autenticado
        },
      });
    }
  };

  const Deslogar = ()=>{
    signOut(auth).then(() => {
      navigation.navigate('Login')
    }).catch((error) => {
      const errorMessage = error.message;
      console.log('erro ao deslogar:', errorMessage)
    });

  }
  

 


  return (
    <Box safeArea flex={1}>

      <View style={{left: 15, bottom: -10}}>
        <TouchableOpacity onPress={Deslogar}>
          <Octicons name="sign-out" size={35} color={'black'}/>
        </TouchableOpacity>
      </View>
      

      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1, // Pode ser o ID do usuário autenticado
        }}
        placeholder="Digite sua mensagem"
      
      />
      

    </Box>
      
    

  
    
  );
}
