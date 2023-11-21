import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { validate } from "cpf-check";

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const emailRef = useRef(null);
  const nomeRef = useRef(null);
  const cpfRef = useRef(null);
  const senhaRef = useRef(null);
  const confirmarSenhaRef = useRef(null);
  const telefoneRef = useRef(null);

  const validarEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validarCPF = () => {
    if (!validate(cpf)) {
      Alert.alert("Erro", "Por favor, insira um CPF válido.");
      return false;
    }
    return true;
  };

  const focusInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const registrarUsuario = () => {
    if (!validarEmail()) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      focusInput(emailRef);
      return;
    }

    if (!validarCPF()) {
      focusInput(cpfRef);
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        "Erro",
        "As senhas não coincidem. Por favor, tente novamente."
      );
      focusInput(senhaRef);
      return;
    }

    const data = { email, nome, cpf, senha, telefone };

    fetch("http://192.168.0.101:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((result) => {
        Alert.alert("Sucesso", result);
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(
          "Erro",
          "Erro ao registrar usuário. Verifique suas informações e tente novamente."
        );
        console.error(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro</Text>

        <View style={[styles.inputContainer, { marginBottom: 15 }]}>
          <Ionicons name="mail" size={24} color="#000" />
          <TextInput
            ref={emailRef}
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            onFocus={() => focusInput(emailRef)}
          />
        </View>

        <View style={[styles.inputContainer, { marginBottom: 15 }]}>
          <Ionicons name="person" size={24} color="#000" />
          <TextInput
            ref={nomeRef}
            style={styles.input}
            placeholder="Nome"
            onChangeText={setNome}
            value={nome}
            onFocus={() => focusInput(nomeRef)}
          />
        </View>

        <View style={[styles.inputContainer, { marginBottom: 15 }]}>
          <Ionicons name="card" size={24} color="#000" />
          <TextInput
            ref={cpfRef}
            style={styles.input}
            placeholder="CPF"
            onChangeText={setCpf}
            value={cpf}
            keyboardType="numeric"
            onFocus={() => focusInput(cpfRef)}
          />
        </View>

        <View style={[styles.inputContainer, { marginBottom: 15 }]}>
          <Ionicons name="lock-closed" size={24} color="#000" />
          <TextInput
            ref={senhaRef}
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={!mostrarSenha}
            onChangeText={setSenha}
            value={senha}
            onFocus={() => focusInput(senhaRef)}
          />
          <TouchableOpacity onPress={toggleMostrarSenha} style={styles.icon}>
            <Ionicons
              name={mostrarSenha ? "eye-off" : "eye"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputContainer, { marginBottom: 15 }]}>
          <Ionicons name="lock-closed" size={24} color="#000" />
          <TextInput
            ref={confirmarSenhaRef}
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry={!mostrarSenha}
            onChangeText={setConfirmarSenha}
            value={confirmarSenha}
            onFocus={() => focusInput(confirmarSenhaRef)}
          />
        </View>

        <View style={[styles.inputContainer, { marginBottom: 15 }]}>
          <Ionicons name="call" size={24} color="#000" />
          <TextInput
            ref={telefoneRef}
            style={styles.input}
            placeholder="Telefone"
            onChangeText={setTelefone}
            value={telefone}
            keyboardType="phone-pad"
            onFocus={() => focusInput(telefoneRef)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.linkText}>Já tem uma conta? Faça login aqui.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D222222",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginTop: 80,
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  button: {
    backgroundColor: "#D22222",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    marginTop: 10,
    alignItems: "center",
  },
  linkText: {
    color: "#000",
    fontSize: 16,
  },
});

export default Registro;
