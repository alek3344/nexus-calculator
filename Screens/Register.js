import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { app } from '../Config/firebaseConfig';
import * as Crypto from 'expo-crypto';

const db = getFirestore(app);

const RegisterScreen = ({ navigation }) => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saldo, setSaldo] = useState(''); // ← NUEVO estado para saldo

  const handleRegister = async () => {
    if (!cedula || !password || !confirmPassword || !saldo) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!/^\d{10}$/.test(cedula)) {
      Alert.alert('Error', 'La cédula debe contener exactamente 10 dígitos numéricos');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (isNaN(parseFloat(saldo)) || parseFloat(saldo) < 0) {
      Alert.alert('Error', 'Saldo inválido. Debe ser un número positivo');
      return;
    }

    try {
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('cedula', '==', cedula));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        Alert.alert('Error', 'Esa cédula ya está registrada');
        return;
      }

      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      await addDoc(usuariosRef, {
        cedula,
        password: hashedPassword,
        saldo: parseFloat(saldo), // ← Guarda el saldo como número
        huellasRegistradas: false,
      });

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Cédula"
        placeholderTextColor="#ccc"
        maxLength={10}
        keyboardType="numeric"
        value={cedula}
        onChangeText={setCedula}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Saldo inicial"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={saldo}
        onChangeText={setSaldo}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#2e2e3e',
    color: '#fff',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4db8ff',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
