import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const buttonSize = (screenWidth - 60) / 2; // 2 columnas, espacio lateral de 30
const smallerButtonSize = buttonSize * 0.85; // Botones más pequeños para un aspecto más formal

const botonesCalculos = [
  { title: 'Tasa de Interes', screen: 'TasaInteres' },
  { title: 'Interés Simple', screen: 'InteresSimple' },
  { title: 'Interes Compuesto', screen: 'InteresCompuesto' },
  { title: 'Anualidades', screen: 'Anualidades' },
  { title: 'Gradiantes', screen: 'Gradiantes' },
  { title: 'Tasa de Interes de Retorno', screen: 'TasaInteresRetorno' },
  { title: 'Amortizacion', screen: 'Amortizacion' },
  { title: 'Capitalizacion', screen: 'Capitalizacion' },
];

const botonesPrestamos = [
  { title: 'Nuevo Préstamo', screen: 'NewPrestamo' },
  { title: 'Préstamos en Proceso', screen: 'ProcesoPrestamo' },
];

const MenuScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Menú de Cálculos</Text>
        <View style={styles.gridContainer}>
          {botonesCalculos.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => navigation.navigate(btn.screen)}
            >
              <Text style={styles.buttonText}>{btn.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Menú de Préstamos</Text>
        <View style={styles.gridContainer}>
          {botonesPrestamos.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={styles.loanButton}
              onPress={() => navigation.navigate(btn.screen)}
            >
              <Text style={styles.buttonText}>{btn.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#1e1e2d',
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'center',
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: smallerButtonSize,
    height: smallerButtonSize,
    backgroundColor: '#4287f5', // Azul claro más formal
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 3, // Sombra suave para Android
    shadowColor: '#000', // Sombra suave para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loanButton: {
    width: smallerButtonSize,
    height: smallerButtonSize,
    backgroundColor: '#3a7bd5', // Un tono diferente de azul para los préstamos
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
});