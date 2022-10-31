import { Accelerometer } from "expo-sensors";
import React, { useEffect, useState } from "react";

export default function AccelerometerObserver(props: any) {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const { x, y, z } = data;

  const [subscription, setSubscription] = useState<any | null>(null);

  Accelerometer.setUpdateInterval(1000);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    // use accelerometer values
    data.z > 0.5 ? setIsFlipped(true) : setIsFlipped(false);
    console.log("is phone flipped: " + isFlipped);
  }, [data]);

  useEffect(() => {
    if (props.focusMode === "Flip") {
      console.log("SUBED");
      _subscribe();
      return () => _unsubscribe();
    } else {
      console.log("UNSCRIBED");
      _unsubscribe();
      setData({ x: 0, y: 0, z: 0 });
    }
  }, [props.focusMode]);

  return (
    <></>
    // <View>
    //   <Text>Accelerometer:</Text>
    //   <Text style={{ fontSize: 16 }}>
    //     x: {x.toFixed(2)} y: {y.toFixed(2)} z: {z.toFixed(2)}
    //   </Text>
    // </View>
  );
}
