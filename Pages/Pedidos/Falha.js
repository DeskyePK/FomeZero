import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const TelaDeSucesso = ({ route, navigation }) => {


  useEffect(() => {
    const redirecionar = setTimeout(() => {
      navigation.replace('Principal');
    }, 5000);
    return () => clearTimeout(redirecionar);
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Erro no pagamento tente novamente !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default TelaDeSucesso;
