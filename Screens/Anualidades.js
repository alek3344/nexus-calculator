import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Anualidades() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Anualidades</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2d',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
