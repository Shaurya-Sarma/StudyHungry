import { Accelerometer } from "expo-sensors";
import { useEffect, useState, useContext } from "react";
import { TimerContext } from "../../contexts/TimerContext";
import FlipPhoneSnackbar from "./FlipPhoneSnackbar";

export default function AccelerometerObserver(props: any) {
  // import timer variables
  // ----------------------------------------------------------------
  const { isTimerWorkEnabled, focusMode, currentPageIndex } =
    useContext(TimerContext);

  const [showFlipPhoneSnackbar, setShowFlipPhoneSnackbar] = useState(false);
  // ----------------------------------------------------------------

  // handle accelerometer functionality

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState<any | null>(null);

  const [isFlipped, setIsFlipped] = useState<any | null>(null);

  // set up rate of accelerometer update
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

  // subscribes to accelerometer when work timer active and focus mode enabled
  // changes the data values of accelerometer
  useEffect(() => {
    if (focusMode == "Flip" && isTimerWorkEnabled) {
      _subscribe();
      // calls when component is destroyed
      return () => _unsubscribe();
    } else {
      _unsubscribe();
      setData({ x: 0, y: 0, z: 0 });
    }
  }, [isTimerWorkEnabled]);

  // use accelerometer values to know if phone is flipped
  // updates every time data from accelerometer is read
  useEffect(() => {
    if (data.z > 0.5) {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }, [data]);

  // if work timer is active and flip focus mode enabled then send snackbar message when not flipped
  useEffect(() => {
    if (
      !isFlipped &&
      isTimerWorkEnabled &&
      focusMode == "Flip" &&
      currentPageIndex == 0
    ) {
      setShowFlipPhoneSnackbar(true);
    } else {
      setShowFlipPhoneSnackbar(false);
    }
  }, [isFlipped, isTimerWorkEnabled]);

  // ----------------------------------------------------------------

  // handle snackbar functionality
  return showFlipPhoneSnackbar ? (
    <FlipPhoneSnackbar
      showFlipPhoneSnackbar={showFlipPhoneSnackbar}
      setShowFlipPhoneSnackbar={setShowFlipPhoneSnackbar}
    />
  ) : (
    <></>
  );
}
