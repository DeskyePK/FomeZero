import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { ROTA_URL } from "../../config.json";
const TelaDeLanches = () => {
  const [empresasLanches, setEmpresasLanches] = useState([]);

  useEffect(() => {
    const fetchEmpresasLanches = async () => {
      try {
        const response = await fetch(`${ROTA_URL}/lanches`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Erro ao obter Carnes: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.success) {
          setEmpresasLanches(data.data);
        } else {
          console.error("Erro ao obter Carnes:", data.message);
        }
      } catch (error) {
        console.error("Erro ao fazer a solicitação:", error);
        Alert.alert("Erro", "Erro na comunicação com o servidor");
      }
    };

    fetchEmpresasLanches();
  }, []);

  const handlePressEmpresa = (empresaId, empresaNome, empresaFoto) => {
    navigation.navigate('Cardapio', { empresaId, empresaNome, empresaFoto });
  };


  const renderItem = ({ item }) => (
    
    <TouchableOpacity
      onPress={() => {
        handlePressEmpresa(item.ID_Empresa, item.Nome_Empresa, item.Foto_Empresa)}
      }
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 16 }}
        source={{ uri: `data:image/jpeg;base64,${item.Foto_Empresa}` }}
      />
      <Text>{item.Nome_Empresa}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          marginTop: "10%",
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 16,
        }}
      >
        Estabelecimentos de Carnes
      </Text>
      <FlatList
        data={empresasLanches}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID_Empresa.toString()}
      />
    </View>
  );
};

export default TelaDeLanches;
