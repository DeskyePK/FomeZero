import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ROTA_URL } from '../../config.json';
import Slider from '@react-native-community/slider';

const DetalhesPedido = () => {
  const route = useRoute();
  const { pedidoId } = route.params;
  const [itensPedido, setItensPedido] = useState([]);
  const [avaliacao, setAvaliacao] = useState(0);
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);

  useEffect(() => {
    const carregarItensPedido = async () => {
      try {
        const response = await fetch(`${ROTA_URL}/detalhes-pedido/${pedidoId}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setItensPedido(data.data);
        } else {
          console.error('Erro ao obter detalhes do pedido:', data.message);
        }
      } catch (error) {
        console.error('Erro ao obter detalhes do pedido:', error.message);
      }
    };

    carregarItensPedido();
  }, [pedidoId]);

  const avaliarPedido = async () => {
    try {
      const response = await fetch(`${ROTA_URL}/avaliar-pedido/${pedidoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avaliacao }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('Pedido avaliado com sucesso');
        setAvaliacaoEnviada(true);
      } else {
        console.error('Erro ao avaliar pedido:', data.message);
      }
    } catch (error) {
      console.error('Erro ao avaliar pedido:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Pedido</Text>
      <Text>Pedido ID: {pedidoId}</Text>
      {itensPedido.length > 0 ? (
        <FlatList
          data={itensPedido}
          keyExtractor={(item) => item.ID_Produto.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>Nome Produto: {item.Nome_Produtos}</Text>
              <Text>Quantidade: {item.Quantidade}</Text>
              <Text>Preço Unitário: {item.Preco_Unitario}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.semItens}>Nenhum item encontrado.</Text>
      )}

      {itensPedido.length > 0 && (
        <View style={styles.avaliacaoContainer}>
          <Text>Avaliação :  </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            value={avaliacao}
            onValueChange={(value) => setAvaliacao(value)}
            disabled={avaliacaoEnviada}
          />
          <Text style={styles.avaliacaoTexto}>{`Avaliação: ${avaliacao}`}</Text>
          {!avaliacaoEnviada && (
            <TouchableOpacity onPress={avaliarPedido} disabled={avaliacao === 0}>
              <Text style={styles.avaliacaoBotao}>{avaliacao === 0 ? 'Avaliar' : 'Enviar Avaliação'}</Text>
            </TouchableOpacity>
          )}
        </View>
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
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 16,
  },
  semItens: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  avaliacaoContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    marginTop: 8,
  },
  avaliacaoTexto: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  avaliacaoBotao: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default DetalhesPedido;
