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

type ChartType = {
    x:number;
    y:number;
};
type ChartData = {
    legend:string;
    data:ChartType[];
};

type Props = {
    chartData : ChartData[];
};

let chartStrokeOption = [
    { stroke: { color: 'red', width: 3 } },
    { stroke: { color: 'blue', width: 3 } },
    { stroke: { color: 'black', width: 3 } },
    { stroke: { color: 'purple', width: 3 } },
    { stroke: { color: 'orange', width: 3 } },    
    { stroke: { color: 'green', width: 3 } },    
    { stroke: { color: 'blue', width: 3 } },    
    
]




const PlotTrendChart = ({chartData}:Props)=>{
    // let chart_keys = Object.keys(datas);
    // const [chartKey,setChartKey] = useState<string>(chart_keys[0]);
    // const [chartData,setChartData] = useState(datas[chart_keys[0]]);

    // let changeData = (k:string)=>{
    //     setChartData(datas[k]);
    // };

    return (
        <View>
            <Text style={styles.titleText}>순위차트</Text>
           
            <Chart
            style={{ height: 250, width: 400 }}
            
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
            xDomain={{ min: 0, max: 20 }}
            yDomain={{ min: 0, max: 20 }}
            >
            <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
            <HorizontalAxis tickCount={5} />
            {chartData.map((item,idx)=>
                <Line data={item.data} smoothing="cubic-spline" theme={{ ...chartStrokeOption[idx], scatter: { default: { width: 4, height: 4, rx: 2 }} }} />)}
            </Chart>
        </View>
    )
};


export default memo(PlotTrendChart);