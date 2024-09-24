import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { useState } from "react";
import { Link, router } from "expo-router";
import { useSession } from "@/contexts/ctx";

export default function SignIn() {
  const { signIn } = useSession();

  return (
    <View className="flex-1 flex bg-gray-100">
      <View className="flex-1 justify-center px-8">
        <View className="mb-8 items-center">
          <Image
            className="w-80 h-80 rounded-full"
            source={require("../assets/images/strong-bear.png")}
          />
          <Text className="mt-4 text-3xl font-bold text-gray-800">
            FitTrack
          </Text>
        </View>

        <View className="bg-white p-6 rounded-2xl shadow-md">
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg mb-4"
            placeholder="E-mail"
            keyboardType="email-address"
          />
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg mb-6"
            placeholder="Senha"
            secureTextEntry
          />
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-black py-3 rounded-lg items-center"
            onPress={() => {
              signIn();
              router.replace("/");
            }}
          >
            <Text className="text-white font-semibold text-lg">Entrar</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-gray-600">Não tem uma conta? </Text>
          {/* <TouchableOpacity onPress={() => router.push('/register')}>
            <Text className="text-blue-500 font-semibold">Registre-se</Text>
          </TouchableOpacity> */}
        </View>

        <View className="mt-8">
          <Text className="text-center text-gray-500 mb-4">Ou entre com</Text>
          <View className="flex-row justify-center gap-x-4">
            <TouchableOpacity className="bg-white p-3 rounded-full shadow">
              <FontAwesome6 name="google" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-3 rounded-full shadow">
              <FontAwesome6 name="apple" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
