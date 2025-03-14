import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Picker } from 'react-native';

export default function TasaInteres() {
  const [capital, setCapital] = useState('');
  const [montoFinal, setMontoFinal] = useState('');
  const [tiempoAnios, setTiempoAnios] = useState('');
  const [tiempoMeses, setTiempoMeses] = useState('');
  const [tiempoDias, setTiempoDias] = useState('');
  const [tipoTasa, setTipoTasa] = useState('simple');
  const [tasa, setTasa] = useState(null);
  const [formula, setFormula] = useState('');
  const [aplicacionFormula, setAplicacionFormula] = useState('');

  const validarNumeroEntero = (text, setter) => {
    if (/^\d*$/.test(text)) {
      setter(text);
    }
  };

  const calcularTasa = () => {
    const capitalNum = parseInt(capital);
    const montoFinalNum = parseInt(montoFinal);
    const t = (parseInt(tiempoAnios) || 0) + (parseInt(tiempoMeses) || 0) / 12 + (parseInt(tiempoDias) || 0) / 365;
    
    if (capitalNum <= 0 || montoFinalNum <= 0 || t <= 0) {
      setTasa('Error: Verifique los valores ingresados');
      setFormula('');
      setAplicacionFormula('');
      return;
    }

    let tasaCalculada = 0;
    let formulaUsada = '';
    let aplicacion = '';

    if (tipoTasa === 'simple') {
      formulaUsada = 'i = ((M - C) / (C * t)) * 100';
      tasaCalculada = ((montoFinalNum - capitalNum) / (capitalNum * t)) * 100;
      aplicacion = `i = ((${montoFinalNum} - ${capitalNum}) / (${capitalNum} * ${t.toFixed(2)})) * 100`;
    } else if (tipoTasa === 'compuesta') {
      formulaUsada = 'i = ((M / C) ^ (1/t)) - 1 * 100';
      tasaCalculada = (Math.pow(montoFinalNum / capitalNum, 1 / t) - 1) * 100;
      aplicacion = `i = ((${montoFinalNum} / ${capitalNum}) ^ (1/${t.toFixed(2)})) - 1 * 100`;
    }

    setTasa(tasaCalculada.toFixed(2) + ' %');
    setFormula(formulaUsada);
    setAplicacionFormula(aplicacion);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Tasa de Interés</Text>
      
      <Picker selectedValue={tipoTasa} style={styles.picker} onValueChange={setTipoTasa}>
        <Picker.Item label="Tasa de interés Simple" value="simple" />
        <Picker.Item label="Tasa de interés Compuesto" value="compuesta" />
      </Picker>

      <TextInput style={styles.input} placeholder="Capital inicial ($)" keyboardType="numeric" value={capital} onChangeText={(text) => validarNumeroEntero(text, setCapital)} />
      <TextInput style={styles.input} placeholder="Monto final ($)" keyboardType="numeric" value={montoFinal} onChangeText={(text) => validarNumeroEntero(text, setMontoFinal)} />

      <View style={styles.rowContainer}>
        <TextInput style={styles.smallInput} placeholder="Años" keyboardType="numeric" value={tiempoAnios} onChangeText={(text) => validarNumeroEntero(text, setTiempoAnios)} />
        <TextInput style={styles.smallInput} placeholder="Meses" keyboardType="numeric" value={tiempoMeses} onChangeText={(text) => validarNumeroEntero(text, setTiempoMeses)} />
        <TextInput style={styles.smallInput} placeholder="Días" keyboardType="numeric" value={tiempoDias} onChangeText={(text) => validarNumeroEntero(text, setTiempoDias)} />
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularTasa}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {tasa !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Tasa de Interés: {tasa}</Text>
          <Text style={styles.formula}>Fórmula utilizada: {formula}</Text>
          <Text style={styles.formula}>{aplicacionFormula}</Text>
        </View>
      )}
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
  smallInput: {
    width: '30%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#2a2a3d',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  result: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  formula: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
});