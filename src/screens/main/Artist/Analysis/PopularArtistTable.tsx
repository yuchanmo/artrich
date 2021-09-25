import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { memo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';
import RNFetchBlob from 'rn-fetch-blob';
import ApiUrl from '~/GlobalConstant';
import { commonStyle } from '~/GlobalStyle';
const optionsPerPage = [2, 3, 4];

const styles = StyleSheet.create(({
    ...commonStyle,
  container:{
      margin:7,
  },
//   titleText: {
//       color: "black",
//       fontSize: 20,        
//     }
}));

interface Props{
  Month:string;
  route : RouteProp<ArtistStackParamList,"ArtistTabRoot">
  navigation:NativeStackScreenProps<ArtistStackParamList,"ArtistTabRoot">;    
}

const samples = [
    {
        name:'모유찬',
        ratio:'35%',
        avgprice:'1000',
        perprice:'1200',
        totalprice:'30000',
        numofout:'35',
        successratio:'77%'
    },
    {
        name:'모유찬',
        ratio:'35%',
        avgprice:'1000',
        perprice:'1200',
        totalprice:'30000',
        numofout:'35',
        successratio:'77%'
    },
]


const CollectionChartTrend = ()=>{
  return (
      <Chart
      style={{ height: 80, width: 150 }}
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



const PopularArtistTable = ({route,navigation}:Props)  => {
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  //const [data,setData] = React.useState<Array<FavoriteRank>>([]);

  const initData = async () =>{
    // try {
    //     let res = await RNFetchBlob.fetch('GET', ApiUrl['favoriterank']);
    //     let status = res.info().status;
    //     if(status == 200){                            
    //         //let tmp:Array<ArtDisplayInfo> = [...data, res.data];
    //         setData(res.json());
    //     }        
    // } catch (error) {
    //     Alert.alert('info',error.message);
    //     Alert.alert('info',error.stack);
    // }      
    

};
  React.useEffect(() => {
    setPage(0);
    initData();
  }, []);

  React.useEffect(() => {
    setPage(0);
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>인기판매작가</Text>
   
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex:1,justifyContent:'center'}}>작가</DataTable.Title>
          <DataTable.Title style={{flex:1,justifyContent:'center'}}>상승율</DataTable.Title>          
          <DataTable.Title style={{flex:1,justifyContent:'center'}}>평균낙찰가</DataTable.Title>          
          <DataTable.Title style={{flex:3,justifyContent:'center'}}>차트</DataTable.Title>          
          
          
         

        </DataTable.Header>

        {samples.map((v,i)=>(
          <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail')}>
            <DataTable.Cell style={{flex:1}}>{v.name}</DataTable.Cell>
            <DataTable.Cell style={{flex:1}}>{v.ratio}</DataTable.Cell>          
            <DataTable.Cell style={{flex:1}}>{v.avgprice}</DataTable.Cell>          
                 
            <CollectionChartTrend></CollectionChartTrend>
          </DataTable.Row>
        ))}        

        {/* <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        /> */}
      </DataTable>
      <Divider></Divider>
    </View>
  );
}

export default memo(PopularArtistTable);