import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{memo,useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet, FlatList, Touchable, Alert,TouchableOpacity, ActivityIndicator } from 'react-native';

import { Avatar, Card, Divider, Paragraph, Title } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import { SignContext } from '~/context/SignContext';
import ApiUrl from '~/GlobalConstant';
import { MyCollection } from '~/models/MyCollection';
import { ArtistStackParamList } from '~/models/NavigationParam';
import { getRandomInt } from '~/utils/random';

const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },       
        collectionItemContainer:{
            flexDirection:'row',
            height:100,
            margin:5
        },
        avartarStyle :{
            alignContent:'center',
            justifyContent:'center',
            margin:5
        },
        nameTitle:{
            position:'absolute',
            left:100,
            top : 20,
            color:'black'
        }
    })
);

type Props = {
    route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
    item:MyCollection;
};

const CollectionItem = ({navigation,route,item}:Props)=>{
    return (
        <>
        <View >
            {(item!==null || item!==undefined) &&
            <TouchableOpacity onPress={()=>navigation.navigate('CollectionDetail',{collection:item})}>
                <Card style={styles.collectionItemContainer}>
                    <Avatar.Image style={styles.avartarStyle} size={80} source={{uri:item?.img_list.length>0?item.img_list[0]:''}} />
                    <View style={styles.nameTitle}>
                    
                        <Title >{item.artist_name_kor}</Title>
                        <Paragraph >{item.title_kor}</Paragraph>
                    
                    </View>
                  
                </Card>
                
            </TouchableOpacity>
}
        </View>
        </>
    )
};


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


const CollectionAllList = ({route,navigation}:Props) =>{
    const {userId} = React.useContext<ISignContext>(SignContext);
    const [data,setData] = useState<MyCollection[]>([init,]);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const getMyCollectionData = async () =>{
        try {
            setIsLoading(true);
            let url = `${ApiUrl['mycollection']}?userid=${userId}&sample=False`;
            //Alert.alert('auction_',url);
            let res = await RNFetchBlob.fetch('GET', url);            
            setData(res.json());
            setIsLoading(false);
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
        <View>
        {isLoading &&<ActivityIndicator size="large" color="#00ff00" />}
            <FlatList                        
                        data={data}
                        progressViewOffset={100}
                        renderItem={({index,item})=><><CollectionItem item={item} navigation={navigation} route={route}></CollectionItem></>}
                        keyExtractor={(item,i) =>  i.toString()}
                    />
            <Divider color='black' orientation="horizontal"></Divider>
        </View>
        </>
        
    );
}


export default memo(CollectionAllList);