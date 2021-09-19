import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { memo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
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
  route : RouteProp<ArtistStackParamList,"Analysis">
  navigation:NativeStackScreenProps<ArtistStackParamList,"Analysis">;
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


const AnalysisTable = () => {
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
      <Text style={styles.titleText}>최근 6개월 순위</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>작가</DataTable.Title>
          <DataTable.Title>상승율</DataTable.Title>          
          <DataTable.Title>평균낙찰가</DataTable.Title>          
          <DataTable.Title>호당낙찰가</DataTable.Title>
          <DataTable.Title>총판매가</DataTable.Title>          
          <DataTable.Title>출품수</DataTable.Title>          
          <DataTable.Title>낙찰율</DataTable.Title>
         

        </DataTable.Header>

        {samples.map((v,i)=>(
          <DataTable.Row key={i.toString()} onPress={()=>navigation.navigate('ArtistDetail',{name:v.artist_name_kor})}>
            <DataTable.Cell>{v.name}</DataTable.Cell>
            <DataTable.Cell>{v.ratio}</DataTable.Cell>          
            <DataTable.Cell>{v.avgprice}</DataTable.Cell>          
            <DataTable.Cell>{v.perprice}</DataTable.Cell>          
            <DataTable.Cell>{v.totalprice}</DataTable.Cell>          
            <DataTable.Cell>{v.numofout}</DataTable.Cell>          
            <DataTable.Cell>{v.successratio}</DataTable.Cell>          
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

export default memo(AnalysisTable);