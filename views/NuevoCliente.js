import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {TextInput, Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) =>{

    const {guardarConsultarAPI} = route.params;

    //Campos formulario
    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');
    const [alerta, guardarAlerta] = useState(false);

    // Almacena el cliente en la BD
    const guardarCliente = async () => {
        //Validar
        if(nombre === '' || telefono === '' || correo === '', empresa === ''){
            guardarAlerta(true);
            return;
        }

        // Generar el cliente
        const cliente = {nombre, telefono, correo, empresa}
        console.log(cliente)

        // Guardar el cliente en la API
        try {

            if(Platform.OS === 'ios'){
                await axios.post('http://localhost:3000/clientes', cliente)
            }else{
                // para android
            await axios.post('http://192.168.0.9:3000/clientes', cliente);
            }

        } catch (error) {
            console.log(error);
        }


        //Redireccionar
        navigation.navigate('Inicio')

        //Limpiar el form
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

        //Cambiar a true para traernos el nuevo cliente
        guardarConsultarAPI(true);
    }

    return(
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
            <TextInput
                label="Nombre"
                placeholder="Axel"
                onChangeText={texto => guardarNombre(texto)}
                value = {nombre}
                style = {styles.input}
            ></TextInput>
            <TextInput
                label="Teléfono"
                placeholder="5543500687"
                onChangeText={texto => guardarTelefono(texto)}
                value={telefono}
                style = {styles.input}
            ></TextInput>
            <TextInput
                label="Correo electrónico"
                placeholder="correo@correo.com"
                onChangeText={texto => guardarCorreo(texto)}
                value={correo}
                style = {styles.input}
            ></TextInput>
            <TextInput
                label="Empresa"
                placeholder="Nombre Empresa"
                onChangeText={texto => guardarEmpresa(texto)}
                value={empresa}
                style = {styles.input}
            ></TextInput>

            <Button icon="pencil-circle" mode="contained" onPress={() => guardarCliente()}>
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={() => guardarAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlerta(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})


export default NuevoCliente;