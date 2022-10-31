import { Gyroscope } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function GyroscopeObserver() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const { x, y, z } = data;

  const [subscription, setSubscription] = useState<any | null>(null);

  Gyroscope.setUpdateInterval(1000);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View>
      <Text>Gyroscope:</Text>
      <Text style={{ fontSize: 16 }}>
        x: {x} y: {y} z: {z}
      </Text>
    </View>
  );
}
