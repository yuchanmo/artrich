import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";

import { Platform, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getRandomInt } from "~/utils/random";
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        

    })
);

const barData = {
    labels: ['January', 'February', 'March',],
    datasets: [
      {
        data: [20, 45, 28,],
      },
    ],
    barColors: ["red", "blue", "yello"]
  };



  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  
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

let chartStrokeOption = [ 'red','blue','blak','purple','orange'];



const BarTrendChart = ({chartData}:Props) =>{
 
        
    // const [barData,setBarData] = useState({});
    // useEffect(()=>{

    //     let len = chartData.length;
    //     if(len>0){
    //         let keys = [...Array(len).keys()];
    //         let tmp = {
    //             labels : keys,
    //             datasets : [{
    //                 data : keys.map((v,i)=>getRandomInt(0,15))
    //             }],
    //             barColor : keys.map((v,i)=>chartStrokeOption[i])
    //         };
    //         setBarData(tmp);
    //     }
        

    // },[chartData]);
   

    return (
        <>
       
        <BarChart
                // style={graphStyle}
                data={barData}
                width={screenWidth}
                height={220}
               
                chartConfig={chartConfig}
            />
       
        </>
        
    );
}


export default BarTrendChart;