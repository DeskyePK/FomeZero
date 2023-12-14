import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../src/GlobalContext/UserContext';
import { ROTA_URL } from "../../config.json";
const EmpresaCardapio = ({ route }) => {
  const { empresaId, empresaNome, empresaFoto } = route.params;
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState({});
  const navigation = useNavigation();
  const { userId } = useUser();
  

  useEffect(() => {
    console.log(userId); 
    if (userId) {
      obterProdutosDaEmpresa(empresaId);
    } else {
      obterProdutosDaEmpresa(empresaId);

    }
  }, [empresaId, userId, navigation]);

  const obterProdutosDaEmpresa = async (idEmpresa) => {
    try {
      const response = await fetch(`${ROTA_URL}/produtos-empresa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idEmpresa }),
      });

      const resultado = await response.json();

      if (resultado.success) {
        setProdutos(resultado.data);
      } else {
        console.error('Erro ao obter produtos:', resultado.message);
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro.message);
    }
  };

  const adicionarAoCarrinho = async (produtoId) => {
    try {
      const quantidade = carrinho[produtoId] || 1;
  
      if (quantidade === 0) {
    
        return;
      }
  
      const data = {
        Id_Usuario: userId,
        produtoId: produtoId,
        empresaId: empresaId,
        quantidade: quantidade,
      };
  
      if (!userId) {
        navigation.navigate('Login');
        return; 
      }
  
      const response = await fetch(`${ROTA_URL}/adicionar-ao-carrinho`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setCarrinho((prevCarrinho) => ({
          ...prevCarrinho,
          [produtoId]: quantidade,
        }));
      } else {
        console.error("Erro ao adicionar ao carrinho:", result.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error.message);
    }
  };


  const alterarQuantidade = (produtoId, quantidade) => {
    const novaQuantidade = Math.max((carrinho[produtoId] || 0) + quantidade, 0);
    setCarrinho((prevCarrinho) => ({ ...prevCarrinho, [produtoId]: novaQuantidade }));
  };

  const totalItensNoCarrinho = Object.values(carrinho).reduce((total, quantidade) => total + quantidade, 0);

  const handleNavigateToCarrinho = () => {
    navigation.navigate('Carrinho');
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardapioItemContainer}>
      <Image source={{ uri: `data:image/jpeg;base64,${item.Foto_Produto}` }} style={styles.imagemProduto} />
      <View style={styles.informacoesProduto}>
        <Text style={styles.nomeProduto}>{item.Nome_Produtos}</Text>
        <Text>{item.Descricao_Produtos}</Text>
        <View style={styles.controleQuantidade}>
          <TouchableOpacity onPress={() => alterarQuantidade(item.ID_Produto, -1)}>
            <Text style={styles.botaoControle}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantidade}>{carrinho[item.ID_Produto] || 0}</Text>
          <TouchableOpacity onPress={() => alterarQuantidade(item.ID_Produto, 1)}>
            <Text style={styles.botaoControle}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => adicionarAoCarrinho(item.ID_Produto)} style={styles.botaoAdicionar}>
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: `data:image/jpeg;base64,${empresaFoto}` }} style={styles.logoEmpresa} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.nomeEmpresa}>{empresaNome}</Text>
        </View>
      </View>
      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID_Produto.toString()}
        />
      ) : (
        <View style={styles.semProdutosContainer}>
          <Text style={styles.semProdutosTexto}>Nenhum produto cadastrado ainda.</Text>
        </View>
      )}
      <TouchableOpacity onPress={handleNavigateToCarrinho} style={styles.carrinhoContainer}>
      
        <View style={styles.iconeCarrinhoContainer}>
          <Ionicons name="cart-outline" size={24} color="#FFF" />
          {totalItensNoCarrinho > 0 && (
            <View style={styles.numeroItensCarrinho}>
              <Text style={styles.textoNumeroItens}>{totalItensNoCarrinho}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 2,
    padding: 10,
  },
  header: {
    flexDirection: 'column',
    marginTop: "10%",
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTextContainer: {
    marginTop: 10, 
  },
  logoEmpresa: {
    width: 100,
    marginTop:20,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  nomeEmpresa: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardapioItemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  imagemProduto: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  informacoesProduto: {
    flex: 1,
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  controleQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoControle: {
    fontSize: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  quantidade: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  botaoAdicionar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: 'center',
  },
  textoBotaoAdicionar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  semProdutosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  semProdutosTexto: {
    fontSize: 16,
  },

  carrinhoContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  iconeCarrinhoContainer: {
    backgroundColor: '#D22222',
    borderRadius: 50,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroItensCarrinho: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginLeft: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  textoNumeroItens: {
    color: '#D22222',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default EmpresaCardapio;
