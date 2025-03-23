import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function InteresCompuesto() {
  const [valorInicial, setValorInicial] = useState('');
  const [tasaInteres, setTasaInteres] = useState('');
  const [frecuencia, setFrecuencia] = useState('Anual');
  const [anios, setAnios] = useState('');
  const [meses, setMeses] = useState('');
  const [semanas, setSemanas] = useState('');
  const [dias, setDias] = useState('');
  const [semestres, setSemestres] = useState('');
  const [periodos, setPeriodos] = useState('');
  const [resultado, setResultado] = useState('');
  const [tiempoObjetivo, setTiempoObjetivo] = useState({ anios: '', meses: '', semanas: '', dias: '', semestres: '', periodos: '' });

  const calcularInteresCompuesto = () => {
    let P = parseFloat(valorInicial) || 0;
    let r = parseFloat(tasaInteres) / 100 || 0;
    let n;

    switch (frecuencia) {
      case 'Anual': n = 1; break;
      case 'Semestral': n = 2; break;
      case 'Trimestral': n = 4; break;
      case 'Mensual': n = 12; break;
      case 'Diario': n = 365; break;
      default: n = 1;
    }

    let t = (parseInt(anios) || 0) + (parseInt(meses) || 0) / 12 + (parseInt(semanas) || 0) / 52 + (parseInt(dias) || 0) / 365 + (parseInt(semestres) || 0) / 2 + (parseInt(periodos) || 0);
    let A = P * Math.pow(1 + r / n, n * t);

    setResultado(`Monto final en ${t.toFixed(2)} años: ${A.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Interés Compuesto</Text>

      <Text style={styles.label}>Valor Inicial:</Text>
      <TextInput style={styles.input} keyboardType='numeric' value={valorInicial} onChangeText={setValorInicial} />

      <Text style={styles.label}>Tasa de Interés (%):</Text>
      <TextInput style={styles.input} keyboardType='numeric' value={tasaInteres} onChangeText={setTasaInteres} />

      <Text style={styles.label}>Frecuencia de Capitalización:</Text>
      <Picker selectedValue={frecuencia} onValueChange={setFrecuencia} style={styles.picker}>
        <Picker.Item label="Anual" value="Anual" />
        <Picker.Item label="Semestral" value="Semestral" />
        <Picker.Item label="Trimestral" value="Trimestral" />
        <Picker.Item label="Mensual" value="Mensual" />
        <Picker.Item label="Diario" value="Diario" />
      </Picker>

      <Text style={styles.label}>Tiempo:</Text>
      <View style={styles.periodContainer}>
        <TextInput style={styles.periodInput} placeholder="Años" keyboardType='numeric' value={anios} onChangeText={setAnios} />
        <TextInput style={styles.periodInput} placeholder="Meses" keyboardType='numeric' value={meses} onChangeText={setMeses} />
        <TextInput style={styles.periodInput} placeholder="Semanas" keyboardType='numeric' value={semanas} onChangeText={setSemanas} />
      </View>
      <View style={styles.periodContainer}>
        <TextInput style={styles.periodInput} placeholder="Días" keyboardType='numeric' value={dias} onChangeText={setDias} />
        <TextInput style={styles.periodInput} placeholder="Semestres" keyboardType='numeric' value={semestres} onChangeText={setSemestres} />
        <TextInput style={styles.periodInput} placeholder="Periodos" keyboardType='numeric' value={periodos} onChangeText={setPeriodos} />
      </View>

      <Button title="Calcular" onPress={calcularInteresCompuesto} color="#ff5a5f" />

      {resultado !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{resultado}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: { color: '#ff5a5f', fontSize: 24, textAlign: 'center', marginBottom: 20 },
  label: { color: 'white', marginTop: 10 },
  input: { backgroundColor: '#333', color: '#bbb', padding: 10, marginVertical: 10, borderRadius: 5 },
  periodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  periodInput: { flex: 1, marginHorizontal: 5, backgroundColor: '#333', color: '#bbb', padding: 10, borderRadius: 5 },
  picker: { backgroundColor: '#333', color: 'white', marginVertical: 10, padding:10, borderRadius:10 },
  resultContainer: { backgroundColor: '#222', padding: 15, marginTop: 20, borderRadius: 10 },
  resultText: { color: '#FFA500', fontSize: 16 },
});
