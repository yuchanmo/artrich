import React,{useState,useEffect, useLayoutEffect} from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const styles = StyleSheet.create(
    ({
        cotainer:{
            flex:1
        },
        

    })
);

const Community = ({}) =>{
    return (
        <>
        <View>
        <Card>
            
            
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
            </Card.Actions>
        </Card>
        </View>
        </>
        
    );
}


export default Community;