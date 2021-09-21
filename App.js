import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetalleCliente from './views/DetalleCliente';
import BarraSuperior from './components/ui/Barra';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import {DefaultTheme, Provider} from 'react-native-paper';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 


const Stack = createStackNavigator();

// Definir el tema
const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}

console.log(theme);

const App = ()  => {
  return (
    <>
    <SafeAreaProvider>
    <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle:{
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle:{
                fontWeight: 'bold'
              }
            }}
          >
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={ ({navigation, route}) => ({
                headerTitleAlign: 'center',
                headerLeft: (props) => <BarraSuperior {...props}
                                        navigation={navigation}
                                        route={route}

                />
              })}
            />
            
            <Stack.Screen
              name="NuevoCliente"
              component={NuevoCliente}
              options={{
                title: "Nuevo Cliente"
              }}
            />
            
            <Stack.Screen
              name="DetalleCliente"
              component={DetalleCliente}
              options={{
                title: "Detalles Cliente"
              }}
            />
            
          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
      </SafeAreaProvider>

    </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
