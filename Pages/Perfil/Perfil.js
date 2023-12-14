import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from '../../src/GlobalContext/UserContext';
import { useNavigation } from "@react-navigation/native";

const TelaPerfil = ({ route }) => {
  const navigation = useNavigation();
  const { logado = 0, nomeUsuario = "Usuário" } = route.params || {};
  const { setUser } = useUser();


  const userData = {
    name: nomeUsuario,
    imageUri: "https://i.ibb.co/0s34mVn/Sem-T-tulo-1.jpg",
  };

  const buttonsData = [
    { id: "1", icon: "rocket", title: "Meus Dados" },
    { id: "2", icon: "at", title: "Meus Dados" },
    { id: "3", icon: "card", title: "Pagamentos" },
    { id: "4", icon: "cog", title: "Configurações" },
    { id: "5", icon: "exit", title: "Sair" },
  ];

  const sair = () => {
    setUser(null);
    navigation.navigate("Perfil", { logado: 0 });
  };

  const irParaLogin = () => {
    navigation.navigate("Login");
  };

  const renderButton = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
        width: "100%",
      }}
      onPress={() => {
        switch (item.id) {
          case "1":
            break;
          case "2":
            break;
          case "3":
            break;
          case "4":
            break;
          case "5":
            sair();
            break;
          default:
        }
      }}
    >
      <Ionicons name={item.icon} size={30} color="black" />
      <Text style={{ marginLeft: 10, color: "black" }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 100 }}>
      {logado === 1 ? (
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: userData.imageUri }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <Text style={{ fontSize: 16, marginLeft: 10 }}>
              {userData.name}
            </Text>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <FlatList
              data={buttonsData}
              renderItem={renderButton}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 15, textAlign: "center" }}>
            Faça o login para ver o perfil.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#B22222",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              alignItems: "center",
            }}
            onPress={irParaLogin}
          >
            <Text style={{ color: "white" }}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TelaPerfil;
