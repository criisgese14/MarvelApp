import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import CharacterCard from './CharacterCard';
import apiParams from '../config';
import axios from 'axios';
import { Searchbar } from 'react-native-paper';
import Loader from './Loader';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';


export default function Home() {

    React.useEffect(() => {
        getData();
    }, []);

    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [search, setSearch ] = React.useState('');
    const [offset, setOffset] = React.useState(0);
    const [searching, setSearching] = React.useState(false)
    const {ts, apikey, hash, baseURL} = apiParams;


    async function getData() {
        try {
            await sumOffset()
            const marvel = await axios.get(`${baseURL}/v1/public/characters`, {
                params: {
                    ts,
                    apikey,
                    hash,
                    offset: offset
                }
            })
            setData([...data, ...marvel.data.data.results]);
            setLoading(false);    
            
        } catch (error) {
            console.log('no se pudo realizar el get:', error)
        };
    };

    async function resetOffset() {
        setOffset(prevState => prevState - prevState);
    }
    
    async function sumOffset() {
        setOffset(prevState => prevState + 20);
    }
    
    async function refreshData() {
        try {
            await resetOffset();
            setSearching(false)
            setLoading(true)
            const marvel = await axios.get(`${baseURL}/v1/public/characters`, {
                params: {
                    ts,
                    apikey,
                    hash,
                }
            })
            setData(marvel.data.data.results);
            setLoading(false);
            await sumOffset()
        } catch (error) {
            console.log('no se pudo realizar el get:', error)
        };
    };

    const getMoreData = () => {
        if(!searching) {
            getData();
        }
    }

    const loader = () => {
        if(!searching){
        return (
            <View>
                <ActivityIndicator size="large" color='red'/>
            </View>
        )} else {
            return (<View></View>)
        }
    }

    async function searchCharacter() {
        if(search) {
            try {
                setLoading(true);
                const data = await axios.get(`${baseURL}/v1/public/characters`, {
                    params: {
                        ts,
                        apikey,
                        hash,
                        nameStartsWith: search
                    }
                })
                setSearching(true)
                setData(data.data.data.results)
                setLoading(false)
                setOffset(0)
                setSearch('')
            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <View style={{flex:1}}>
        {isLoading ? <Loader/> : (
            <View style={styles.container}>
                <View style={styles.header}>
                <Searchbar
                style={styles.searchBar}
                placeholderTextColor='#afafaf'
                iconColor='#8e0000'
                inputStyle={{color:"white", borderRadius: 10}}
                placeholder='Search character...'
                onChangeText={value => setSearch(value)}
                value={search}
                onIconPress={searchCharacter}
                onSubmitEditing={searchCharacter}
                />
                <MaterialCommunityIcons name='refresh' color='white' size={35} onPress={refreshData} style={{flex:1}}/>
                </View>
                {data.length ?      
                <FlatList
                    numColumns={2} 
                    data={data}
                    renderItem={({ item }) => (
                <CharacterCard
                    key={item.id}
                    id={item.id}
                    image={`${item?.thumbnail?.path}.${item?.thumbnail?.extension}`}
                    name={item.name} />
                    )}
                    ListFooterComponent={loader}
                    onEndReached={getMoreData}
                />  : 
                <Text style={styles.error}>Character not found :c</Text>} 
           
            </View>    
        )}
    </View>
  );
}

const styles = StyleSheet.container = ({
    container: {
        flex:1, 
        backgroundColor:"#1B1A17"
    },
    searchBar: {
        backgroundColor:"#595959", 
        marginVertical: 5, 
        marginHorizontal: 8, 
        borderRadius: 20,
        flex: 8
    },
    error: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 250
    },
    header: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems:'center'
    }

})