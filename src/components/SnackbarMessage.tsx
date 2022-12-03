import { Snackbar } from "react-native-paper";

export default function SnackbarMessage(props: {
  message: string;
  isVisible: boolean;
  setIsVisible: Function;
  snackbarStyle?: {};
  haveLabel: boolean;
  labelStyle?: {};
}) {
  const onDismissSnackBar = () => props.setIsVisible(false);

  return (
    <Snackbar
      wrapperStyle={{ top: 0, position: "absolute" }}
      style={props.snackbarStyle}
      visible={props.isVisible}
      onDismiss={onDismissSnackBar}
      duration={Infinity}
      action={{
        label: props.haveLabel ? "HIDE" : "",
        labelStyle: { ...props.labelStyle },
        onPress: () => {
          onDismissSnackBar();
        },
      }}
    >
      {props.message}
    </Snackbar>
  );
}
