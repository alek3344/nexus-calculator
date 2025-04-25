import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../Config/firebaseConfig';
import * as Crypto from 'expo-crypto';

const db = getFirestore(app);

const Login = ({ navigation }) => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleLogin = async () => {
    if (!cedula || !password) {
      Alert.alert('Error', 'Debes ingresar la cédula y la contraseña');
      return;
    }

    try {
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('cedula', '==', cedula));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Alert.alert('Error', 'Cédula o contraseña incorrecta');
        return;
      }

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();

      const inputPasswordHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      if (inputPasswordHash === userData.password) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('Menu');
      } else {
        Alert.alert('Error', 'Cédula o contraseña incorrecta');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      if (!cedula) {
        Alert.alert('Ingrese cédula', 'Debes ingresar tu cédula para usar la autenticación biométrica');
        return;
      }

      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('cedula', '==', cedula));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Alert.alert('Error', 'Usuario no encontrado');
        return;
      }

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();

      if (!userData.huellasRegistradas) {
        Alert.alert('Error', 'Este usuario no tiene huella registrada. Regístrala desde la pantalla de registro.');
        return;
      }

      const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if (!biometricRecords) {
        Alert.alert(
          'No hay huellas en el dispositivo',
          'Debes registrar al menos una huella en el dispositivo para usar esta función.'
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticación biométrica',
        cancelLabel: 'Cancelar',
      });

      if (result.success) {
        Alert.alert('Autenticación exitosa', 'Bienvenido');
        navigation.navigate('Menu');
      } else {
        Alert.alert('Falló la autenticación', 'Inténtalo nuevamente');
      }

    } catch (error) {
      console.error("Error en autenticación biométrica:", error);
      Alert.alert('Error', 'No se pudo autenticar: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Nexus</Text>

        <TextInput
          style={styles.input}
          placeholder="Cédula"
          placeholderTextColor="#ddd"
          keyboardType="numeric"
          value={cedula}
          onChangeText={setCedula}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        {isBiometricSupported && (
          <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricAuth}>
            <Text style={styles.buttonText}>Ingresar con huella</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.altButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.altButtonText}>Registrarse</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    backgroundColor: '#2e2e3e',
    color: '#fff',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#ff5a5f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
  },
  biometricButton: {
    backgroundColor: '#4287f5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  altButton: {
    marginTop: 10,
  },
  altButtonText: {
    color: '#4db8ff',
    textDecorationLine: 'underline',
  },
});
