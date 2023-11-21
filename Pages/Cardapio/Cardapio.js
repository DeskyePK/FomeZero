
import React from 'react';
import { View, Text } from 'react-native';

const EmpresaCardapio = ({ route }) => {
  const { empresaId } = route.params;


  return (
    <View>
      <Text>Detalhes do Cardápio para a Empresa {empresaId}</Text>
  
    </View>
  );
};

export default EmpresaCardapio;
