import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TasaInteresRetorno = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Tasa de Interés de Retorno ✅</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2d',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TasaInteresRetorno;
