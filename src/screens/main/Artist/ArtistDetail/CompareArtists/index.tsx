import React,{useState,useEffect, useLayoutEffect,memo} from 'react';
import { Text, View,StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import BarTrendChart from './BarTrendChart';
import PlotTrendChart from './PlotTrendChart';

const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        

    })
);


let xaxis = [...Array(30).keys()];

let sampleGenerator = ():ChartType[]=>{
    return xaxis.map((v,i)=>{
        return {
            x:v,
            y:Math.random()*10
        }
    })
};

type ChartType = {
    x:number;
    y:number;
};
type ChartData = {
    legend:string;
    data:ChartType[];
};


const CompareArtists = ({}) =>{
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'S&P500', value: 'apple'},
        {label: '김선우', value: 'apple'},
        {label: '이우환', value: 'apple'},
        {label: '문형태', value: 'apple'},        
    ]);

 
    const [datas,setDatas] = useState<ChartData[]>([]);
    const [k,setkey] = useState<number>(0);
    const addNewData = (key)=>{
        let m = k+1;
        setkey(m);
        setDatas((old)=>{
            return [...old,{legend:key,data:sampleGenerator()}];
        });
        setValue(key);
    };

  



    return (
        <> 
        <View style={{flex:1}}>
        <Text>artist</Text>
            <Text>ARTIST FILTER</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(v)=>addNewData(v)}
                setItems={setItems}

                multiple={true}
                searchable={true}
                />
            
            

        
        <ScrollView>
            <Text>Condition</Text>
            <PlotTrendChart chartData={datas}></PlotTrendChart>
            <BarTrendChart chartData={datas}></BarTrendChart>
        </ScrollView>
        </View>
        </>
        
    );
}


export default memo(CompareArtists);