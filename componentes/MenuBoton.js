import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const buttonSize = (screenWidth - 60) / 2; // 2 columnas, espacio lateral de 30

const botones = [
  { title: 'Tasa de Interes', screen: 'TasaInteres' },
  { title: 'Interés Simple', screen: 'InteresSimple' },
  { title: 'Interes Compuesto', screen: 'InteresCompuesto' },
  { title: 'Anualidades', screen: 'Anualidades' },
  { title: 'Gradiantes', screen: 'Gradiantes' },
  { title: 'Tasa de Interes de Retorno', screen: 'TasaInteresRetorno' },
  { title: 'Amortizacion', screen: 'Amortizacion' },
  { title: 'Capitalizacion', screen: 'Capitalizacion' },
];

const MenuScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Menú de Cálculos</Text>
      <View style={styles.gridContainer}>
        {botones.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(btn.screen)}
          >
            <Text style={styles.buttonText}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#1e1e2d',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: '#ff5a5f',
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
