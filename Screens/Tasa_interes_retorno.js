import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const TIRCalculator = () => {
  const [inversion, setInversion] = useState('');
  const [anios, setAnios] = useState('');
  const [meses, setMeses] = useState('');
  const [flujos, setFlujos] = useState('');
  const [resultado, setResultado] = useState(null);
  const [formulaUsada, setFormulaUsada] = useState('');

  const parseFlujos = (texto) => {
    return texto.split(',').map(f => parseFloat(f.trim()));
  };

  const VPN = (C0, flujos, r) => {
    let total = -C0;
    for (let t = 1; t <= flujos.length; t++) {
      total += flujos[t - 1] / Math.pow(1 + r, t);
    }
    return total;
  };

  const derivadaVPN = (flujos, r) => {
    let d = 0;
    for (let t = 1; t <= flujos.length; t++) {
      d -= (t * flujos[t - 1]) / Math.pow(1 + r, t + 1);
    }
    return d;
  };

  const calcularTIR = () => {
    const C0 = parseFloat(inversion);
    const f = parseFlujos(flujos);
    let r = 0.1;
    let iter = 0;
    let delta;
    do {
      const f1 = VPN(C0, f, r);
      const f2 = derivadaVPN(f, r);
      delta = f1 / f2;
      r -= delta;
      iter++;
    } while (Math.abs(delta) > 0.00001 && iter < 1000);

    const porcentaje = (r * 100).toFixed(2);
    setResultado(porcentaje);

    // Armar fórmula usada
    let formula = `VPN = `;
    for (let t = 1; t <= f.length; t++) {
      formula += `(${f[t - 1]}/(1 + ${r.toFixed(5)})^${t}) + `;
    }
    formula = formula.slice(0, -3); // quitar último +
    formula += ` - ${C0}`;
    setFormulaUsada(formula);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cálculo de TIR</Text>

      <Text style={styles.label}>Inversión inicial (C₀)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Inversión inicial (C₀)"
        placeholderTextColor="#999"
        value={inversion}
        onChangeText={setInversion}
      />

<Text style={styles.label}>Duración del proyecto</Text>
    <View style={styles.row}>
      <TextInput
        style={[styles.input, styles.halfInput]}
        keyboardType="numeric"
        placeholder="Años"
        placeholderTextColor="#999"
        value={anios}
        onChangeText={setAnios}
      />
      <TextInput
        style={[styles.input, styles.halfInput]}
        keyboardType="numeric"
        placeholder="Meses"
        placeholderTextColor="#999"
        value={meses}
        onChangeText={setMeses}
      />
    </View>

    <Text style={styles.label}>Flujos de caja anuales (Fₜ)</Text>
      <TextInput
        style={styles.input}
        placeholder="Flujos de caja separados por coma (ej: 1000,1500,2000)"
        placeholderTextColor="#999"
        value={flujos}
        onChangeText={setFlujos}
      />

      <TouchableOpacity style={styles.button} onPress={calcularTIR}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultadoBox}>
          <Text style={styles.resultado}>Resultado: {resultado}%</Text>
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
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 5,
  },
  label: {
    color: '#ccc',
    marginBottom: 5,
    marginTop: 10,
    fontWeight: '600',
  },  
});

export default TIRCalculator;
