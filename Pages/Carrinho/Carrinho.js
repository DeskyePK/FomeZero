import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../src/GlobalContext/UserContext';
import { ROTA_URL } from "../../config.json";



const Carrinho = () => {
  const { userId } = useUser();
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();


  const dados = async() => {
    navigation.navigate('Dados', { total });
         }



  useEffect(() => {
    if (!userId) {
      navigation.navigate('Login');
    } else {
      obterCarrinhoDoUsuario();
    }
  }, [userId, navigation]);

  const obterCarrinhoDoUsuario = async () => {
    try {
      const response = await fetch(`${ROTA_URL}/carrinho-usuario/${userId}`);
      const resultado = await response.json();
  
      if (resultado.success) {
        const carrinhoComImagens = resultado.data.map(item => {
          console.log(`Item: ${item.Nome_Produtos}, Foto: ${item.Foto_Produto}`);
          return {
            ...item,
            Foto_Produto: `data:image/jpeg;base64,${item.Foto_Produto}`,
            
          };
        });
       
  
        setCarrinhoItens(carrinhoComImagens);
        const totalCalculado = calcularTotal(carrinhoComImagens);
        setTotal(totalCalculado); 
      } else {
        console.error('Erro ao obter carrinho:', resultado.message);
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro.message);
    }
  };

  const calcularTotal = (itens) => {
    const totalCalculado = itens.reduce((total, item) => {
      if (item) {
        const preco = Number(item.Preco_Produtos) || 0;
        const quantidade = Number(item.Quantidade) || 0;
        const subtotal = preco * quantidade;
        console.log(`Item: ${item.Nome_Produtos}, Preço: ${preco}, Quantidade: ${quantidade}, Subtotal: ${subtotal}`);
        return total + subtotal;
      } else {
        console.error('Item no carrinho é indefinido:', item);
        return total;
      }
    }, 0);
    return totalCalculado;
  };
  const removerDoCarrinho = async (produtoId) => {
    try {
      const response = await fetch(`${ROTA_URL}/remover-do-carrinho/${userId}/${produtoId}`, {
        method: 'DELETE',
      });

      const resultado = await response.json();

      if (resultado.success) {
        obterCarrinhoDoUsuario();
      } else {
        console.error('Erro ao remover item do carrinho:', resultado.message);
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.Foto_Produto }} style={styles.imagemProduto} />
      <View style={styles.informacoesProduto}>
        <Text style={styles.nomeProduto}>{item.Nome_Produtos}</Text>
        <Text>{item.Descricao_Produtos}</Text>
        <Text>R${item.Preco_Produtos.toFixed(2)} {item.Quantidade}X</Text>
        
        <TouchableOpacity onPress={() => removerDoCarrinho(item.ID_Produto)} style={styles.botaoRemover}>
          <Text style={styles.textoBotaoRemover}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {carrinhoItens.length > 0 ? (
        <FlatList
          data={carrinhoItens}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.ID_Produto}_${index}`}
        />


      ) : (
        <View style={styles.semItensContainer}>
          <Text style={styles.semItensTexto}>Seu carrinho está vazio.</Text>
        </View>
      )}

           <TouchableOpacity style={styles.btn} onPress={dados}>
                <Text style={styles.btntext}>Finalizar Pedido</Text>
            </TouchableOpacity>

      <View style={styles.totalContainer}>
        
        <Text style={styles.totalTexto}>Total: R$ {total.toFixed(2)}</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 10,
  },
  itemContainer: {
    marginBottom: 20,
    
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  botaoRemover: {
    backgroundColor: '#D22222',
    padding: 10,
    borderRadius: 10,
    
    marginTop: 10,
  },
  textoBotaoRemover: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  semItensContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  semItensTexto: {
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagemProduto: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  btn: {
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: "25%",
    backgroundColor: "blue"
},
btntext: {

  fontWeight: "bold",
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: 16, 
}
});

export default Carrinho;
