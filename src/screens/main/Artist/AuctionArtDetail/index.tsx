import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import RNFetchBlob from 'rn-fetch-blob';
import ApiUrl from '~/GlobalConstant';
import { AuctionArt, AuctionArtHistory, AuctionArtInfo } from '~/models/AuctionArt';
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

interface ScatterXY{
    x:number;
    y:number;
}

interface ChartTrendProps{
    chartData : AuctionArtHistory[];
}


const CollectionChartTrend = ({chartData}:ChartTrendProps)=>{
    let [data,SetData] = useState<ScatterXY[]>([]);

    useEffect(()=>{
        let tmp = chartData.map((v,i)=> {
            return {x:i,y:v.money}
        });
        SetData(tmp);

    },[chartData]);

    return (
        <Chart
        style={{ height: 100, width: '100%' }}
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

const getDetail = (item:AuctionArtInfo,key:string)=>{
    if(key in item)
    {
        return item[key];
    }
    else{
        return '';
    }
};


const AuctionArtDetail = ({route,navigation}:Props) =>{
    const {art_info_id} = route.params;
    let [artDetail,setArtDetail] = useState<AuctionArt>();
    let [auctionArtInfo,setAuctionArtInfo] = useState<AuctionArtInfo>({});
    let [auctionArtHistory,setAuctionArtHistory] = useState<AuctionArtHistory[]>([]);
    const getArtDetail = async ()=>{
        try {            
            let url = `${ApiUrl['auctionart']}?artinfoid=${art_info_id}`;
            let res = await RNFetchBlob.fetch('GET', url);      
            let tmp = res.json();    
            setArtDetail(tmp);
            setAuctionArtInfo(tmp['auction_art_info']);
            setAuctionArtHistory(tmp['auction_art_history']);
            console.log(res.json());           
        } catch (error) {
            Alert.alert('error',error.toString());
        }
        
      };

    useEffect(()=>{
        getArtDetail();
    },[]);

    

    useLayoutEffect(()=>{
        navigation.setOptions({
          headerTitle:"작품 상세 정보"
        });
      }, [navigation]);
 
    return (
        <>
        <View style={{flex:1}}>
        <ScrollView>
        <Card>          
            
            <Card.Cover source={{ uri: (auctionArtInfo!==null && auctionArtInfo!==undefined) ? auctionArtInfo['image_url'] :""}} style={{borderRadius:5,padding:10}} />
            <Card.Content>
               <View>
                    <Title>{getDetail(auctionArtInfo,'title_kor')}</Title>
                    <Paragraph>{getDetail(auctionArtInfo,'medium_kor')}({getDetail(auctionArtInfo,'medium_eng')})</Paragraph>
                    <Paragraph>{getDetail(auctionArtInfo,'size_length')} x {getDetail(auctionArtInfo,'size_width')}</Paragraph>
                    <Paragraph>{getDetail(auctionArtInfo,'artwork_type')}</Paragraph>                    
                    <Paragraph>{getDetail(auctionArtInfo,'auction_site')} Auction</Paragraph>
                    <Paragraph>{getDetail(auctionArtInfo,'auction_place')}</Paragraph>
                    <Paragraph>{getDetail(auctionArtInfo,'auction_date')}</Paragraph>
                    <Paragraph>LOT NO.{getDetail(auctionArtInfo,'lot_no')}</Paragraph>
                    {/* <Paragraph>{getDetail(auctionArtInfo,'title_kor')}</Paragraph> */}

                </View>
                <Divider style={styles.divider}></Divider>
                {/* <View style={{flexDirection:'row'}}> */}
                <View>
                    <View>
                        <View>
                            <Text>PRICE</Text>
                            <Title>{getDetail(auctionArtInfo,'money')}</Title>
                            <Paragraph>{getDetail(auctionArtInfo,'estimate_low')}~{getDetail(auctionArtInfo,'estimate_high')}</Paragraph>
                        </View>
                        <Divider style={styles.divider}></Divider>
                    </View>
                    
                    <View>
                        <CollectionChartTrend chartData={auctionArtHistory}></CollectionChartTrend>
                        <Divider style={styles.divider}></Divider>
                        
                    </View>
                </View>

            </Card.Content>
            </Card>
        
        </ScrollView>
        </View>
        </>
        
    );
}


export default memo(AuctionArtDetail);