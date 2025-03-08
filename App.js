import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import TasaInteres from './Screens/TasaInteres';
import InteresSimple from './Screens/InteresSimple';
import InteresCompuesto from './Screens/InteresCompuesto';
import Anualidades from './Screens/Anualidades';
import Login from './Screens/login';
import MenuScreen from './componentes/MenuBoton';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={({ navigation }) => ({
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
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="TasaInteres" component={TasaInteres} />
        <Stack.Screen name="InteresSimple" component={InteresSimple} />
        <Stack.Screen name="InteresCompuesto" component={InteresCompuesto} />
        <Stack.Screen name="Anualidades" component={Anualidades} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
