import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Gradiante = () => {
  const [tipoGradiente, setTipoGradiente] = useState('aritmetico');
  const [tipoValor, setTipoValor] = useState('presente');
  const [A1, setA1] = useState('');
  const [G, setG] = useState('');
  const [i, setI] = useState('');
  const [g, setGg] = useState('');
  const [n, setN] = useState('');
  const [resultado, setResultado] = useState(null);
  const [formulaUsada, setFormulaUsada] = useState('');
  const [aplicacion, setAplicacion] = useState('');

  const calcularGradiente = () => {
    const a1 = parseFloat(A1);
    const incremento = parseFloat(G);
    const interes = parseFloat(i) / 100;
    const tasaG = parseFloat(g) / 100;
    const periodos = parseInt(n);

    let resultadoCalc, formula, uso;

    if (tipoGradiente === 'aritmetico') {
      if (tipoValor === 'presente') {
        resultadoCalc = a1 * ((1 - Math.pow(1 + interes, -periodos)) / interes) +
                        (incremento / interes) * (((1 - Math.pow(1 + interes, -periodos)) / interes) - (periodos / Math.pow(1 + interes, periodos)));

        formula = 'P = A1 * [(1 - (1+i)^-n)/i] + (G/i) * [(1 - (1+i)^-n)/i - n/(1+i)^n]';
        uso = `P = ${a1} * [(1 - (1 + ${interes})^-${periodos}) / ${interes}] + (${incremento} / ${interes}) * [(1 - (1 + ${interes})^-${periodos}) / ${interes} - ${periodos} / (1 + ${interes})^${periodos}]`;
      } else {
        resultadoCalc = a1 * ((Math.pow(1 + interes, periodos) - 1) / interes) +
                        (incremento / interes) * (((Math.pow(1 + interes, periodos) - 1) / interes) - periodos);

        formula = 'F = A1 * [(1+i)^n - 1)/i] + (G/i) * [((1+i)^n - 1)/i - n]';
        uso = `F = ${a1} * [((1 + ${interes})^${periodos} - 1) / ${interes}] + (${incremento} / ${interes}) * [((1 + ${interes})^${periodos} - 1) / ${interes} - ${periodos}]`;
      }
    } else {
      if (tipoValor === 'presente') {
        resultadoCalc = a1 * ((1 - Math.pow((1 + tasaG) / (1 + interes), periodos)) / (interes - tasaG));

        formula = 'P = A1 * [1 - ((1+g)/(1+i))^n / (i - g)]';
        uso = `P = ${a1} * [1 - ((1 + ${tasaG}) / (1 + ${interes}))^${periodos} / (${interes} - ${tasaG})]`;
      } else {
        resultadoCalc = a1 * ((Math.pow(1 + interes, periodos) - Math.pow(1 + tasaG, periodos)) / (interes - tasaG));

        formula = 'F = A1 * [((1+i)^n - (1+g)^n) / (i - g)]';
        uso = `F = ${a1} * [((1 + ${interes})^${periodos} - (1 + ${tasaG})^${periodos}) / (${interes} - ${tasaG})]`;
      }
    }

    setResultado(`$${resultadoCalc.toFixed(2)}`);
    setFormulaUsada(formula);
    setAplicacion(uso);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cálculo de Gradiente</Text>

      <Picker selectedValue={tipoGradiente} style={styles.picker} onValueChange={setTipoGradiente}>
        <Picker.Item label="Gradiente Aritmético" value="aritmetico" />
        <Picker.Item label="Gradiente Geométrico" value="geometrico" />
      </Picker>

      <Picker selectedValue={tipoValor} style={styles.picker} onValueChange={setTipoValor}>
        <Picker.Item label="Valor Presente (P)" value="presente" />
        <Picker.Item label="Valor Futuro (F)" value="futuro" />
      </Picker>

      <TextInput style={styles.input} placeholder="Primer pago" keyboardType="numeric" value={A1} onChangeText={setA1} />
      <TextInput style={styles.input} placeholder="Número de periodos" keyboardType="numeric" value={n} onChangeText={setN} />
      <TextInput style={styles.input} placeholder="Tasa de interés (%)" keyboardType="numeric" value={i} onChangeText={setI} />

      {tipoGradiente === 'aritmetico' && (
        <TextInput style={styles.input} placeholder="Incremento constante" keyboardType="numeric" value={G} onChangeText={setG} />
      )}
      {tipoGradiente === 'geometrico' && (
        <TextInput style={styles.input} placeholder="Tasa de variación (%)" keyboardType="numeric" value={g} onChangeText={setGg} />
      )}

      <TouchableOpacity style={styles.button} onPress={calcularGradiente}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}></Text>
          <Text style={styles.result}>Resultado: {resultado}</Text>
          <Text style={styles.result}></Text>
          <Text style={styles.formula}>Fórmula utilizada: {formulaUsada}</Text>
          <Text style={styles.result}></Text>
          <Text style={styles.formula}>{aplicacion}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e2d',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#2a2a3d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
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
    textAlign: 'center',
  },
});

export default Gradiante;