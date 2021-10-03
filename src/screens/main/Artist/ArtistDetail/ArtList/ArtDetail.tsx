import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import RNFetchBlob from 'rn-fetch-blob';
import ApiUrl from '~/GlobalConstant';
import { AuctionArtDetail } from '~/models/AuctionArtDetail';
import { ArtistStackParamList } from '~/models/NavigationParam';
const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        collectionFlatListContainer:{
            alignSelf:'center',
        },
        collectionImageContainer:{
            margin:3
        },
        collectionImage:{
            height:60,
            width:60,
            borderRadius:10,
        },
        divider:{
            marginBottom:30
        }

    })
);


const Tab = createMaterialTopTabNavigator<ArtistStackParamList>();



const CollectionChartTrend = ()=>{
    return (
        <Chart
        style={{ height: 100, width: 200 }}
        data={[
            { x: -2, y: 15 },
            { x: -1, y: 10 },
            { x: 0, y: 12 },
            { x: 1, y: 7 },
            { x: 2, y: 6 },
            { x: 3, y: 8 },
            { x: 4, y: 10 },
            { x: 5, y: 8 },
            { x: 6, y: 12 },
            { x: 7, y: 14 },
            { x: 8, y: 12 },
            { x: 9, y: 13.5 },
            { x: 10, y: 18 },
        ]}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: -2, max: 10 }}
        yDomain={{ min: 0, max: 20 }}
        >
        <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
        <HorizontalAxis tickCount={5} />
        <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} />
        <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
        </Chart>
    )
};

const CollectionImage = ({img,idx,onPress})=>{
    return (
        <View style={styles.collectionImageContainer}>
            <TouchableOpacity onPress={onPress}>        
                <Image source={{uri : img}} style={styles.collectionImage}></Image>        
            </TouchableOpacity>
        </View>
    );
};


type Props = {
    route : RouteProp<ArtistStackParamList,"ArtDetail">
    navigation:NativeStackScreenProps<ArtistStackParamList,"ArtDetail">;    
    art_info_id:number;
};



const CollectionDetail = ({route,navigation,art_info_id}:Props) =>{
    
    let imgs = [700,701,702,703,704,705].map((v,i)=>`https://picsum.photos/${v.toString()}`);
    let [image,setImage] = useState<string>(imgs[0]);
    let data = [1,2,3,4,5,6];
    let [artDetail,setArtDetail] = useState<AuctionArtDetail>();

    const getArtDetail = async ()=>{
        try {
            let url = `${ApiUrl['auctionart']}?artinfoid=${art_info_id}`;
            let res = await RNFetchBlob.fetch('GET', url);
            setArts(res.json());
            console.log(res.json());
            // console.log(res);
            //     let status = res.info().status;
            //     Alert.alert('res',status.toString());
            //     if(status == 200){                              
            //         //let tmp:Array<ArtDisplayInfo> = [...data, res.data];
            //         setArtist(res.json());
            //     }  
        } catch (error) {
            //Alert.alert('error',error.toString());
        }
        
      };

    useEffect(()=>{
        getArtDetail();
    },[]);
 
    return (
        <>
        <View style={{flex:1}}>
        <ScrollView>
        <Card>          
            
            <Card.Cover source={{ uri: image }} style={{borderRadius:5,padding:10}} />
            <Card.Content>
               <View>
                    <Title>Banksy</Title>
                    <Paragraph>
                        Game Changer,2020
                        Oil on canvas
                        91.1 x 91.1
                        painting
                    </Paragraph>
                </View>
                <Divider style={styles.divider}></Divider>
                <View style={{flexDirection:'row'}}>
                   
                    <View>
                        <View>
                            <Text>Live ESTIMATION</Text>
                            <Title>16,429,235,353</Title>
                            <Paragraph>14,462,523,523-15,125,235,353</Paragraph>
                        </View>
                        <Divider style={styles.divider}></Divider>
                        <View>
                            <Text>Live ESTIMATION</Text>
                            <Title>16,429,235,353</Title>
                            <Paragraph>14,462,523,523-15,125,235,353</Paragraph>
                        </View>
                    </View>
                    
                    <View>
                        <CollectionChartTrend></CollectionChartTrend>
                        <Divider style={styles.divider}></Divider>
                        <View>
                            <Text>Live ESTIMATION</Text>
                            <Title>16,429,235,353</Title>
                            <Paragraph>14,462,523,523-15,125,235,353</Paragraph>
                        </View>
                    </View>
                </View>

            </Card.Content>
            </Card>
        
        </ScrollView>
        </View>
        </>
        
    );
}


export default memo(CollectionDetail);