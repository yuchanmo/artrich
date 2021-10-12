import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Touchable, Alert,TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar, Button, Card, Divider, Paragraph, Title } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import { SignContext } from '~/context/SignContext';
import ApiUrl from '~/GlobalConstant';
import {CardFlatListStyles,SampleFlatListStyles,SampleImageBackGoundListStyles} from '~/GlobalStyle';
import { FollowingArtistAuctionPlan } from '~/models/FollowingArtistAuctionPlan';
import { ArtistStackParamList } from '~/models/NavigationParam';
import { getRandomInt } from '~/utils/random';

const styles = StyleSheet.create(
    ({
        ...CardFlatListStyles,
        ...SampleFlatListStyles,
        ...SampleImageBackGoundListStyles,
        cotainer:{
            flex:1
        },       
        collectionItemContainer:{
            flexDirection:'row',
            height:140,
            margin:5
        },
        avartarStyle :{
            alignContent:'center',
            justifyContent:'center',
            margin:5
        }
    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
};

type CollectionItemProps ={
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;  
    item:FollowingArtistAuctionPlan;  
};

// const CollectionItem = ({navigation,route,img}:Props)=>{
//     return (
//         <>
        
//             <TouchableOpacity style={styles.cardContainer} onPress={()=>Alert.alert('info','info')}>
//             <ImageBackground
//                 source={{uri : img}}
//                 resizeMode="cover"
//                 style={styles.imageBackGround}
//                 imageStyle={styles.BackgroundImageStyle}
//               >
                
//                 <View style={styles.bottomRect}>
//                    <Text style={styles.bottomText}>일정</Text>
//                   <Text style={styles.bottomText}>작가</Text>
//                   <Text style={styles.bottomText}>가격</Text>                  
//                 </View>
//               </ImageBackground>
//             </TouchableOpacity>
        
//         </>
//     )
// };


const CollectionItem = ({navigation,route,item}:CollectionItemProps)=>{
    return (
        <View style={styles.sampleFlatListItemCotainer}>
        <TouchableOpacity style={styles.sampleFlatListItemButton} onPress={()=>{
            // Alert.alert('no',item.art_info_id.toString());
            navigation.navigate('AuctionArtDetail',{art_info_id : item.art_info_id});
        }
            }>
    
              <ImageBackground
                source={{uri:item.image_url}}
                resizeMode="cover"
                style={styles.sampleFlatListItemImage}
                imageStyle={styles.sampleFlatListItemImageStyle}
              >                               
              </ImageBackground>
              <View style={styles.sampleFlatListItemDescriptionContainer}>
                     <Text style={styles.bottomText}>{item.auction_date}</Text>
                     <Text style={styles.bottomText}>{item.artist_name_kor}({item.artist_name_eng})</Text>
                     <Text style={styles.bottomText}>{item.artist_name_eng}</Text>                     
                </View>
            </TouchableOpacity>
        </View>
    )
};





const FollowingArtistReleaseList = ({route,navigation}:Props) =>{
    const {userId} = React.useContext<ISignContext>(SignContext);
    const [data,setData] = useState<FollowingArtistAuctionPlan[]>();
    

    const getAuctionPlanData = async () =>{
        try {
            let url = `${ApiUrl['followingartistsauctionplan']}?userid=${userId}`;
            //Alert.alert('auction_',url);
            let res = await RNFetchBlob.fetch('GET', url);            
            setData(res.json());
            console.log(res.json());           
        } catch (error) {
            Alert.alert('rr',error.toString());
            //Alert.alert('error',error.toString());
        }

    };

    useEffect(()=>{
        getAuctionPlanData();
    },[]);
        

  
    return (
        <>
        <View style={styles.sampleFlatListContainer}>
            <View style={styles.sampleFlatListTitleContainer}>
                <Text style={styles.sampleFlatListTitleText}>RELEASE</Text>
                {/* <Button style={styles.sampleFlatListMoreButtonText} onPress={()=>navigation.navigate('FollowingArtistAllList')}>전체보기</Button> */}
            </View>
            {/* <FlatList                    
                data={samples}
                renderItem={({index,item})=><><CollectionItem img={item} navigation={navigation} route={route}></CollectionItem></>}
                keyExtractor={(item,i) =>  i.toString()}
            /> 
            <Button onPress={()=>showMore()}>MORE</Button>
            */}
            <FlatList   
               horizontal={true}                                
                data={data}
                renderItem={({index,item})=><><CollectionItem item={item} navigation={navigation} route={route}></CollectionItem></>}
                keyExtractor={(item,i) =>  i.toString()}
            />
            
            <Divider color='black' orientation="horizontal"></Divider>
        </View>       
        </>
        
    );
}


export default memo(FollowingArtistReleaseList);