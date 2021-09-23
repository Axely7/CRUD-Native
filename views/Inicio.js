import React, {useEffect, useState} from 'react'
import {Text, FlatList, View, ListViewBase, StyleSheet} from 'react-native';
import axios from 'axios';
import {List, Headline, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({navigation}) =>{

    //state de la app
    const [clientes, guardarClientes] = useState([]);
    const [consultarAPI, guardarConsultarAPI] = useState(true);

    useEffect(() =>{
        const obtenerClientesApi = async () => {
            try {
                const resultado = await axios.get('http://192.168.0.9:3000/clientes');
                guardarClientes(resultado.data);
                guardarConsultarAPI(false);
            } catch (error) {
                console.log(error);
            }
        }

        if(consultarAPI){
            obtenerClientesApi();
        }
        

    }, [consultarAPI]);


    return(
        <View style={globalStyles.contenedor}>

            <Button icon="plus-circle" onPress={() => navigation.navigate("NuevoCliente", {guardarConsultarAPI})}
>
                Nuevo Cliente
            </Button>

            <Headline style={globalStyles.titulo}>{ clientes.length > 0 ? "Clientes" : "Aún no hay clientes"}</Headline>
            <FlatList
                data={clientes}
                keyExtractor={cliente => (cliente.id).toString()}
                renderItem={({item}) => (
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                    ></List.Item>
                )}
            
            ></FlatList>

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate("NuevoCliente", {guardarConsultarAPI})}
            ></FAB>
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
})

export default Inicio