import React,{useState,useEffect} from 'react'
import { View, Text ,FlatList ,StyleSheet,Button ,Alert, ActivityIndicator, TouchableOpacity } from 'react-native' 
import Post from './Post'

export default function Feed() {
    const [data,setData]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [error,setError]=useState(null)
    useEffect(()=>{
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then((res)=> res.json())
    .then((data)=> setData(data))
    .then(()=> setIsLoading(false))
    .catch((err)=> setError(err));
    },[]);
    const deleteData = (id) => {
        const newList = data.filter((code) => code.id !== id);
        setData(newList);

      
    }
    const renderItem = ({item,index}) => {
        return (
            <TouchableOpacity onPress={ () => alert(item.body)} >
                <View style = {styles.item}>
                <Text>{item.id +" ) "+item.title}</Text>
                <Button key={item.id}
 
  title="Supprimer"
  color="#841584"
  onPress={() => 
    {deleteData(item.id)}
    }
    
 
/>
            </View>
            </TouchableOpacity>
            
        )
    }

    if(isLoading)
    return (
        <View style={ styles.horizontal}>
            <ActivityIndicator  size="large"  color="#0000ff" />
        </View>);
    else 
        return (
           
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()  }
                />
           
        </View>
        );

}
const styles = StyleSheet.create({
    item:{
        padding:5,
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        justifyContent :'center',
        alignItems:'center',
    },
    container:{
        flex:1,
        justifyContent :'center',
        alignItems:'center',
        paddingTop:50
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        flex: 1,
        justifyContent: "center"
      }
})

