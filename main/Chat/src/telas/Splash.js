import React from "react";
import LottieView from 'lottie-react-native'
import { View, Text } from 'react-native'

export default function Splash({navigation}) {
    return(
        <View style={{flex: 1, justifyContent: 'center'}}>
            <LottieView
                source={require('../assets/Splash.json')}
                autoPlay
                loop={false}
                speed={1.7}
                onAnimationFinish={()=>navigation.navigate('Login')}
            
            
            />
            
        </View>
    )
}