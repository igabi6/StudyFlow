import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CardTarefa from '../components/CardTarefa';
import Botao from '../components/Botao';

export default function HomeScreen({ navigation, tarefas }) {
  const [horario, setHorario] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHorario(new Date());
    }, 60000);

    return () => clearInterval(intervalo);
  }, []);

  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida);
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida);
  const progresso = tarefas.length === 0
    ? 0
    : Math.round((concluidas.length / tarefas.length) * 100);

  const hora = horario.getHours();
  const saudacao = hora < 12
    ? 'Bom dia'
    : hora < 18
      ? 'Boa tarde'
      : 'Boa noite';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.saudacao}>{saudacao}!</Text>
        <Text style={styles.subtitulo}>Que tal organizar seus estudos hoje?</Text>
      </View>

      <View style={styles.resumo}>
        <Text style={styles.resumoTitulo}>Seu progresso</Text>
        <Text style={styles.progresso}>{progresso}%</Text>
        <View style={styles.trilho}>
          <View style={[styles.barra, { width: `${progresso}%` }]} />
        </View>
        <Text style={styles.resumoLegenda}>
          {concluidas.length} de {tarefas.length} tarefas concluídas
        </Text>
      </View>

      <View style={styles.numeros}>
        <View style={styles.numeroCard}>
          <Text style={styles.numero}>{pendentes.length}</Text>
          <Text style={styles.numeroLegenda}>Pendentes</Text>
        </View>
        <View style={styles.numeroCard}>
          <Text style={styles.numero}>{concluidas.length}</Text>
          <Text style={styles.numeroLegenda}>Concluídas</Text>
        </View>
      </View>

      <View style={styles.secaoTopo}>
        <Text style={styles.secaoTitulo}>Próximas tarefas</Text>
        <Text
          style={styles.verTodas}
          onPress={() => navigation.navigate('Tarefas')}
        >
          Ver todas
        </Text>
      </View>

      {pendentes.length === 0 ? (
        <Text style={styles.vazio}>Tudo em dia! Você não tem tarefas pendentes. 🌿</Text>
      ) : (
        pendentes.slice(0, 3).map((tarefa) => (
          <CardTarefa
            key={tarefa.id}
            titulo={tarefa.titulo}
            materia={tarefa.materia}
            prazo={tarefa.prazo}
            concluida={tarefa.concluida}
            aoPressionar={() =>
              navigation.navigate('Detalhes', { tarefaId: tarefa.id })
            }
          />
        ))
      )}

      <Botao
        titulo="+ Adicionar tarefa"
        aoPressionar={() => navigation.navigate('Tarefas')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 34,
  },
  topo: {
    marginBottom: 22,
  },
  saudacao: {
    color: '#344E41',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitulo: {
    color: '#7B8477',
    fontSize: 14,
  },
  resumo: {
    backgroundColor: '#A3B18A',
    borderRadius: 20,
    padding: 19,
    marginBottom: 14,
  },
  resumoTitulo: {
    color: '#344E41',
    fontSize: 15,
    fontWeight: '700',
  },
  progresso: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 7,
  },
  trilho: {
    height: 9,
    backgroundColor: '#DCE3D2',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  barra: {
    height: 9,
    backgroundColor: '#344E41',
    borderRadius: 10,
  },
  resumoLegenda: {
    color: '#344E41',
    fontSize: 12,
    marginTop: 9,
  },
  numeros: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },
  numeroCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E5DC',
  },
  numero: {
    color: '#344E41',
    fontSize: 25,
    fontWeight: '800',
  },
  numeroLegenda: {
    color: '#7B8477',
    fontSize: 12,
    marginTop: 4,
  },
  secaoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  secaoTitulo: {
    color: '#344E41',
    fontSize: 18,
    fontWeight: '800',
  },
  verTodas: {
    color: '#667D58',
    fontSize: 13,
    fontWeight: '700',
    padding: 5,
  },
  vazio: {
    backgroundColor: '#FFFFFF',
    color: '#667D58',
    padding: 17,
    borderRadius: 15,
    marginBottom: 15,
    lineHeight: 21,
  },
});
