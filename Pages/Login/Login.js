import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useUser } from '../../src/GlobalContext/UserContext';
import { Ionicons } from "@expo/vector-icons";
import { ROTA_URL } from "../../config.json";
export default function Login({ navigation }) {
  const [Nome_Usuario, setUsuario] = useState("");
  const [Senha_Usuario, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(true);
  const [Logado, setLogado] = useState(1);
  const { setUser } = useUser();

  const Login = () => {
    const data = { username: Nome_Usuario, password: Senha_Usuario };
  
    fetch(`${ROTA_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setUsuario("");
          setSenha("");
  
          const { idUsuario } = result; 
          setUser(idUsuario);
  
          navigation.navigate("Perfil", {
            nomeUsuario: Nome_Usuario,
            logado: Logado,
          });
          console.log("Login bem-sucedido. Navegando para Perfil:", {
            nomeUsuario: Nome_Usuario,
            logado: Logado,
          });
        } else {
          Alert.alert("Erro", "Credenciais inválidas");
        }
      })
      .catch((error) => {
        Alert.alert("Erro", "Erro na comunicação com o servidor");
      });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerlogo}>
        <Image
          source={require("../../assets/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        style={styles.loginbox}
        keyboardVerticalOffset={-100}
      >
        <Text style={styles.texto}>Usuário</Text>
        <TextInput
          onChangeText={setUsuario}
          value={Nome_Usuario}
          placeholder="Digite seu Usuário"
          style={styles.inputtexto}
        />
        <Text style={styles.texto}>Senha</Text>
        <View style={styles.senhaview}>
          <TextInput
            onChangeText={setSenha}
            value={Senha_Usuario}
            placeholder="Digite sua Senha"
            style={styles.inputtexto}
            secureTextEntry={mostrarSenha}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Ionicons name="eye" color="#000" size={25} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={Login} style={styles.botao}>
          <Text style={styles.botaoTexto}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Registro")}
          style={styles.linkCadastro}
        >
          <Text style={styles.textoCadastro}>Não tem uma conta? Cadastre-se aqui.</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D222222",
  },
  containerlogo: {
    flex: 1,  
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",  
    height: "100%",  
  },
  loginbox: {

    flex: 1,
    marginTop: 50,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: "5%",
    paddingVertical: "10%",
  },
  senhaview: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    marginBottom: 10,
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  inputtexto: {
    width: "100%",
    borderBottomWidth: 1,
    fontSize: 16,
    height: 40,
    marginBottom: 15,
  },
  botao: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#D22222",
    alignItems: "center",
    marginTop: 20,
  },
  botaoTexto: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    right: 0,
    top: 5,
  },
  linkCadastro: {
    marginTop: 20,
    alignItems: "center",
  },
  textoCadastro: {
    color: "#000",
    fontSize: 16,
  },
});