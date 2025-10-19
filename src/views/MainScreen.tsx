import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function MainScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>

      <View style={styles.buttonContainer}>
        <Button title="SOAP Java" onPress={() => navigation.navigate('SOAPJava')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="SOAP .NET" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="REST Java" onPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="REST .NET" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  buttonContainer: { marginVertical: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
});
