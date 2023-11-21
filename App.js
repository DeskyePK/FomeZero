import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import Login from "./Pages/Login/Login";
import Registro from "./Pages/Registro/Registro";
import Principal from "./Pages/Principal/Principal";
import Pesquisa from "./Pages/Pesquisas/Pesquisa";
import Pedidos from "./Pages/Pedidos/Pedidos";
import Perfil from "./Pages/Perfil/Perfil";
import Cardapio from "./Pages/Cardapio/Cardapio";
import Lanches from "./Pages/Categorias/Lanches";
import Carnes from "./Pages/Categorias/Carnes";
import Japonesa from "./Pages/Categorias/Japonesa";
import Mar from "./Pages/Categorias/Mar";
import Massas from "./Pages/Categorias/Massas";
import Salgados from "./Pages/Categorias/Salgados";
import Sobremesas from "./Pages/Categorias/Sobremesas";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />

      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen
          name="Principal"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Lanches"
          component={Lanches}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Carnes"
          component={Carnes}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Sobremesas"
          component={Sobremesas}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Mar"
          component={Mar}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Japonesa"
          component={Japonesa}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Massas"
          component={Massas}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Salgados"
          component={Salgados}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cardapio"
          component={Cardapio}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabshowLabel: false,
        tabBarStyle: {
          backgroundColor: "#B22222",
          height: "7%",
        },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Principal}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Pesquisa"
        component={Pesquisa}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Pedidos"
        component={Pedidos}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
