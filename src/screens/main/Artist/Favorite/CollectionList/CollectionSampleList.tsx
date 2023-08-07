import { NavigationHelpersContext, RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList,Image, TouchableOpacity, ImageBackground ,ActivityIndicator} from 'react-native';
import { Button, Divider, Paragraph, Title } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import { SignContext } from '~/context/SignContext';
import ApiUrl from '~/GlobalConstant';
import {SampleFlatListStyles} from '~/GlobalStyle';
import { MyCollection } from '~/models/MyCollection';
import { ArtistStackParamList } from '~/models/NavigationParam';
import { getRandomInt } from '~/utils/random';

const styles = StyleSheet.create(
    ({
        ...SampleFlatListStyles,
        cotainer:{
            flex:1
        },        
      
    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"CollectionSampleList">
    navigation:NativeStackScreenProps<ArtistStackParamList,"CollectionSampleList">;    
    item : MyCollection;
};

const CollectionItem = ({navigation,route,item}:Props)=>{
    return (
        
           
        <View style={styles.sampleFlatListItemCotainer}>
            { (item!==null || item!==undefined) &&
        <TouchableOpacity style={styles.sampleFlatListItemButton} onPress={()=>navigation.navigate('CollectionDetail',{collection:item})}>
              {/* <ImageBackground
                source={ArtInfo.ImageUrl}
                resizeMode="cover"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
              > */}
              <ImageBackground
                source={{uri:item?.img_list.length>0?item.img_list[0]:""??""}}
                resizeMode="cover"
                style={styles.sampleFlatListItemImage}
                imageStyle={styles.sampleFlatListItemImageStyle}
              >               
                
              </ImageBackground>
              <View style={styles.sampleFlatListItemDescriptionContainer}>
                   <Text style={styles.sampleFlatListItemDescription}>{item?.artist_name_kor}</Text>
                   <Text style={styles.sampleFlatListItemDescription}>{item?.artist_name_eng}</Text>
                  <Text style={styles.sampleFlatListItemDescription}>{item?.title_kor}</Text>
                  <Text style={styles.sampleFlatListItemDescription}>{item?.buy_date}</Text>                  
                  <Text style={styles.sampleFlatListItemDescription}>{item?.price}</Text>                  
                                   
                </View>
            </TouchableOpacity>
}           
        </View>
    )
            }


let init:MyCollection ={
    artist_id:0,
    artist_name_eng:'',
    artist_name_kor:'',
    birth:'',
    buy_date:'',
    canvas:'',
    create_time:'',
    death:'',
    edition:'',
    image_name:'',
    img_list:[],
    price:0,
    size_height:'',
    size_length:'',
    title_eng:'',
    title_kor:'',
    unit_cd:'',
    user_art_id:0,
    user_id:0,

};



const CollectionSampleList = ({route,navigation}:Props) =>{
    const {userId} = React.useContext<ISignContext>(SignContext);
    const [data,setData] = useState<MyCollection[]>([init,]);
    

    const getMyCollectionData = async () =>{
        try {
            let url = `${ApiUrl['mycollection']}?userid=${userId}&sample=True`;
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
        getMyCollectionData();
    },[]);
    return (
        <>
        <View style={styles.sampleFlatListContainer}>
            <View style={styles.sampleFlatListTitleContainer}>
                <Text style={styles.sampleFlatListTitleText}>MY COLLECTION</Text>
                <Button style={styles.sampleFlatListMoreButtonText} onPress={()=>navigation.navigate('CollectionAllList')}>전체보기</Button>
            </View>
            { (data.length >0) &&
            <FlatList
                        horizontal={true}
                        data={data}
                        renderItem={({index,item})=><><CollectionItem item={item}  navigation={navigation} route={route}></CollectionItem></>}
                        keyExtractor={(item,i) =>  i.toString()}
                    />
                }
            <Divider color='black' orientation="horizontal"></Divider>
       
        </View>
        </>
        
    );
}


export default memo(CollectionSampleList);