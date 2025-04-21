import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';

const usuariosSimulados = [
  { cedula: '12345678', password: '1234' }, 
];

const Login = ({ navigation }) => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');

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
      usuariosSimulados.push({ cedula, password });
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

        <TouchableOpacity style={styles.altButton} onPress={handleRegister}>
          <Text style={styles.altButtonText}>Registrarse</Text>
        </TouchableOpacity>

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
