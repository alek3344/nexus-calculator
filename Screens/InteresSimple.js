import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Picker } from 'react-native';

export default function InteresSimple() {
  const [calculo, setCalculo] = useState('interes');
  const [capital, setCapital] = useState('');
  const [tasa, setTasa] = useState('');
  const [tiempoAnios, setTiempoAnios] = useState('');
  const [tiempoMeses, setTiempoMeses] = useState('');
  const [tiempoDias, setTiempoDias] = useState('');
  const [interes, setInteres] = useState('');
  const [monto, setMonto] = useState('');
  const [resultado, setResultado] = useState(null);
  const [formula, setFormula] = useState('');
  const [aplicacionFormula, setAplicacionFormula] = useState('');

  const validarNumeroEntero = (text, setter) => {
    const nuevoValor = text.replace(/[^0-9]/g, '');
    setter(nuevoValor);
  };

  const calcular = () => {
    const C = parseFloat(capital);
    const i = (parseFloat(tasa)/100);
    const t = (parseFloat(tiempoAnios) || 0) + (parseFloat(tiempoMeses) || 0) / 12 + (parseFloat(tiempoDias) || 0) / 365;
    const I = parseFloat(interes);
    const M = parseFloat(monto);

    let resultadoCalculado;
    let formulaUsada;
    let resultadoTexto;
    let aplicacion;
    
    switch (calculo) {
      case 'interes':
        resultadoCalculado = C * i * t;
        aplicacion = 'I = C * i * t';
        formulaUsada = `I = ${C} * ${i} * ${t}`;
        resultadoTexto = `$${resultadoCalculado.toFixed(2)}`;
        break;
      case 'capital':
        resultadoCalculado = I / (i * t);
        aplicacion = 'C = I / i * t';
        formulaUsada = `C = ${I} / (${i} * ${t})`;
        resultadoTexto = `$${resultadoCalculado.toFixed(2)}`;
        break;
      case 'tiempo':
        resultadoCalculado = I / (C * i);
        aplicacion = 't = I / C * i';
        formulaUsada = `t = ${I} / (${C} * ${i})`;
        const totalDias = Math.round(resultadoCalculado * 365);
        const anios = Math.floor(totalDias / 365);
        let diasRestantes = totalDias % 365;
        const meses = Math.floor(diasRestantes / 30);
        const dias = diasRestantes % 30;
        resultadoTexto = `${anios} años, ${meses} meses, ${dias} días`;
        break;
      case 'monto':
        resultadoCalculado = C * (1 + i * t);
        aplicacion = 'M = C * (1 + i * t)';
        formulaUsada = `M = ${C} * (1 + ${i} * ${t})`;
        resultadoTexto = `$${resultadoCalculado.toFixed(2)}`;
        break;
      default:
        resultadoCalculado = null;
    }
    
    setResultado(resultadoTexto);
    setFormula(formulaUsada);
    setAplicacionFormula(aplicacion);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Interés Simple</Text>
      
      <Picker selectedValue={calculo} style={styles.picker} onValueChange={setCalculo}>
        <Picker.Item label="Interés (I)" value="interes" />
        <Picker.Item label="Monto final (M)" value="monto" />
        <Picker.Item label="Capital inicial (C)" value="capital" />
        <Picker.Item label="Tiempo (t)" value="tiempo" />
      </Picker>

      {(calculo !== 'capital') && (
        <TextInput style={styles.input} placeholder="Capital (C)" keyboardType="numeric" value={capital} onChangeText={(text) => validarNumeroEntero(text, setCapital)} />
      )}
      {(calculo !== 'interes' || calculo === 'interes') && (
        <TextInput style={styles.input} placeholder="Tasa de interés (%)" keyboardType="numeric" value={tasa} onChangeText={(text) => validarNumeroEntero(text, setTasa)} />
      )}
      {(calculo === 'capital' || calculo === 'tiempo' ) && (
        <TextInput style={styles.input} placeholder="Interés (I)" keyboardType="numeric" value={interes} onChangeText={(text) => validarNumeroEntero(text, setInteres)} />
      )}

      {(calculo !== 'tiempo') && (
        <View style={styles.rowContainer}>
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Años" keyboardType="numeric" value={tiempoAnios} onChangeText={(text) => validarNumeroEntero(text, setTiempoAnios)} />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Meses" keyboardType="numeric" value={tiempoMeses} onChangeText={(text) => validarNumeroEntero(text, setTiempoMeses)} />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Días" keyboardType="numeric" value={tiempoDias} onChangeText={(text) => validarNumeroEntero(text, setTiempoDias)} />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={calcular}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Resultado: {resultado}</Text>
          <Text style={styles.formula}>Fórmula utilizada: {aplicacionFormula}</Text>
          <Text style={styles.formula}>{formula}</Text>
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
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  smallInput: {
    width: '30%',
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
