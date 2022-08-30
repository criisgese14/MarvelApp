import axios from 'axios';
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import apiParams from '../config';
import Comic from './Comic'
import Loader from './Loader';
export default function Comics ({ listComics }) {

    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const { ts, apikey, hash } = apiParams;

    React.useEffect(() => {
        const promisesArray = listComics.map(c => (
            axios.get(c.resourceURI, {
                params: {
                    ts,
                    apikey,
                    hash
                }
            })
        ));

        Promise.all(promisesArray)
            .then(responses => setData(responses.map(r => (
                r?.data?.data?.results[0]
            ))))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []);
    return (
        <View style={styles.container}>
            { isLoading ? <Loader/>
            :
            <FlatList
                data={data}
                renderItem={({ item }) => (
                <Comic
                id={item.id}
                image={`${item?.thumbnail?.path}.${item?.thumbnail?.extension}`}
                name={item.title} />
            )}/>
                }
        </View>
        
    )
}

const styles = StyleSheet.container = ({
    container: {
        flex: 1,
        backgroundColor: "#191919"
    }
})