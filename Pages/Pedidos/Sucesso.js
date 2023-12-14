import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROTA_URL } from "../../config.json";
import { useUser } from '../../src/GlobalContext/UserContext';

const TelaDeSucesso = ({ route, navigation }) => {
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");
  const [numeroContato, setNumeroContato] = useState("");
  const [codigoConfirmacao, setCodigoConfirmacao] = useState("");
  const [itensPedido, setItensPedido] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    console.log("Executando o useEffect salvarPedidoNoBanco");

    const carregarDados = async () => {
      try {
        const enderecoSalvo = await AsyncStorage.getItem("endereco");
        const cepSalvo = await AsyncStorage.getItem("cep");
        const numeroCasaSalvo = await AsyncStorage.getItem("numeroCasa");
        const pontoReferenciaSalvo = await AsyncStorage.getItem("pontoReferencia");
        const numeroContatoSalvo = await AsyncStorage.getItem("numeroContato");

        setEndereco(enderecoSalvo || "");
        setCep(cepSalvo || "");
        setNumeroCasa(numeroCasaSalvo || "");
        setPontoReferencia(pontoReferenciaSalvo || "");
        setNumeroContato(numeroContatoSalvo || "");

        const novoCodigo = gerarCodigoConfirmacao();
        setCodigoConfirmacao(novoCodigo);
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    carregarDados();

  }, []);

  useEffect(() => {
    if (endereco && cep && numeroCasa && pontoReferencia && numeroContato && codigoConfirmacao && itensPedido.length > 0) {
      // Todos os dados necessários estão disponíveis, podemos salvar o pedido no banco
      salvarPedidoNoBanco();
    }

  }, [endereco, cep, numeroCasa, pontoReferencia, numeroContato, userId, codigoConfirmacao, itensPedido]);

  useEffect(() => {
    const carregarItensPedido = async () => {
      try {
        const carrinhoResponse = await fetch(`${ROTA_URL}/carrinho-usuario/${userId}`);
        const carrinhoData = await carrinhoResponse.json();

        if (carrinhoResponse.ok && carrinhoData.success && carrinhoData.data) {
          const itensPedido = carrinhoData.data.map((item) => ({
            ID_Produto: item.ID_Produto,
            Quantidade: item.Quantidade,
            Preco_Unitario: item.Preco_Produtos,
          }));
          
          setItensPedido(itensPedido);
        } else {
          console.error("Erro ao obter carrinho do usuário:", carrinhoData.message);
        }
      } catch (error) {
        console.error("Erro ao carregar itens do carrinho:", error.message);
      }
    };

    carregarItensPedido();

  }, [userId]);

  const salvarPedidoNoBanco = async () => {
    try {
      const pedidoResponse = await fetch(
        `${ROTA_URL}/criar-pedido`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            endereco,
            cep,
            numeroCasa,
            pontoReferencia,
            numeroContato,
            codigoConfirmacao,
            itensPedido,
          }),
        }
      );

      const pedidoData = await pedidoResponse.json();

      if (pedidoResponse.ok && pedidoData.success) {
        console.log("Pedido salvo com sucesso!");

     
        await AsyncStorage.multiRemove([
          "endereco",
          "cep",
          "numeroCasa",
          "pontoReferencia",
          "numeroContato",
        ]);


            const response = await fetch(`${ROTA_URL}/limpar-carrinho/${userId}`, {
              method: 'DELETE',
            });
            const resultado = await response.json();
            if (resultado.success) {
            } else {
            }
   
      } else {
        console.error("Erro ao salvar pedido:", pedidoData.message);
      }
    } catch (error) {
      console.error("Erro ao salvar pedido:", error.message);
    }
  };

  const gerarCodigoConfirmacao = () => {
    const codigo = Math.floor(1000 + Math.random() * 9000);
    return codigo.toString();
  };

  useEffect(() => {
    const redirecionar = setTimeout(() => {
      navigation.replace('Principal');
    }, 5000);
    return () => clearTimeout(redirecionar);
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pedido realizado com sucesso!</Text>
      <Text style={styles.texto}>Em 5 segundos sera Redirecionado</Text>
      <Text style={styles.texto}>
        Código de Confirmação: {codigoConfirmacao}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default TelaDeSucesso;
