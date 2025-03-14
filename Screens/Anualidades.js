import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Anualidades = () => {
  const [A, setA] = useState('');
  const [i, setI] = useState('');
  const [anios, setAnios] = useState('');
  const [meses, setMeses] = useState('');
  const [semanas, setSemanas] = useState('');
  const [semestres, setSemestres] = useState('');
  const [periodos, setPeriodos] = useState('');
  const [dias, setDias] = useState('');
  const [tipoAnualidad, setTipoAnualidad] = useState('Ordinaria');
  const [resultadoVF, setResultadoVF] = useState('');
  const [resultadoVA, setResultadoVA] = useState('');
  const [formulaVF, setFormulaVF] = useState('');
  const [formulaVA, setFormulaVA] = useState('');
  const [frecuenciaPago, setFrecuenciaPago] = useState('Anual');
  const [frecuenciaPeriodo, setFrecuenciaPeriodo] = useState('Anual');

  const calcularAnualidad = () => {
    let A_val = parseFloat(A) || 0;
    let i_val = parseFloat(i) / 100 || 0;
    let n_val =
      (parseInt(anios) || 0) +
      (parseInt(meses) || 0) / 12 +
      (parseInt(semanas) || 0) / 52 +
      (parseInt(semestres) || 0) * 6 / 12 +
      (parseInt(periodos) || 0) * 4 / 12 +
      (parseInt(dias) || 0) / 365;

    if (A_val === 0 || i_val === 0 || n_val === 0) {
      setResultadoVF('Valores inválidos');
      setResultadoVA('Valores inválidos');
      return;
    }

    let VF, VA, formulaVF_calc, formulaVA_calc;
    if (tipoAnualidad === 'Ordinaria') {
      VF = A_val * ((Math.pow(1 + i_val, n_val) - 1) / i_val);
      VA = A_val * ((1 - Math.pow(1 + i_val, -n_val)) / i_val);
      formulaVF_calc = `VF = ${A_val} * [(1 + ${i_val})^${n_val} - 1] / ${i_val}`;
      formulaVA_calc = `VA = ${A_val} * [1 - (1 + ${i_val})^-${n_val}] / ${i_val}`;
    } else if (tipoAnualidad === 'Anticipada') {
      VF = A_val * ((Math.pow(1 + i_val, n_val) - 1) / i_val) * (1 + i_val);
      VA = A_val * ((1 - Math.pow(1 + i_val, -n_val)) / i_val) * (1 + i_val);
      formulaVF_calc = `VF = ${A_val} * [(1 + ${i_val})^${n_val} - 1] / ${i_val} * (1 + ${i_val})`;
      formulaVA_calc = `VA = ${A_val} * [1 - (1 + ${i_val})^-${n_val}] / ${i_val} * (1 + ${i_val})`;
    } else {
      VF = (A_val * ((Math.pow(1 + i_val, n_val) - 1) / i_val)) / Math.pow(1 + i_val, n_val);
      VA = (A_val * ((1 - Math.pow(1 + i_val, -n_val)) / i_val)) / Math.pow(1 + i_val, n_val);
      formulaVF_calc = `VF = (${A_val} * [(1 + ${i_val})^${n_val} - 1] / ${i_val}) / (1 + ${i_val})^${n_val}`;
      formulaVA_calc = `VA = (${A_val} * [1 - (1 + ${i_val})^-${n_val}] / ${i_val}) / (1 + ${i_val})^${n_val}`;
    }

    setResultadoVF(`Valor Final: ${VF.toFixed(2)}`);
    setResultadoVA(`Valor Actual: ${VA.toFixed(2)}`);
    setFormulaVF(`Fórmula VF: ${formulaVF_calc}`);
    setFormulaVA(`Fórmula VA: ${formulaVA_calc}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Anualidades</Text>

      <Text style={styles.label}>Valor de la anualidad (A):</Text>
      <TextInput style={styles.input} keyboardType='numeric' value={A} onChangeText={setA} />

      <Text style={styles.label}>Tasa de interés (%):</Text>
      <TextInput style={styles.input} keyboardType='numeric' value={i} onChangeText={setI} />

      <Text style={styles.label}>Periodo de tiempo:</Text>

      <Text style={styles.subLabel}>Años - Meses - Semanas</Text>
      <View style={styles.periodContainer}>
        <TextInput style={styles.periodInput} keyboardType='numeric' placeholder="Años" value={anios} onChangeText={setAnios} />
        <TextInput style={styles.periodInput} keyboardType='numeric' placeholder="Meses" value={meses} onChangeText={setMeses} />
        <TextInput style={styles.periodInput} keyboardType='numeric' placeholder="Semanas" value={semanas} onChangeText={setSemanas} />
      </View>

      <Text style={styles.subLabel}>Semestres - Periodos - Días</Text>
      <View style={styles.periodContainer}>
        <TextInput style={styles.periodInput} keyboardType='numeric' placeholder="Semestres" value={semestres} onChangeText={setSemestres} />
        <TextInput style={styles.periodInput} keyboardType='numeric' placeholder="Periodos" value={periodos} onChangeText={setPeriodos} />
        <TextInput style={styles.periodInput} keyboardType='numeric' placeholder="Días" value={dias} onChangeText={setDias} />
      </View>

      <Text style={styles.label}>Tipo de Anualidad:</Text>
      <Picker selectedValue={tipoAnualidad} onValueChange={setTipoAnualidad} style={styles.picker}>
        <Picker.Item label="Ordinaria" value="Ordinaria" />
        <Picker.Item label="Anticipada" value="Anticipada" />
        <Picker.Item label="Diferida" value="Diferida" />
      </Picker>

      <Button title="Calcular" onPress={calcularAnualidad} color="#ff5a5f" />

      {resultadoVF !== '' && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultText}>{resultadoVF}</Text>
          <Text style={styles.resultText}>{resultadoVA}</Text>
          <Text style={styles.formulaText}>{formulaVF}</Text>
          <Text style={styles.formulaText}>{formulaVA}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: { color: '#ff5a5f', fontSize: 24, textAlign: 'center', marginBottom: 20 },
  label: { color: 'white', marginTop: 10 },
  subLabel: { color: '#ccc', marginTop: 10, fontSize: 14 },
  input: { backgroundColor: '#333', color: '#bbb', padding: 10, marginVertical: 10, borderRadius: 5 },
  periodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  periodInput: { flex: 1, marginHorizontal: 5, backgroundColor: '#333', color: '#bbb', padding: 10, borderRadius: 5 },
  picker: { backgroundColor: '#333', color: 'white', marginVertical: 10 },
  resultadoContainer: { backgroundColor: '#222', padding: 15, marginTop: 20, borderRadius: 10 },
  resultText: { color: '#FFA500', fontSize: 16 },
  formulaText: { color: 'white', marginTop: 10 }
});

export default Anualidades;