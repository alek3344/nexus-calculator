import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Amortizacion() {
  const [metodo, setMetodo] = useState('francesa');
  const [capital, setCapital] = useState('');
  const [tasa, setTasa] = useState('');
  const [tiempoAnios, setTiempoAnios] = useState('');
  const [tiempoMeses, setTiempoMeses] = useState('');
  const [tiempoDias, setTiempoDias] = useState('');
  const [frecuencia, setFrecuencia] = useState('mensual');
  const [resultado, setResultado] = useState(null);
  const [formula, setFormula] = useState('');
  const [aplicacion, setAplicacion] = useState('');
  const [tabla, setTabla] = useState([]);

  const validarNumeroEntero = (text, setFunc) => {
    const valor = text.replace(/[^0-9]/g, '');
    setFunc(valor);
  };

  const obtenerPeriodos = () => {
    const anios = parseInt(tiempoAnios || '0');
    const meses = parseInt(tiempoMeses || '0');
    const dias = parseInt(tiempoDias || '0');

    const totalAnios = anios + meses / 12 + dias / 365;

    switch (frecuencia) {
      case 'anual': return totalAnios;
      case 'semestral': return totalAnios * 2;
      case 'trimestral': return totalAnios * 4;
      case 'mensual': return totalAnios * 12;
      case 'quincenal': return totalAnios * 24;
      case 'semanal': return totalAnios * 52;
      default: return totalAnios;
    }
  };

  const calcular = () => {
    let P = parseFloat(capital);
    const r = parseFloat((tasa) / 100)/12;
    const n = obtenerPeriodos();

    let resultadoTexto = '';
    let formulaTexto = '';
    let aplicacionTexto = '';
    let tablaAmortizacion = [];

    if (metodo === 'francesa') {
      const A = P * r / (1 - Math.pow(1 + r, -n));
      formulaTexto = 'A = P * r / (1 - (1 + r)^-n)';
      aplicacionTexto = `A = ${P} * ${r} / (1 - (1 + ${r})^-${n})`;
      for (let t = 1; t <= n; t++) {
        const interes = P * r;
        const amortizacion = A - interes;
        const saldo = P - amortizacion;
        tablaAmortizacion.push({ t, cuota: A, interes, amortizacion, saldo });
        P = saldo;
      }
      resultadoTexto = `Cuota periódica: $${A.toFixed(2)}`;
    } else if (metodo === 'alemana') {
      const A = P / n;
      formulaTexto = 'A = P / n, Ct = A + I';
      aplicacionTexto = `A = ${P} / ${n}`;
      for (let t = 1; t <= n; t++) {
        const interes = P * r;
        const cuota = A + interes;
        const saldo = P - A;
        tablaAmortizacion.push({ t, cuota, interes, amortizacion: A, saldo });
        P = saldo;
      }
      resultadoTexto = `Amortización fija: $${A.toFixed(2)}`;
    } else if (metodo === 'americana') {
      const interes = P * r;
      formulaTexto = 'I = P * r';
      aplicacionTexto = `I = ${P} * ${r}`;
      for (let t = 1; t <= n - 1; t++) {
        tablaAmortizacion.push({ t, cuota: interes, interes, amortizacion: 0, saldo: P });
      }
      tablaAmortizacion.push({ t: n, cuota: P + interes, interes, amortizacion: P, saldo: 0 });
      resultadoTexto = `Interés por período: $${interes.toFixed(2)}`;
    }

    setResultado(resultadoTexto);
    setFormula(formulaTexto);
    setAplicacion(aplicacionTexto);
    setTabla(tablaAmortizacion);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cálculo de Amortización</Text>

      <Picker selectedValue={metodo} onValueChange={setMetodo} style={styles.picker}>
        <Picker.Item label="Francesa" value="francesa" />
        <Picker.Item label="Alemana" value="alemana" />
        <Picker.Item label="Americana" value="americana" />
      </Picker>

      <TextInput style={styles.input} placeholder="Capital inicial (P)" keyboardType="numeric" value={capital} onChangeText={setCapital} />
      <TextInput style={styles.input} placeholder="Tasa de interés (%)" keyboardType="numeric" value={tasa} onChangeText={setTasa} />

      <View style={styles.rowContainer}>
        <TextInput style={styles.smallInput} placeholder="Años" keyboardType="numeric" value={tiempoAnios} onChangeText={(text) => validarNumeroEntero(text, setTiempoAnios)} />
        <TextInput style={styles.smallInput} placeholder="Meses" keyboardType="numeric" value={tiempoMeses} onChangeText={(text) => validarNumeroEntero(text, setTiempoMeses)} />
        <TextInput style={styles.smallInput} placeholder="Días" keyboardType="numeric" value={tiempoDias} onChangeText={(text) => validarNumeroEntero(text, setTiempoDias)} />
      </View>

      <Text style={styles.result}>Frecuencia de las cuotas</Text>
      <Picker selectedValue={frecuencia} onValueChange={setFrecuencia} style={styles.picker}>
        <Picker.Item label="Anual" value="anual" />
        <Picker.Item label="Semestral" value="semestral" />
        <Picker.Item label="Trimestral" value="trimestral" />
        <Picker.Item label="Mensual" value="mensual" />
        <Picker.Item label="Quincenal" value="quincenal" />
        <Picker.Item label="Semanal" value="semanal" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={calcular}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{resultado}</Text>
          <Text style={styles.formula}>Fórmula utilizada: {formula}</Text>
          <Text style={styles.formula}>{aplicacion}</Text>

          <Text style={styles.subtitle}>Tabla de Amortización:</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.cellHeader}>Periodo</Text>
            <Text style={styles.cellHeader}>Cuota</Text>
            <Text style={styles.cellHeader}>Interés</Text>
            <Text style={styles.cellHeader}>Amortiz.</Text>
            <Text style={styles.cellHeader}>Saldo</Text>
          </View>
          {tabla.map((fila, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{fila.t}</Text>
              <Text style={styles.cell}>${fila.cuota.toFixed(2)}</Text>
              <Text style={styles.cell}>${fila.interes.toFixed(2)}</Text>
              <Text style={styles.cell}>${fila.amortizacion.toFixed(2)}</Text>
              <Text style={styles.cell}>${fila.saldo.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1e1e2d',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 15,
    borderRadius: 5,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  smallInput: {
    backgroundColor: '#fff',
    width: '30%',
    padding: 10,
    borderRadius: 5,
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
    width: '100%',
  },
  result: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formula: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    color: '#ddd',
    fontSize: 12,
    textAlign: 'center',
  },
});
