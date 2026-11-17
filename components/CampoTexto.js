import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CampoTexto({
  rotulo,
  valor,
  aoAlterar,
  placeholder,
  multiline = false,
  teclado = 'default',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        value={valor}
        onChangeText={aoAlterar}
        placeholder={placeholder}
        placeholderTextColor="#92998E"
        multiline={multiline}
        keyboardType={teclado}
        style={[styles.input, multiline && styles.multiline]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 7,
    marginBottom: 14,
  },
  rotulo: {
    color: '#344E41',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    minHeight: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DAD7CD',
    borderRadius: 13,
    paddingHorizontal: 14,
    color: '#344E41',
    fontSize: 15,
  },
  multiline: {
    minHeight: 86,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
});
