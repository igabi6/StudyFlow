import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function Botao({
  titulo,
  aoPressionar,
  variante = 'principal',
  desabilitado = false,
}) {
  const secundario = variante === 'secundario';

  return (
    <Pressable
      onPress={aoPressionar}
      disabled={desabilitado}
      style={({ pressed }) => [
        styles.botao,
        secundario ? styles.secundario : styles.principal,
        desabilitado && styles.desabilitado,
        pressed && !desabilitado && styles.pressionado,
      ]}
    >
      <Text style={[styles.texto, secundario && styles.textoSecundario]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    minHeight: 48,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  principal: {
    backgroundColor: '#344E41',
  },
  secundario: {
    backgroundColor: '#E5E9DF',
    borderWidth: 1,
    borderColor: '#D0D8C8',
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  textoSecundario: {
    color: '#344E41',
  },
  desabilitado: {
    opacity: 0.45,
  },
  pressionado: {
    opacity: 0.8,
  },
});
