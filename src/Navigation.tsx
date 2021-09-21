import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignContext } from '~/context/SignContext';

import { LoginScreen, StartPage } from '~/screens/sign';
import { RegisterScreen } from '~/screens/sign';
import { ForgotPasswordScreen } from '~/screens/sign';
import { HomeScreen } from '~/screens/sign';

import {BottomNavigation} from 'react-native-paper';

import Artist from '~/screens/main/Artist';
import Community from '~/screens/main/Community';
import My from '~/screens/main/My';
import Release from '~/screens/main/Release';
import Shop from '~/screens/main/Shop';

const RootStack = createNativeStackNavigator();
const SignStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

//회원가입 / 로그인관련
const StackSign = ()=>{
  return (
    <>
    <SignStack.Navigator>
    <SignStack.Screen name="StartPage" component={StartPage} options={{headerShown:false}}/>
      <SignStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
      <SignStack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}}/>
      <SignStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown:false}}/>
      <SignStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
    </SignStack.Navigator>
    </>
  )
}

// const TabMain = () => {
//   // <MainTab.Screen name="Artist" component={Artist} />
//   //       <MainTab.Screen name="Release" component={Release} />  
//   //       <MainTab.Screen name="Community" component={Community} />        
//   //       <MainTab.Screen name="Shop" component={Shop} />     
//   //       <MainTab.Screen name="My" component={My} />     

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'artist', title: 'Artist', icon: 'queue-music' },
//     { key: 'release', title: 'Release', icon: 'queue-music' },
//     { key: 'community', title: 'Community', icon: 'queue-music' },
//     { key: 'shop', title: 'Shop', icon: 'queue-music' },
//     { key: 'my', title: 'My', icon: 'queue-music' },

//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     artist: Artist,
//     release: Release,
//     community: Community,
//     shop: Shop,
//     my: My,
  
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//     />
//   );
// };

//Program Main
const TabMain = ()=>{
  return (
    <>
    <MainTab.Navigator  
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Artist') {
            iconName = focused
              ? 'brush'
              : 'brush';
          } 
          else if (route.name === 'Release') {
            iconName = focused ? 'calendar' : 'calendar';
          }
          else if (route.name === 'Community') {
            iconName = focused ? 'contacts' : 'ios-list';
          }
          else if (route.name === 'Shop') {
            iconName = focused ? 'card' : 'card';
          }
          else if (route.name === 'My') {
            iconName = focused ? 'contact' : 'contact';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}>
        <MainTab.Screen name="Artist" component={Artist} />
        <MainTab.Screen name="Release" component={Release} />  
        <MainTab.Screen name="Community" component={Community} />        
        <MainTab.Screen name="Shop" component={Shop} />     
        <MainTab.Screen name="My" component={My} />     
      </MainTab.Navigator>
    </>
  )
}

const Navigation = ()=> {
  const {isSigned,trySignIn} = React.useContext<ISignContext>(SignContext);
  let [isSignedIn,setSignedIn] = React.useState<boolean>(false);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
      {/* <RootStack.Screen name="TabMain" component={TabMain} options={{headerShown:false}}/>         */}
      
        {
          !isSigned ?(       
            <RootStack.Screen name="StackSign" component={StackSign} options={{headerShown:false}}/>        
          ) : (        
            <RootStack.Screen name="TabMain" component={TabMain} options={{headerShown:false}}/>        
          )
          }      
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
export default Navigation;