import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ROTA_URL } from "../../config.json";
const Pesquisa = () => {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const navigation = useNavigation();

  const realizarPesquisa = async () => {
    try {
      if (termoPesquisa.trim() === '') {
        setResultados([]);
        setMensagem('');
        return;
      }

      const response = await fetch('http://10.81.1.36:3000/pesquisa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ termoPesquisa }),
      });

      const resultado = await response.json();

      if (resultado.success) {
        setResultados(resultado.data);

        if (resultado.data.length === 0) {
          setMensagem('Nenhum resultado encontrado');
        } else {
          setMensagem('');
        }
      } else {
        console.error('Erro na pesquisa:', resultado.message);
        setMensagem('Nenhum Estabelecimento Encontrado.');
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro.message);
      setMensagem('Nenhum Estabelecimento Encontrado.');
    }
  };

  const handlePressEmpresa = (empresaId, empresaNome, empresaFoto) => {
    navigation.navigate('Cardapio', { empresaId, empresaNome, empresaFoto });
  };

  const handleLimparPesquisa = () => {
    setTermoPesquisa('');
    setResultados([]);
    setMensagem('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressEmpresa(item.ID_Empresa, item.Nome_Empresa, item.Foto_Empresa)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: `data:image/jpeg;base64,${item.Foto_Empresa}` }} style={styles.imagemEmpresa} />
        <View style={styles.informacoesEmpresa}>
          <Text style={styles.nomeEmpresa}>{item.Nome_Empresa}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar por empresa"
          onChangeText={(text) => {
            setTermoPesquisa(text);
            setMensagem('');
          }}
          value={termoPesquisa}
        />
        <TouchableOpacity onPress={realizarPesquisa} style={styles.iconContainer}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        {resultados.length > 0 && (
          <TouchableOpacity onPress={handleLimparPesquisa} style={styles.limparContainer}>
            <Ionicons name="close-circle-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={resultados}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.ID_Empresa}`}
      />
      {mensagem !== '' && <Text style={styles.mensagem}>{mensagem}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    marginTop: "8%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    paddingLeft: 10,
  },
  iconContainer: {
    marginTop: "8%",
    padding: 10,
  },
  limparContainer: {
    marginTop: "8%",
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  imagemEmpresa: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 10,
  },
  informacoesEmpresa: {
    flex: 1,
  },
  nomeEmpresa: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mensagem: {
    marginBottom: "90%",
    color: 'red',
    textAlign: 'center',
    justifyContent: 'center'
  },
});

export default Pesquisa;
