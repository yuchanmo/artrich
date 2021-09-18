import React, { memo } from 'react';
import Background from '~/components/Background';
import Logo from '~/components/Logo';
import Header from '~/components/Header';
import Button from '~/components/Button';
import Paragraph from '~/components/Paragraph';
import { Navigation } from '~/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = {
  navigation:NativeStackScreenProps<LoginStackParamList,"HomeScreen">;    
};


const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Login Template</Header>

    <Paragraph>
      The easiest way to start with your amazing application.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
