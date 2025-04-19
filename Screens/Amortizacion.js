import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Amortizacion = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Amortizacion funcionando correctamente 🚀</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Amortizacion;
