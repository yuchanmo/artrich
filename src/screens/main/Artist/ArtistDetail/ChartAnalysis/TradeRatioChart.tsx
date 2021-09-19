import React from "react";
import { Dimensions } from "react-native";

import { Platform, StyleSheet } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;
let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  monospace: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace"
  },
  contentContainer: {
    alignItems: "center"
  },
  header: {
    fontWeight: "600",
    padding: 15,
    fontSize: 18
  }
});

const data = {
    labels: ["Test1", "Test2"],
    legend: ["L1", "L2", "L3"],
    data: [
      [60, 60, 60],
      [30, 30, 60]
    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

const TradeRatioChart = () => {
  return (
    <StackedBarChart        
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        />
  );
}


export default TradeRatioChart;