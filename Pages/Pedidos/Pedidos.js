// Importe as bibliotecas necessárias
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe esta linha
import { ROTA_URL } from '../../config.json';
import { useUser } from '../../src/GlobalContext/UserContext';

const TelaDePedidos = () => {
  const { userId } = useUser();
  const [pedidos, setPedidos] = useState([]);
  const navigation = useNavigation(); // Adicione esta linha

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        const response = await fetch(`${ROTA_URL}/pedidos/${userId}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setPedidos(data.data);
        } else {
          console.error('Erro ao obter pedidos:', data.message);
        }
      } catch (error) {
        console.error('Erro ao obter pedidos:', error.message);
      }
    };

    carregarPedidos();
  }, [userId]);

  const navigateToDetalhesPedido = (pedidoId) => {
    navigation.navigate('DetalhesPedido', { pedidoId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Pedidos</Text>
      {pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.ID_Pedido.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToDetalhesPedido(item.ID_Pedido)}>
              <View style={styles.pedidoContainer}>
                <Text>Pedido ID: {item.ID_Pedido}</Text>
                <Text>Codigo Confirmacao: {item.Codigo_Confirmacao}</Text>
                <Text>Status: {item.Status_Pedido}</Text>
                <Text>Hora do Pedido: {new Date(item.Hora_Pedido).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.semPedidos}>Nenhum pedido encontrado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pedidoContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 16,
  },
  semPedidos: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default TelaDePedidos;
