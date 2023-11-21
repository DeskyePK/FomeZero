import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";

const TelaDeLanches = () => {
  const [empresasLanches, setEmpresasLanches] = useState([]);

  useEffect(() => {
    const fetchEmpresasLanches = async () => {
      try {
        const response = await fetch("http://192.168.0.101:3000/lanches", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Erro ao obter Japonesa: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.success) {
          setEmpresasLanches(data.data);
        } else {
          console.error("Erro ao obter Japonesa:", data.message);
        }
      } catch (error) {
        console.error("Erro ao fazer a solicitação:", error);
        Alert.alert("Erro", "Erro na comunicação com o servidor");
      }
    };

    fetchEmpresasLanches();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log(`Você pressionou ${item.Nome_Empresa}`);
      }}
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
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 16,
        }}
      >
        Estabelecimentos Japoneses
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
