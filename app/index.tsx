import React from "react";
import { Text, View } from "react-native";
import { MapView } from "@maplibre/maplibre-react-native";

export default function Index() {
  return (
      <MapView style={{ flex: 1 }} />
  );
}
