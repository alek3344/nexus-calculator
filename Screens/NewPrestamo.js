import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de instalar este paquete
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const NewPrestamo = () => {
  const [tipoCalculo, setTipoCalculo] = useState('Amortizacion');
  const [monto, setMonto] = useState('');
  const [interes, setInteres] = useState('');
  const [periodos, setPeriodos] = useState('');
  const [cuota, setCuota] = useState('');

  const calcularCuota = () => {
    const montoNum = parseFloat(monto);
    const interesNum = parseFloat(interes) / 100; // convertir a decimal
    const periodosNum = parseInt(periodos);

    if (isNaN(montoNum) || isNaN(interesNum) || isNaN(periodosNum) || montoNum <= 0 || interesNum <= 0 || periodosNum <= 0) {
      Alert.alert('Error', 'Completa todos los campos con valores válidos');
      return;
    }

    let resultado = 0;

    switch (tipoCalculo) {
      case 'TasaInteres':
        resultado = interesNum * 100;
        break;

      case 'InteresSimple':
        resultado = montoNum * interesNum * periodosNum;
        break;

      case 'InteresCompuesto':
        resultado = montoNum * Math.pow(1 + interesNum, periodosNum);
        break;

      case 'Anualidades':
        resultado = (montoNum * interesNum) / (1 - Math.pow(1 + interesNum, -periodosNum));
        break;

      case 'Gradiantes':
        resultado = (montoNum / interesNum) - (periodosNum / interesNum);
        break;

      case 'Tasa_interes_retorno':
        resultado = ((Math.pow((montoNum + interesNum) / montoNum, 1 / periodosNum)) - 1) * 100;
        break;

      case 'Capitalizacion':
        resultado = montoNum * Math.pow(1 + interesNum, periodosNum);
        break;

      case 'Amortizacion':
        resultado = (montoNum * interesNum) / (1 - Math.pow(1 + interesNum, -periodosNum));
        break;

      default:
        resultado = 0;
        break;
    }

    setCuota(resultado.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Solicitar Préstamo</Text>
      <Text style={styles.subHeader}>Simulación de Préstamo</Text>
      <Text style={styles.infoText}>
        Este cálculo te muestra cómo se distribuyen tus pagos mensuales en capital e intereses.
      </Text>
      <Text style={styles.infoText}>Tasa de interés fija: {interes || '12.0'}%</Text>

      <Text style={styles.label}>Tipo de Cálculo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoCalculo}
          onValueChange={(itemValue) => setTipoCalculo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Tasa de Interés" value="TasaInteres" />
          <Picker.Item label="Interés Simple" value="InteresSimple" />
          <Picker.Item label="Interés Compuesto" value="InteresCompuesto" />
          <Picker.Item label="Anualidades" value="Anualidades" />
          <Picker.Item label="Gradiantes" value="Gradiantes" />
          <Picker.Item label="Tasa de Interés de Retorno" value="Tasa_interes_retorno" />
          <Picker.Item label="Capitalización" value="Capitalizacion" />
          <Picker.Item label="Amortización" value="Amortizacion" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Monto del Préstamo ($)"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <TextInput
        style={styles.input}
        placeholder="Tasa de Interés (%)"
        keyboardType="numeric"
        value={interes}
        onChangeText={setInteres}
      />
      <TextInput
        style={styles.input}
        placeholder="Períodos (meses)"
        keyboardType="numeric"
        value={periodos}
        onChangeText={setPeriodos}
      />

      <View style={styles.buttonContainer}>
        <Button title="Calcular" onPress={calcularCuota} color="#4CAF50" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Cuota Mensual"
        value={cuota}
        editable={false}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Solicitar Préstamo"
          onPress={async () => {
            try {
              const solicitud = {
                tipoCalculo,
                monto: parseFloat(monto),
                interes: parseFloat(interes),
                periodos: parseInt(periodos),
                cuota: parseFloat(cuota),
                timestamp: new Date()
              };
          
              const db = getFirestore(); // <- importado de firebase.js
              await addDoc(collection(db, 'prestamos'), solicitud);
          
              Alert.alert('¡Solicitud enviada!', 'Tu solicitud ha sido guardada.');
              // Opcional: reiniciar campos
              setMonto('');
              setInteres('');
              setPeriodos('');
              setCuota('');
            } catch (err) {
              console.error('Error guardando solicitud: ', err);
              Alert.alert('Error', 'No se pudo guardar tu solicitud.');
            }
          }}
          
          color="#4CAF50"
        />
      </View>
    </View>
  );
};

export default NewPrestamo;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  subHeader: { fontSize: 18, color: '#b0ffb0', marginBottom: 10 },
  infoText: { color: '#aaa', marginBottom: 5 },
  label: { color: '#fff', marginTop: 10, marginBottom: 5 },
  pickerContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: '#fff',
    ...Platform.select({
      android: {
        color: '#fff',
      },
    }),
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    marginBottom: 15,
  },
});
