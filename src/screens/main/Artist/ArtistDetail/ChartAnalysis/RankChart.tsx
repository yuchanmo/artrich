import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
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
            x:`${v.toString()}-${v.toString()}`,
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

    let filterButton = {'평균낙찰가':'avg','TOTAL RANK':'total','호당낙찰가':'canvas','최고낙찰가':'max','총낙찰가':'sum','출품수':'count'};
    let [filterKey,setFilterKey] = React.useState<string>('avg');
    let [tableData,setTableData] = React.useState<any[]>();

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
            <View>
            <LineChart
                data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ],
                    
                    },
                    {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ],
                        
                        }
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
            </View>
        </View>
    )
};


export default memo(RankChart);