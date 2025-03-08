import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function TasaInteres() {
  const [interes, setInteres] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [consumo, setConsumo] = useState('');
  const [dinero, setDinero] = useState('');


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Tasa de Interés</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ingrese el interés (%)"
        keyboardType="numeric"
        value={interes}
        onChangeText={setInteres}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese el tiempo (años)"
        keyboardType="numeric"
        value={tiempo}
        onChangeText={setTiempo}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese el consumo"
        keyboardType="numeric"
        value={consumo}
        onChangeText={setConsumo}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese el dinero de la compra"
        keyboardType="numeric"
        value={dinero}
        onChangeText={setDinero}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2d',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});

