import { RouteProp } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card, Paragraph, Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import { SignContext } from '~/context/SignContext';
import ApiUrl from '~/GlobalConstant';
import { ArtistListResult } from '~/models/ArtistList';
import { ArtistStackParamList } from '~/models/NavigationParam';
import ArtList from '~/screens/main/Artist/ArtistDetail/ArtList';
import ChartAnalysis from '~/screens/main/Artist/ArtistDetail/ChartAnalysis';
import CompareArtists from '~/screens/main/Artist/ArtistDetail/CompareArtists';


const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        artistTitleContainer:{
            height:90,
            
        },
        artistInfoContainer:{
            flex:1
        },
        artistFollowingText:{
            alignSelf:'center',
            alignItems:'center',
            position:'absolute',
            right:20
        },
        collectionItemContainer:{
            flexDirection:'column',
            height:80,
            margin:5
        },
        avartarStyle :{
            alignContent:'center',
            justifyContent:'center',
            margin:5
        },
        nameTitle:{
            position:'absolute',
            left:120,
            top : 10,
            color:'black'
        },
        heartStyle:{
            position:'absolute',
            right:10,
            top : 20,
        }

    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistDetail">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistDetail">;    

  };

type TabProps ={
    item:ArtistListResult;
    route : RouteProp<ArtistStackParamList,"ArtistDetail">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistDetail">;    

}

const Tab = createMaterialTopTabNavigator<ArtistStackParamList>();

const ArtistDetailTabRoot = ({item,navigation,route}:TabProps)=>{
    
    return (                 
        <Tab.Navigator>
            <Tab.Screen name="ChartAnalysis"   component={ChartAnalysis}  options={{swipeEnabled:false,title:'차트'}} />
            <Tab.Screen name="ArtList" children={()=>{
                    return(
                    <ArtList item={item} navigation={navigation} route={route} />
                    )
                }} options={{swipeEnabled:false,title:'작품목록'}}/>
            <Tab.Screen name="CompareArtists" component={CompareArtists} options={{swipeEnabled:false,title:'작가비교'}}/>                                
        </Tab.Navigator>       
    );
};

type ArtistHeaderProps = {
    item : ArtistListResult;
}

const ArtistHeader = ({item}:ArtistHeaderProps)=>{
    const [turnOn,setTurnOn] = useState<boolean>(item.turn_on);
    const {userId} = React.useContext<ISignContext>(SignContext);
    const updateFollowingStatus = async () =>{
        let res = await RNFetchBlob.fetch('POST', ApiUrl["followingartists"],
        { 'Content-Type': 'application/json'},
        JSON.stringify({userid: userId,artistid:item.artist_id,turnon:turnOn})
         );
         Alert.alert('result', res.json()['turn_on'].toString());
    };

    const toggleHeart = async ()=>{
        updateFollowingStatus();
        setTurnOn(!turnOn);
    };

    return (
        <Card style={styles.collectionItemContainer}>
            <Avatar.Image style={styles.avartarStyle} size={60} source={{uri:item.image_url}} />
            <View style={styles.nameTitle}>
            
                <Title >{item.artist_name_kor}</Title>
                <Paragraph >{item.artist_name_eng}</Paragraph>
            
            </View>
            <View style={styles.heartStyle}>
            <TouchableOpacity onPress={toggleHeart}>
                {
                    turnOn == true 
                    ? <Ionicons name={'heart'} size={30} color={'red'} />
                    : <Ionicons name={'heart'} size={30} color={'gray'} />
                }
            </TouchableOpacity>
            </View>
        </Card>
    );
}

const ArtistDetail = ({route,navigation}:Props) =>{
    const {item} = route.params;
    const [isClick, setClick] = useState<boolean>(false);

    useLayoutEffect(()=>{
        navigation.setOptions({
          headerTitle:"작가 상세 정보"
        });
      }, [navigation]);

    return (
        <>
        <View style={styles.cotainer}>
            <View style={styles.artistTitleContainer}>
                <ArtistHeader item={item}></ArtistHeader>

                {/* <Title>{item.artist_name_kor}</Title>
                
                <Text style={styles.artistFollowingText}>Following</Text> */}
            </View>
            <View style={styles.artistInfoContainer}>
                <ArtistDetailTabRoot item={item} navigation={navigation} route={route}></ArtistDetailTabRoot>
            </View>
        </View>
        </>
        
    );
}


export default memo(ArtistDetail);