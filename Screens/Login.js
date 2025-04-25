import * as LocalAuthentication from 'expo-local-authentication';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../Config/firebaseConfig';
import * as Crypto from 'expo-crypto';

const usuariosSimulados = [
  { cedula: '12345678', password: '1234', huellasRegistradas: true },
];

const Login = ({ navigation }) => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [saldo, setSaldo] = useState('');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      
      if (compatible) {
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        console.log("¿Huellas registradas en el dispositivo?", enrolled);
      }
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
        navigation.navigate('Menu');
      } else {
        Alert.alert('Error', 'Cédula o contraseña incorrecta');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      console.error(error);
    }
  };

  const handleRegister = () => {
    const existe = usuariosSimulados.find((u) => u.cedula === cedula);
    if (existe) {
      Alert.alert('Error', 'Esta cédula ya está registrada');
    } else {
      usuariosSimulados.push({ cedula, password, saldo, huellasRegistradas: false });
      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
    }
  };

  const handleRecovery = () => {
    const user = usuariosSimulados.find((u) => u.cedula === cedula);
    if (user) {
      Alert.alert('Recuperación', `Tu contraseña es: ${user.password}`);
    } else {
      Alert.alert('Error', 'Cédula no registrada');
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if (!biometricRecords) {
        Alert.alert(
          'No hay huellas registradas', 
          'Debes registrar al menos una huella en tu dispositivo para usar esta función'
        );
        return;
      }

      if (!cedula) {
        Alert.alert('Ingrese cédula', 'Debes ingresar tu cédula para usar la autenticación biométrica');
        return;
      }

      const user = usuariosSimulados.find(u => u.cedula === cedula);
      if (!user) {
        Alert.alert('Error', 'Usuario no encontrado');
        return;
      }
      
      if (!user.huellasRegistradas) {
        Alert.alert('Error', 'Este usuario no tiene huellas registradas en la aplicación. Por favor, registre su huella primero.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticación con huella digital',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar contraseña',
        disableDeviceFallback: false,
      });

      console.log("Resultado de autenticación biométrica:", result);

      if (result.success) {
        Alert.alert('Autenticación exitosa', 'Bienvenido');
        navigation.navigate('Menu');
      } else {
        if (!result.error || result.error !== 'user_cancel') {
          Alert.alert('Autenticación fallida', 'Huella no reconocida. Intente nuevamente.');
        }
      }
    } catch (error) {
      console.error("Error en autenticación biométrica:", error);
      Alert.alert('Error', 'No se pudo autenticar: ' + error.message);
    }
  };

  const handleRegisterBiometric = async () => {
    if (!isBiometricSupported) {
      Alert.alert('No soportado', 'Tu dispositivo no soporta autenticación biométrica');
      return;
    }

    if (!cedula || !password) {
      Alert.alert('Datos incompletos', 'Debes ingresar tu cédula y contraseña para registrar tu huella');
      return;
    }

    const userFound = usuariosSimulados.find(
      (u) => u.cedula === cedula && u.password === password
    );
    
    if (!userFound) {
      Alert.alert('Error', 'Cédula o contraseña incorrecta');
      return;
    }

    try {
      const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if (!biometricRecords) {
        Alert.alert(
          'No hay huellas registradas', 
          'Debes registrar al menos una huella en la configuración de tu dispositivo antes de usarla en la app'
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Verifica tu identidad con tu huella',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar contraseña',
        disableDeviceFallback: false,
      });

      if (result.success) {
        const index = usuariosSimulados.findIndex(u => u.cedula === cedula);
        if (index !== -1) {
          usuariosSimulados[index].huellasRegistradas = true;
          Alert.alert('Éxito', 'Huella registrada correctamente para este usuario');
        }
      } else {
        if (!result.error || result.error !== 'user_cancel') {
          Alert.alert('Error', 'No se pudo verificar tu huella');
        }
      }
    } catch (error) {
      console.error("Error al registrar huella:", error);
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

        <TextInput
          style={styles.input}
          placeholder="Saldo inicial"
          placeholderTextColor="#ddd"
          keyboardType="numeric"
          value={saldo}
          onChangeText={setSaldo}
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
