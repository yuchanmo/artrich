import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { Component, Fragment,useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Alert
} from "react-native";
//import styled from "styled-components/native";
import Video from "react-native-video";
import styled from "styled-components/native";
const { width, height } = Dimensions.get("window");
import {SignContext} from '~/context/SignContext';
// import { GoogleSignin } from '@react-native-community/google-signin';
// import auth from "@react-native-firebase/auth";

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  buttonStyle:{
      position:'absolute',
      bottom:30
  }
});


interface Props{
  route : RouteProp<LoginStackParamList,"StartPage">
  navigation:NativeStackScreenProps<LoginStackParamList,"StartPage">;    
}

const SignIn = ({route,navigation}:Props)=>{
  const {isSigned,trySignIn} = useContext<ISignContext>(SignContext);

  
  return (   
    <View style={styles.container}>      
    <Video
          source={require("~/assets/clips/clips.mp4")}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        />
    <Wrapper>         
          <Title>ART FANTASY</Title>
          <TextDescription>
            With you, Love you, I SEOUL U
          </TextDescription>
          <ButtonWrapper>
            <Fragment>
              <Button title="START" onPress={() => navigation.navigate('HomeScreen')}/>            
            </Fragment>
          </ButtonWrapper>
        </Wrapper>
    </View>
    

  );
};


export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;
export const Logo = styled.Image`
  max-width: 100px;
  width: 100px;
  height: 100px;
`;
export const TextDescription = styled.Text`
  letter-spacing: 3;
  color: #f4f4f4;
  text-align: center;
  text-transform: uppercase;
`;
export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 250px;
`;
export const Title = styled.Text`
  color: #f4f4f4;
  margin: 50% 0px 20px;
  font-size: 30;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3;
`;
const StyledButton = styled.TouchableOpacity`
 width:250px;
 background-color:${props => (props.transparent ? "transparent" : "#f3f8ff")};
 padding:15px;
border:${props => (props.transparent ? "1px solid #f3f8ff " : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;
const StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: ${props => (props.transparent ? "#f3f8ff " : "#666")};
`;

export const Button = ({ onPress, color, ...props }) => {
  return (
    <StyledButton {...props} onPress={onPress}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};




export default SignIn;
