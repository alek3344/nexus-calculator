import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



  const handleLogin = () => {
    if (user === 'admin' && password === '1234') {
      navigation.navigate('Menu');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nexus</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
};

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú de Cálculos</Text>
      <Button title="Tasa de Interés" onPress={() => navigation.navigate('TasaInteres')} />
      <Button title="Interés Simple" onPress={() => navigation.navigate('InteresSimple')} />
      <Button title="Interés Compuesto" onPress={() => navigation.navigate('InteresCompuesto')} />
      <Button title="Anualidades" onPress={() => navigation.navigate('Anualidades')} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="TasaInteres" component={TasaInteresScreen} />
        <Stack.Screen name="InteresSimple" component={InteresSimpleScreen} />
        <Stack.Screen name="InteresCompuesto" component={InteresCompuestoScreen} />
        <Stack.Screen name="Anualidades" component={AnualidadesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }
});
