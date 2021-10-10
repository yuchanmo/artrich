import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import RNFetchBlob from 'rn-fetch-blob';
import ApiUrl from '~/GlobalConstant';
import { AuctionArt, AuctionArtHistory, AuctionArtInfo, DetailLineChartData } from '~/models/AuctionArt';
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
    chartData : DetailLineChartData[];
}




const CollectionChartTrend = ({chartData}:ChartTrendProps)=>{
    // let [data,SetData] = useState<ScatterXY[]>([]);

    // useEffect(()=>{
    //     let tmp = chartData.map((v,i)=> {
    //         return {x:i,y:v.money}
    //     });
    //     SetData(tmp);

    // },[chartData]);

    return (
        (chartData!==null && chartData!==undefined)&&
        <LineChart
                bezier
                data={{
                labels: chartData['x'],                
                datasets: chartData['y']
                }}
                verticalLabelRotation={90}
                width={Dimensions.get("window").width*0.95} // from react-native
                height={320}               
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',            
                color: (opacity = 1) =>`rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) =>`rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 8,
                    alignSelf:'center'
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}                
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
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

let initChartData = {x:[0,],y:[{data:[0,]},]};
const AuctionArtDetail = ({route,navigation}:Props) =>{
    const {art_info_id} = route.params;
    let [artDetail,setArtDetail] = useState<AuctionArt>();
    let [auctionArtInfo,setAuctionArtInfo] = useState<AuctionArtInfo>({});
    let [auctionArtHistory,setAuctionArtHistory] = useState<DetailLineChartData>(initChartData);
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
                        {/* <CollectionChartTrend chartData={auctionArtHistory}></CollectionChartTrend> */}
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