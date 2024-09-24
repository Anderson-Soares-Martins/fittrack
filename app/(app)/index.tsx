import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BarChart } from "react-native-chart-kit";

import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";

const data = {
  labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  datasets: [
    {
      data: [30, 45, 60, 40, 50, 55, 20]
    }
  ]
};

export default function DashboardScreen() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-800">Olá, João</Text>
            <Text className="text-gray-500">Pronto para o treino de hoje?</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={{ uri: "/api/placeholder/48/48" }}
              className="w-12 h-12 rounded-full"
            />
          </TouchableOpacity>
        </View>

        <View className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <Text className="text-lg font-semibold mb-2">Resumo da Semana</Text>
          <BarChart
            data={data}
            width={screenWidth - 48 - 20}
            height={204}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            style={{
              borderRadius: 16
            }}
          />
        </View>

        <TouchableOpacity
          className="bg-indigo-900 py-4 rounded-2xl items-center mb-6"
          // onPress={() => router.push('/new-workout')}
        >
          <Text className="text-white font-semibold text-lg">
            Iniciar Novo Treino
          </Text>
        </TouchableOpacity>

        <View className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <Text className="text-lg font-semibold mb-2">
            Progresso das Metas
          </Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Ganho de Massa Muscular</Text>
            <Text className="font-semibold">75%</Text>
          </View>
          <View className="bg-gray-200 h-2 rounded-full">
            <View
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "75%" }}
            />
          </View>
        </View>

        <View className="bg-white p-4 rounded-2xl shadow-sm">
          <Text className="text-lg font-semibold mb-2">Último Treino</Text>
          <Text className="text-gray-600">Treino de Peito e Tríceps</Text>
          <Text className="text-gray-500">Duração: 45 minutos</Text>
          <TouchableOpacity className="mt-2">
            <Text className="text-blue-500">Ver detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
