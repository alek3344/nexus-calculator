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
      <MenuButton title="Gradiantes" onPress={() => navigation.navigate('Gradiantes')} />
      <MenuButton title="Tasa de Interes de Retorno" onPress={() => navigation.navigate('TasaInteresRetorno')} />
      <MenuButton title="Amortizacion" onPress={() => navigation.navigate('Amortizacion')} />
      <MenuButton title="Capitalizacion" onPress={() => navigation.navigate('Capitalizacion')} />
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

const botones = [
  { label: 'Tasa', icon: require('../assets/images.png') }
];


// Exportamos MenuScreen
export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '45%', // 2 por fila
    aspectRatio: 1, // hace que sea cuadrado
    backgroundColor: '#FFA500', // naranja visible
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

