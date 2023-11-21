import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

const EmpresaListaHorizontal = ({ empresas, onPressEmpresa }) => {
  if (!empresas || empresas.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhuma empresa disponível</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressEmpresa(item.ID_Empresa)}>
      <View style={[styles.companyContainer, empresas.length === 1 && styles.singleCompany]}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.Foto_Empresa}` }}
          style={styles.image}
        />
        <Text style={styles.companyName}>{item.Nome_Empresa}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas Próximas</Text>
      <FlatList
        data={empresas}
        keyExtractor={(empresa) => empresa.ID_Empresa.toString()}
        numColumns={3}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  companyContainer: {
    alignItems: 'center',
    margin: 10,
  },
  singleCompany: {
    justifyContent: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  companyName: {
    marginTop: 5,
  },
});

export default EmpresaListaHorizontal;
