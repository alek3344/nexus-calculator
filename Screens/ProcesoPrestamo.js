import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../Config/firebaseConfig';



const PrestamoProceso = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const snapshot = await getDocs(collection(db, 'prestamos'));
        const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSolicitudes(datos);
      } catch (error) {
        console.error('Error obteniendo solicitudes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes de Préstamo</Text>
      <FlatList
        data={solicitudes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Tipo: {item.tipoCalculo}</Text>
            <Text style={styles.itemText}>Monto: ${item.monto}</Text>
            <Text style={styles.itemText}>Interés: {item.interes}%</Text>
            <Text style={styles.itemText}>Períodos: {item.periodos}</Text>
            <Text style={styles.itemText}>Cuota: ${item.cuota}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PrestamoProceso;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  item: { backgroundColor: '#1e1e1e', padding: 15, borderRadius: 10, marginBottom: 10 },
  itemText: { color: '#ccc' },
});
