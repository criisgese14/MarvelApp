import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import Information from "./Information";
import Comics from "./Comics";
import apiParams from "../config";
import axios from 'axios'
import Loader from "./Loader";

const Tab = createBottomTabNavigator();

export default function Detail({ route }) {

  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;

  React.useEffect(() => {
    async function getData(){
    try {
      const data = await axios.get(`${baseURL}/v1/public/characters/${route.params.id}`, {
        params: {
          ts,
          apikey,
          hash
        }
      });
      setData(data.data.data.results[0])
      setLoading(false);
    } catch (error) {
      console.log("no se pudo traer los detalles del personaje: ", error);
    };
  }
  getData();
  }, []);

  return (
    <Tab.Navigator 
      initialRouteName="Information" 
      screenOptions={{
        headerStyle: {backgroundColor: "#191919"},
        headerTintColor: "white",
        "tabBarActiveTintColor": "darkred",
        "tabBarStyle": [
          {
            "backgroundColor":"#191919",
            "display": "flex"
          },
          null
        ]
      }}>
      <Tab.Screen 
        name="Information" 
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="information-circle" color={color} size={size} />
            )
          }}
      >
        {() =>
          (isLoading
            ? <Loader/>
            : <Information
                image={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
                name={data.name}
                description={data.description}
                />
                )}
      </Tab.Screen>
      <Tab.Screen 
        name="Comics" 
        options={{
          tabBarIcon: ({ color, size }) => ( 
            <MaterialCommunityIcons name='book' color={color} size={size}/>
          )
        }}
      >
        {() =>
          (isLoading ? <Loader/> : <Comics listComics={data?.comics?.items}/>)}
      </Tab.Screen>
    </Tab.Navigator>
  );
}