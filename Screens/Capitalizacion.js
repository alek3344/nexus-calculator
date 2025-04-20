import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CapitalizacionCalculator = () => {
  const [capital, setCapital] = useState('');
  const [tasa, setTasa] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [meses, setMeses] = useState('');
  const [inicioDiferido, setInicioDiferido] = useState('');
  const [inicioDiferidoMeses, setInicioDiferidoMeses] = useState('');
  const [tipo, setTipo] = useState('simple');
  const [resultado, setResultado] = useState(null);
  const [formulaUsada, setFormulaUsada] = useState('');

  const calcularCapitalizacion = () => {
    const C = parseFloat(capital);
    const i = parseFloat(tasa) / 100;

    const tAnios = parseFloat(tiempo || 0);
    const tMeses = parseFloat(meses || 0);
    const t = tAnios + tMeses / 12;

    const dAnios = parseFloat(inicioDiferido || 0);
    const dMeses = parseFloat(inicioDiferidoMeses || 0);
    const d = dAnios + dMeses / 12;

    let M = 0;
    let formula = '';

    switch (tipo) {
      case 'simple':
        M = C * (1 + i * t);
        formula = `M = ${C} × (1 + ${i} × ${t})`;
        break;

      case 'compuesta':
        M = C * Math.pow((1 + i), t);
        formula = `M = ${C} × (1 + ${i})^${t}`;
        break;

      case 'continua':
        M = C * Math.exp(i * t);
        formula = `M = ${C} × e^(${i} × ${t})`;
        break;

      case 'periodica':
        const n = 12;
        M = C * Math.pow((1 + i / n), n * t);
        formula = `M = ${C} × (1 + ${i}/${n})^(${n} × ${t})`;
        break;

      case 'anticipada':
        M = C * Math.pow((1 + i), t) * (1 + i);
        formula = `M = ${C} × (1 + ${i})^${t} × (1 + ${i})`;
        break;

      case 'diferida':
        // Usando la fórmula correcta: M=C(1+r)^(t-t₀) donde t₀ es el periodo de espera
        M = C * Math.pow((1 + i), (t - d));
        formula = `M = ${C} × (1 + ${i})^(${t} - ${d})`;
        break;

      default:
        formula = 'Tipo de capitalización no reconocido.';
    }

    setResultado(`Monto final: ${M.toFixed(2)}`);
    setFormulaUsada(formula);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calculadora de Capitalización</Text>

      <Text style={styles.label}>Capital inicial (C)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej: 1000"
        placeholderTextColor="#888"
        value={capital}
        onChangeText={setCapital}
      />

      <Text style={styles.label}>Tasa de interés anual (%)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej: 5"
        placeholderTextColor="#888"
        value={tasa}
        onChangeText={setTasa}
      />

      <View>
        <Text style={styles.label}>Tiempo (años)  </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ej: 3"
          placeholderTextColor="#888"
          value={tiempo}
          onChangeText={setTiempo}
        />

        <Text style={styles.label}>  Meses  </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ej: 6"
          placeholderTextColor="#888"
          value={meses}
          onChangeText={setMeses}
        />
      </View>

      <View>
        <Text style={styles.label}>Diferida desde (años)  </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ej: 2"
          placeholderTextColor="#888"
          value={inicioDiferido}
          onChangeText={setInicioDiferido}
        />

        <Text style={styles.label}>  Diferida desde (meses)  </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ej: 6"
          placeholderTextColor="#888"
          value={inicioDiferidoMeses}
          onChangeText={setInicioDiferidoMeses}
        />
      </View>

      <Text style={styles.label}>Tipo de capitalización</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          style={styles.picker}
          onValueChange={(itemValue) => setTipo(itemValue)}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Simple" value="simple" />
          <Picker.Item label="Compuesta" value="compuesta" />
          <Picker.Item label="Continua" value="continua" />
          <Picker.Item label="Periódica (mensual)" value="periodica" />
          <Picker.Item label="Anticipada" value="anticipada" />
          <Picker.Item label="Diferida (espera + capitalización)" value="diferida" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularCapitalizacion}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultadoBox}>
          <Text style={styles.resultado}>{resultado}</Text>
          <Text style={styles.formulaLabel}>Fórmula utilizada:</Text>
          <Text style={styles.formula}>{formulaUsada}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20,
    flexGrow: 1,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    color: '#ccc',
    marginBottom: 5,
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#333',
    borderWidth: 1,
  },
  pickerContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#333',
    borderWidth: 1,
  },
  picker: {
    color: '#1e1e1e',
    padding: 10,
  },
  button: {
    backgroundColor: '#7B3FF2',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultadoBox: {
    backgroundColor: '#1a1a1a',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  resultado: {
    color: '#00ffcc',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formulaLabel: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  formula: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
});

export default CapitalizacionCalculator;