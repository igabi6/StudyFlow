import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import TarefasScreen from './screens/TarefasScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import { tarefasIniciais } from './data/tarefas';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tarefas, setTarefas] = useState(tarefasIniciais);

  const adicionarTarefa = (novaTarefa) => {
    setTarefas((tarefasAtuais) => [novaTarefa, ...tarefasAtuais]);
  };

  const alternarConclusao = (id) => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#F5F1E8' },
          headerTintColor: '#344E41',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#F5F1E8' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Inicio"
          options={{ title: 'StudyFlow' }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              tarefas={tarefas}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Tarefas"
          options={{ title: 'Minhas tarefas' }}
        >
          {(props) => (
            <TarefasScreen
              {...props}
              tarefas={tarefas}
              aoAdicionar={adicionarTarefa}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Detalhes"
          options={{ title: 'Detalhes da tarefa' }}
        >
          {(props) => {
            const tarefa = tarefas.find(
              (item) => item.id === props.route.params?.tarefaId
            );

            return (
              <DetalhesScreen
                {...props}
                tarefa={tarefa}
                aoAlternarConclusao={alternarConclusao}
              />
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
