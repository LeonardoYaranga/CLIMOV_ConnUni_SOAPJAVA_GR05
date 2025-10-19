import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SOAPJAVAController } from '../controllers/SOAPJAVAController';
import { ConUnit } from '../models/ConUnit';

export default function SOAPJavaScreen() {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [units, setUnits] = useState<string[]>([]);
  const [inUnit, setInUnit] = useState<string>('');
  const [outUnit, setOutUnit] = useState<string>('');
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const soapController = new SOAPJAVAController();
        const data = await soapController.getSupportedTypes();
        setTypes(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo obtener los tipos del servicio SOAP');
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    if (selectedType) {
      const soapController = new SOAPJAVAController();
      soapController
        .getTypeInfo(selectedType)
        .then(setUnits)
        .catch(() =>
          Alert.alert('Error', 'No se pudieron obtener las unidades'),
        );
    } else {
      setUnits([]);
      setInUnit('');
      setOutUnit('');
    }
  }, [selectedType]);

  const handleConvert = async () => {
    if (!selectedType || !inUnit || !outUnit || !value) {
      Alert.alert('Atención', 'Complete todos los campos antes de continuar');
      return;
    }

    try {
      const soapController = new SOAPJAVAController();
      const conUnit = new ConUnit(selectedType, value, inUnit, outUnit);
      const result = await soapController.convertUnit(conUnit);
      Alert.alert('Resultado', `El valor convertido es: ${result}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo realizar la conversión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversión de Unidades (SOAP Java)</Text>

      <View style={styles.pickerContainer}>
        <Text>Tipo:</Text>
        <Picker
          selectedValue={selectedType}
          onValueChange={itemValue => setSelectedType(itemValue)}
        >
          <Picker.Item label="Seleccione un tipo" value="" />
          {types.map(type => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>

        {units.length > 0 && (
          <>
            <Text>Unidad de entrada:</Text>
            <Picker selectedValue={inUnit} onValueChange={setInUnit}>
              <Picker.Item label="Seleccione unidad" value="" />
              {units.map(unit => (
                <Picker.Item key={unit} label={unit} value={unit} />
              ))}
            </Picker>

            <Text>Unidad de salida:</Text>
            <Picker selectedValue={outUnit} onValueChange={setOutUnit}>
              <Picker.Item label="Seleccione unidad" value="" />
              {units.map(unit => (
                <Picker.Item key={unit} label={unit} value={unit} />
              ))}
            </Picker>
          </>
        )}
      </View>

      <TextInput
        placeholder="Ingrese valor"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />

      <Button title="Convertir" onPress={handleConvert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
