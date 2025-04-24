import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

// Pantallas importadas
import Login from './Screens/Login';
import MenuScreen from './componentes/MenuBoton';
import TasaInteres from './Screens/TasaInteres';
import InteresSimple from './Screens/InteresSimple';
import InteresCompuesto from './Screens/InteresCompuesto';
import Anualidades from './Screens/Anualidades';
import Gradiantes from './Screens/Gradiantes';
import TasaInteresRetorno from './Screens/Tasa_interes_retorno';
import Capitalizacion from './Screens/Capitalizacion';
import Amortizacion from './Screens/Amortizacion';
import Register from './Screens/Register';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={({ navigation }) => ({
            title: 'Menú',
            headerRight: () => (
              <MaterialIcons 
                name="exit-to-app" 
                size={24} 
                color="white" 
                style={{ marginRight: 15 }} 
                onPress={() => navigation.navigate('Login')} 
              />
            ),
            headerStyle: { backgroundColor: '#1e1e2d' },
            headerTintColor: '#fff',
          })} 
        />

        {/* Pantallas de cálculos */}
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="TasaInteres" component={TasaInteres} />
        <Stack.Screen name="InteresSimple" component={InteresSimple}/>
        <Stack.Screen name="InteresCompuesto" component={InteresCompuesto} />
        <Stack.Screen name="Anualidades" component={Anualidades} />
        <Stack.Screen name="Gradiantes" component={Gradiantes} />
        <Stack.Screen name="TasaInteresRetorno" component={TasaInteresRetorno} />
        <Stack.Screen name="Capitalizacion" component={Capitalizacion} />
        <Stack.Screen name="Amortizacion" component={Amortizacion} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
