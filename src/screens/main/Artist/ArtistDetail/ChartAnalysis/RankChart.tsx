import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import { commonStyle } from '~/GlobalStyle';
const styles = StyleSheet.create(
    ({
        ...commonStyle,
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
        }

    })
);

let xaxis = [...Array(30).keys()];

let sampleGenerator = ()=>{
    return xaxis.map((v,i)=>{
        return {
            x:v,
            y:Math.random()*10
        }
    })
};

let datas = {
    ratio:sampleGenerator(),
    avgprice:sampleGenerator(),
    perprice:sampleGenerator(),
    numofout:sampleGenerator(),
    successratio:sampleGenerator(),    
};



const RankChart = ()=>{
    let chart_keys = Object.keys(datas);
    const [chartKey,setChartKey] = useState<string>(chart_keys[0]);
    const [chartData,setChartData] = useState(datas[chart_keys[0]]);

    let changeData = (k:string)=>{
        setChartData(datas[k]);
    };

    return (
        <View>
            <Text style={styles.titleText}>순위차트</Text>
            <View style={{flexDirection:'row'}}>
            <FlatList
                 contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}}                
                data={chart_keys}
                renderItem={({index,item})=><Button mode={'outlined'} onPress={()=>changeData(item)}>{item}</Button>}
                keyExtractor={(i) =>  i.toString()}
            >
            </FlatList>
            
            </View>
            <Chart
            style={{ height: 200, width: 400 }}
            data={chartData}
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
            xDomain={{ min: 0, max: 20 }}
            yDomain={{ min: 0, max: 20 }}
            >
            <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
            <HorizontalAxis tickCount={5} />
            <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} />
            <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
            </Chart>
        </View>
    )
};


export default memo(RankChart);