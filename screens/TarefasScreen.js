import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import CardTarefa from '../components/CardTarefa';
import Botao from '../components/Botao';
import CampoTexto from '../components/CampoTexto';

const formularioInicial = {
  titulo: '',
  materia: '',
  prazo: '',
  descricao: '',
};

export default function TarefasScreen({ navigation, tarefas, aoAdicionar }) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [filtro, setFiltro] = useState('Todas');

  const atualizarCampo = (campo, valor) => {
    setFormulario((atual) => ({ ...atual, [campo]: valor }));
  };

  const materias = [...new Set(tarefas.map((tarefa) => tarefa.materia))];

  const tarefasFiltradas = useMemo(() => {
    if (filtro === 'Pendentes') {
      return tarefas.filter((tarefa) => !tarefa.concluida);
    }

    if (filtro === 'Concluídas') {
      return tarefas.filter((tarefa) => tarefa.concluida);
    }

    return tarefas;
  }, [tarefas, filtro]);

  const cadastrarTarefa = () => {
    const { titulo, materia, prazo, descricao } = formulario;

    if (!titulo.trim() || !materia.trim() || !prazo.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha o título, a matéria e o prazo.');
      return;
    }

    const novaTarefa = {
      id: String(Date.now()),
      titulo: titulo.trim(),
      materia: materia.trim(),
      prazo: prazo.trim(),
      descricao: descricao.trim() || 'Nenhuma descrição informada.',
      concluida: false,
    };

    aoAdicionar(novaTarefa);
    setFormulario(formularioInicial);
    Alert.alert('Tarefa adicionada!', 'Sua tarefa foi cadastrada com sucesso.');
  };

  const abrirDetalhes = (tarefa) => {
    navigation.navigate('Detalhes', { tarefaId: tarefa.id });
  };

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Organize sua rotina</Text>
      <Text style={styles.subtitulo}>
        Cadastre atividades e acompanhe seu progresso.
      </Text>

      <View style={styles.formulario}>
        <Text style={styles.tituloSecao}>Nova tarefa</Text>

        <CampoTexto
          rotulo="Nome da tarefa *"
          valor={formulario.titulo}
          aoAlterar={(valor) => atualizarCampo('titulo', valor)}
          placeholder="Ex.: Estudar React Native"
        />

        <CampoTexto
          rotulo="Matéria *"
          valor={formulario.materia}
          aoAlterar={(valor) => atualizarCampo('materia', valor)}
          placeholder="Ex.: Programação"
        />

        <CampoTexto
          rotulo="Prazo *"
          valor={formulario.prazo}
          aoAlterar={(valor) => atualizarCampo('prazo', valor)}
          placeholder="Ex.: 25/11/2026"
        />

        <CampoTexto
          rotulo="Descrição"
          valor={formulario.descricao}
          aoAlterar={(valor) => atualizarCampo('descricao', valor)}
          placeholder="Adicione detalhes sobre a atividade..."
          multiline
        />

        <Botao titulo="Salvar tarefa" aoPressionar={cadastrarTarefa} />
      </View>

      <Text style={styles.tituloSecao}>Suas tarefas</Text>

      <View style={styles.filtros}>
        {['Todas', 'Pendentes', 'Concluídas'].map((opcao) => (
          <Botao
            key={opcao}
            titulo={opcao}
            variante={filtro === opcao ? 'principal' : 'secundario'}
            aoPressionar={() => setFiltro(opcao)}
          />
        ))}
      </View>

      <Text style={styles.contagem}>
        {materias.length} {materias.length === 1 ? 'matéria cadastrada' : 'matérias cadastradas'}
      </Text>

      {tarefasFiltradas.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhuma tarefa encontrada nesta categoria.
        </Text>
      ) : (
        <FlatList
          data={tarefasFiltradas}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <CardTarefa
              titulo={item.titulo}
              materia={item.materia}
              prazo={item.prazo}
              concluida={item.concluida}
              aoPressionar={() => abrirDetalhes(item)}
            />
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 35,
  },
  titulo: {
    color: '#344E41',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitulo: {
    color: '#7B8477',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  formulario: {
    backgroundColor: '#EAEDE4',
    borderRadius: 19,
    padding: 16,
    marginBottom: 25,
  },
  tituloSecao: {
    color: '#344E41',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 12,
  },
  contagem: {
    color: '#7B8477',
    fontSize: 12,
    marginBottom: 12,
  },
  vazio: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 15,
    color: '#7B8477',
    lineHeight: 21,
  },
});
