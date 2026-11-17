import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

export default function CardTarefa({
  titulo,
  materia,
  prazo,
  concluida,
  aoPressionar,
}) {
  return (
    <Pressable
      onPress={aoPressionar}
      style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
    >
      <View style={styles.linha}>
        <View style={styles.conteudo}>
          <Text style={[styles.titulo, concluida && styles.concluido]}>
            {titulo}
          </Text>
          <Text style={styles.materia}>{materia}</Text>
        </View>

        <View style={[styles.status, concluida ? styles.statusConcluido : styles.statusPendente]}>
          <Text style={[styles.statusTexto, concluida && styles.statusTextoConcluido]}>
            {concluida ? 'Concluída' : 'Pendente'}
          </Text>
        </View>
      </View>

      <Text style={styles.prazo}>Entrega: {prazo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 17,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E5DC',
  },
  pressionado: {
    opacity: 0.82,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  conteudo: {
    flex: 1,
  },
  titulo: {
    color: '#344E41',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  concluido: {
    textDecorationLine: 'line-through',
    color: '#8B9387',
  },
  materia: {
    color: '#7B8477',
    fontSize: 13,
  },
  prazo: {
    color: '#7B8477',
    fontSize: 12,
    marginTop: 13,
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 20,
  },
  statusPendente: {
    backgroundColor: '#F4EBD6',
  },
  statusConcluido: {
    backgroundColor: '#E5E9DF',
  },
  statusTexto: {
    color: '#8B6B32',
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextoConcluido: {
    color: '#526B50',
  },
});
