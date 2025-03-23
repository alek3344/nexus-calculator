import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (user === 'admin' && password === '1234') {
      navigation.navigate('Menu');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nexus</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#ddd"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ddd"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleLogin}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2d',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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
});

export default Login;
  