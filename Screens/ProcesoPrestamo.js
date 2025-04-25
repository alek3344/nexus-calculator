// PrestamosEnProceso.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const prestamosSimulados = [
  { id: '1', monto: 150, estado: 'Pendiente' },
  { id: '2', monto: 250, estado: 'Aprobado' },
];

const ProcesoPrestamo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Préstamos en proceso</Text>
      <FlatList
        data={prestamosSimulados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Monto: ${item.monto}</Text>
            <Text>Estado: {item.estado}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProcesoPrestamo;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  item: {
    padding: 15, backgroundColor: '#eee', marginBottom: 10, borderRadius: 5,
  },
});
