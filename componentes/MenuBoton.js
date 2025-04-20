import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';


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
    <ScrollView contentContainerStyle={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
    </ScrollView>
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
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    backgroundColor: '#2e2e3e',
    color: '#fff',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#ff5a5f',
    paddingVertical: 60,
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

