import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Botao from '../components/Botao';

export default function DetalhesScreen({
  navigation,
  tarefa,
  aoAlternarConclusao,
}) {
  if (!tarefa) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Tarefa não encontrada.</Text>
        <Botao titulo="Voltar" variante="secundario" aoPressionar={() => navigation.goBack()} />
      </View>
    );
  }

  const alternarStatus = () => {
    aoAlternarConclusao(tarefa.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartao}>
        <Text style={styles.etiqueta}>ATIVIDADE</Text>
        <Text style={styles.titulo}>{tarefa.titulo}</Text>

        <View style={styles.divisor} />

        <Text style={styles.rotulo}>Matéria</Text>
        <Text style={styles.valor}>{tarefa.materia}</Text>

        <Text style={styles.rotulo}>Prazo de entrega</Text>
        <Text style={styles.valor}>{tarefa.prazo}</Text>

        <Text style={styles.rotulo}>Descrição</Text>
        <Text style={styles.valor}>{tarefa.descricao}</Text>

        <Text style={styles.rotulo}>Status</Text>
        <Text style={[styles.valor, tarefa.concluida && styles.statusConcluido]}>
          {tarefa.concluida ? 'Concluída ✓' : 'Pendente'}
        </Text>
      </View>

      <Botao
        titulo={tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluída'}
        aoPressionar={alternarStatus}
      />

      <View style={styles.espaco} />

      <Botao
        titulo="Voltar às tarefas"
        variante="secundario"
        aoPressionar={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 21,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E5DC',
  },
  etiqueta: {
    color: '#82916F',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginBottom: 9,
  },
  titulo: {
    color: '#344E41',
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 16,
  },
  divisor: {
    height: 1,
    backgroundColor: '#EAEDE4',
    marginBottom: 18,
  },
  rotulo: {
    color: '#82916F',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 13,
    marginBottom: 5,
  },
  valor: {
    color: '#344E41',
    fontSize: 15,
    lineHeight: 22,
  },
  statusConcluido: {
    color: '#667D58',
    fontWeight: '800',
  },
  espaco: {
    height: 10,
  },
});
