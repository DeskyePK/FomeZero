import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Categoria from '../../Components/Categorias/Categorias';
import EmpresaListaHorizontal from '../../Components/Categorias/Empresas'; 
import { ROTA_URL } from "../../config.json";

const categories = [
  { id: 1, name: 'Lanches', image: require('../../Images/Lanches.png') },
  { id: 2, name: 'Sobremesas', image: require('../../Images/Sobremesas.png') },
  { id: 3, name: 'Massas', image: require('../../Images/Massas.png') },
  { id: 4, name: 'Carnes', image: require('../../Images/Carnes.png') },
  { id: 5, name: 'Salgados', image: require('../../Images/Salgados.png') },
  { id: 6, name: 'Japonesa', image: require('../../Images/Japonesa.png') },
  { id: 7, name: 'Frutos do Mar', image: require('../../Images/Mar.png') },
];

const TelaPrincipal = () => {
  const navigation = useNavigation();
  const [empresasProximas, setEmpresasProximas] = useState([]);

  const handlePressCategory = categoryId => {
    switch (categoryId) {
      case 1:
        navigation.navigate('Lanches');
        break;
      case 2:
        navigation.navigate('Sobremesas');
        break;
      case 3:
        navigation.navigate('Massas');
        break;
      case 4:
        navigation.navigate('Carnes');
        break;
      case 5:
        navigation.navigate('Salgados');
        break;
      case 6:
        navigation.navigate('Japonesa');
        break;
      case 7:
        navigation.navigate('Mar');
        break;
      default:
    }
  };

  const handlePressEmpresa = (empresaId, empresaNome, empresaFoto) => {
    navigation.navigate('Cardapio', { empresaId, empresaNome, empresaFoto });
  };

  useEffect(() => {
    fetch(`${ROTA_URL}/empresas-avaliadas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => {
        setEmpresasProximas(data.data);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }, []);

  return (
    <View>
      {/* Componente de categorias */}
      <Categoria categories={categories} onPressCategory={handlePressCategory} />

      {/* Lista de empresas próximas */}
      <View>

        <EmpresaListaHorizontal empresas={empresasProximas} onPressEmpresa={handlePressEmpresa} />
      </View>
    </View>
  );
};

export default TelaPrincipal;
