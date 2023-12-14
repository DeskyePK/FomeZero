// Dados.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleIntegrationMP } from '../../src/MPsdk/preferenciaMP'
import { openBrowserAsync } from "expo-web-browser";

const Dados = ({ navigation, route }) => {
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [pontoReferencia, setPontoReferencia] = useState('');
  const [numeroContato, setNumeroContato] = useState('');
  const { total } = route.params || { total: 0 };
  
  const handleSalvarEndereco = async () => {
  
    if (!endereco || !cep || !numeroCasa || !numeroContato) {
      Alert.alert('Erro', 'Preencha todos os campos antes de ir para o pagamento.');
      return;
    }

    const teste = async() => {
      navigation.navigate('Sucesso');
           }

    try {
     
      await AsyncStorage.setItem('endereco', endereco);
      await AsyncStorage.setItem('cep', cep);
      await AsyncStorage.setItem('numeroCasa', numeroCasa);
      await AsyncStorage.setItem('pontoReferencia', pontoReferencia);
      await AsyncStorage.setItem('numeroContato', numeroContato);


        const data = await handleIntegrationMP(total)
        if (!data) {
            return console.log("Ocorreu um erro ! Tente Novamente Mais Tarde")
        }
        openBrowserAsync(data)

    } catch (error) {
      console.error('Erro ao salvar endereço:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o endereço. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Endereço:</Text>
      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Digite seu endereço"
      />

      <Text>CEP:</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        placeholder="Digite seu CEP"
      />

      <Text>Número da Casa:</Text>
      <TextInput
        style={styles.input}
        value={numeroCasa}
        onChangeText={setNumeroCasa}
        placeholder="Digite o número da casa"
      />

      <Text>Ponto de Referência:</Text>
      <TextInput
        style={styles.input}
        value={pontoReferencia}
        onChangeText={setPontoReferencia}
        placeholder="Digite um ponto de referência"
      />

      <Text>Número de Contato:</Text>
      <TextInput
        style={styles.input}
        value={numeroContato}
        onChangeText={setNumeroContato}
        placeholder="Digite seu número de contato"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.btn} onPress={handleSalvarEndereco}>
        <Text style={styles.btntext}>Ir Para o Pagamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  btn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
    borderRadius: 20,
    marginLeft: '25%',
    backgroundColor: 'blue',
  },
  btntext: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});

export default Dados;
