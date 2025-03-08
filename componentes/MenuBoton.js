import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú de Cálculos</Text>
      <MenuButton title="Tasa de Interes" onPress={() => navigation.navigate('TasaInteres')} />
      <MenuButton title="Interés Simple" onPress={() => navigation.navigate('InteresSimple')} />
      <MenuButton title="Interes Compuesto" onPress={() => navigation.navigate('InteresCompuesto')} />
      <MenuButton title="Anualidades" onPress={() => navigation.navigate('Anualidades')} />
    </View>
  );
};

const MenuButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Exportamos SOLO MenuScreen
export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2d',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff5a5f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
