// NuevoPrestamo.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const NewPrestamo = ({ route }) => {
  const { cedula, saldo } = route.params;
  const [monto, setMonto] = useState('');

  const solicitarPrestamo = () => {
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido');
      return;
    }

    if (montoNum > saldo) {
      Alert.alert('Fondos insuficientes', 'No puedes solicitar un préstamo mayor a tu saldo actual');
    } else {
      Alert.alert('Solicitud enviada', `Has solicitado un préstamo de $${montoNum.toFixed(2)}`);
      // Aquí guardarías la solicitud en una base de datos o estado global
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar nuevo préstamo</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto a solicitar"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <Button title="Solicitar" onPress={solicitarPrestamo} />
    </View>
  );
};

export default NewPrestamo;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 20,
  },
});
