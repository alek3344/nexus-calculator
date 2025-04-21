import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const usuariosSimulados = [
  { cedula: '12345678', password: '1234', huellasRegistradas: true },
];

const Login = ({ navigation }) => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  
  // Verificar si el dispositivo soporta autenticación biométrica
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleLogin = () => {
    const userFound = usuariosSimulados.find(
      (u) => u.cedula === cedula && u.password === password
    );
    if (userFound) {
      navigation.navigate('Menu');
    } else {
      Alert.alert('Error', 'Cédula o contraseña incorrecta');
    }
  };

  const handleRegister = () => {
    const existe = usuariosSimulados.find((u) => u.cedula === cedula);
    if (existe) {
      Alert.alert('Error', 'Esta cédula ya está registrada');
    } else {
      usuariosSimulados.push({ cedula, password, huellasRegistradas: false });
      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
    }
  };

  const handleRecovery = () => {
    const user = usuariosSimulados.find((u) => u.cedula === cedula);
    if (user) {
      Alert.alert('Recuperación', `Tu contraseña es: ${user.password}`);
      // Aquí puedes usar un sistema más seguro, como correo o verificación
    } else {
      Alert.alert('Error', 'Cédula no registrada');
    }
  };

  // Función para autenticación con huella digital
  const handleBiometricAuth = async () => {
    // Verificar si hay huellas registradas en el dispositivo
    const biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if (!biometricRecords) {
      Alert.alert(
        'No hay huellas registradas', 
        'Debes registrar al menos una huella en tu dispositivo para usar esta función'
      );
      return;
    }

    // Si no se ha ingresado la cédula, solicitar
    if (!cedula) {
      Alert.alert('Ingrese cédula', 'Debes ingresar tu cédula para usar la autenticación biométrica');
      return;
    }

    // Verificar si el usuario existe y tiene huellas registradas en la app
    const user = usuariosSimulados.find(u => u.cedula === cedula);
    if (!user) {
      Alert.alert('Error', 'Usuario no encontrado');
      return;
    }
    
    if (!user.huellasRegistradas) {
      Alert.alert('Error', 'Este usuario no tiene huellas registradas. Por favor, registre su huella primero.');
      return;
    }

    try {
      // Iniciar la autenticación biométrica
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticación con huella digital',
        cancelLabel: 'Cancelar',
        disableDeviceFallback: true,
      });

      if (result.success) {
        Alert.alert('Autenticación exitosa', 'Bienvenido');
        navigation.navigate('Menu');
      } else {
        Alert.alert('Autenticación fallida', 'Intente nuevamente');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo autenticar: ' + error.message);
    }
  };

  // Función para registrar huella digital
  const handleRegisterBiometric = async () => {
    // Verificar si el dispositivo soporta autenticación biométrica
    if (!isBiometricSupported) {
      Alert.alert('No soportado', 'Tu dispositivo no soporta autenticación biométrica');
      return;
    }

    // Si no se ha ingresado la cédula o contraseña, solicitar
    if (!cedula || !password) {
      Alert.alert('Datos incompletos', 'Debes ingresar tu cédula y contraseña para registrar tu huella');
      return;
    }

    // Verificar credenciales antes de registrar huella
    const userFound = usuariosSimulados.find(
      (u) => u.cedula === cedula && u.password === password
    );
    
    if (!userFound) {
      Alert.alert('Error', 'Cédula o contraseña incorrecta');
      return;
    }

    try {
      // Verificamos que el usuario tenga huellas registradas en el dispositivo
      const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if (!biometricRecords) {
        Alert.alert(
          'No hay huellas registradas', 
          'Debes registrar al menos una huella en la configuración de tu dispositivo'
        );
        return;
      }

      // Simulamos el registro de la huella para la aplicación
      // En un escenario real, guardaríamos algún token seguro asociado a la huella
      const index = usuariosSimulados.findIndex(u => u.cedula === cedula);
      if (index !== -1) {
        usuariosSimulados[index].huellasRegistradas = true;
        Alert.alert('Éxito', 'Huella registrada correctamente para este usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar la huella: ' + error.message);
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
        
        <TouchableOpacity style={styles.altButton} onPress={handleRegister}>
          <Text style={styles.altButtonText}>Registrarse</Text>
        </TouchableOpacity>
        
        {isBiometricSupported && (
          <TouchableOpacity style={styles.altButton} onPress={handleRegisterBiometric}>
            <Text style={styles.altButtonText}>Registrar huella</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.altButton} onPress={handleRecovery}>
          <Text style={styles.altButtonText}>¿Olvidaste tu contraseña?</Text>
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