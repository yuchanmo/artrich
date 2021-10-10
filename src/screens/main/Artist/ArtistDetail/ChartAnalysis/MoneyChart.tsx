import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import RNFetchBlob from 'rn-fetch-blob';
import ApiUrl from '~/GlobalConstant';
import { commonStyle } from '~/GlobalStyle';

const windowWidth = Dimensions.get('window').width;
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
        },
        filterBtnContainer:{
            alignContent:'space-between',
            justifyContent:'space-between',
            alignItems:'center'
            
          },
          filterBtn:{
            width:windowWidth/3.3,
            margin:1
          },

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

interface DetailLineChartData{
    x:any[];
    y:[{data:number[]}[]];
}

interface ArtistDetailMoneyChart{
    avg:DetailLineChartData;
    canvas:DetailLineChartData;
    
}

interface Props{
    artist_id:number;
}


let initChartData = {x:[0,],y:[{data:[0,],color:(opacity = 1) => `rgba(0, 0, 0, ${opacity})`,stroke:2},]};

let colors = [(opacity = 1) => `rgba(0, 0, 0, ${opacity})`,(opacity = 1) => `rgba(255, 0, 0, ${opacity})`,(opacity = 1) => `rgba(0, 0, 255, ${opacity})`];

const MoneyChart = ({artist_id}:Props)=>{
    const [data,setData] =React.useState<ArtistDetailMoneyChart>({avg:initChartData,canvas:initChartData});
    const initData = async () =>{
        try {
            let res = await RNFetchBlob.fetch('GET', `${ApiUrl['artistdetailmoney']}?artistid=${artist_id}`);      
            let tmp = res.json();
            for(let i = 0;i<3;i++){
                tmp['avg']['y'][i]['color']=colors[i];
                tmp['avg']['y'][i]['stroke']=2;
                tmp['canvas']['y'][i]['color']=colors[i];
                tmp['canvas']['y'][i]['stroke']=2;
                

            }
            
            setData(tmp);            
            setChartData(tmp['avg'])    
        } catch (error) {
            // Alert.alert('info',error.message);
            // Alert.alert('info',error.stack);
        }      
        

    };
    React.useEffect(() => {    
        initData();
    }, []);


    // let chart_keys = Object.keys(datas);
    // const [chartKey,setChartKey] = useState<string>(chart_keys[0]);
    // const [chartData,setChartData] = useState(datas[chart_keys[0]]);

    let filterButton = {'평균낙찰가':'avg','호당낙찰가':'canvas'};
    let [filterKey,setFilterKey] = React.useState<string>('avg');
    let [chartData,setChartData] = React.useState<DetailLineChartData>(initChartData);

    let changeData = (k:string)=>{
        setChartData(data[filterKey]);
    };

    return (
        <View>
            <Text style={styles.titleText}>디테일차트분석</Text>
            <View style={styles.filterBtnContainer}>
            <FlatList                  
                  numColumns={3}             
                  data={Object.keys(filterButton)}
                  renderItem={({index,item})=><Button style={styles.filterBtn} mode={'outlined'} onPress={()=>{
                    setChartData(data[filterButton[item]]);
                    setFilterKey(filterButton[item]);
                  }}>{item}</Button>}
                  keyExtractor={(i) =>  i.toString()}
              >
              </FlatList>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                
            <LineChart
                bezier
                data={{
                labels: chartData['x'],
                legend:chartData['legend'],
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


export default memo(MoneyChart);