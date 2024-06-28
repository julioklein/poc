import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
  GestureResponderEvent,
} from "react-native";
import { MessageType } from "../types";

type MessageProps = {
  text: string;
  fromMe: boolean;
  onLongPress: (e: GestureResponderEvent, message: MessageType) => void;
};

export const Message = ({ text, fromMe, onLongPress }: MessageProps) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setLayoutHeight(Number(Math.abs(height).toFixed(0)));
  };

  return (
    <TouchableOpacity
      onLayout={onLayout}
      activeOpacity={1}
      onLongPress={(e) => onLongPress(e, { text, fromMe, layoutHeight })}
      style={styles.container}
    >
      <View
        pointerEvents="none"
        style={[fromMe ? styles.me : styles.contact, styles.message]}
      >
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  message: {
    minHeight: 56,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  me: {
    backgroundColor: "#e2e6fa",
    marginLeft: "auto",
  },
  contact: {
    backgroundColor: "#f9e2e6",
    marginRight: "auto",
  },
});
