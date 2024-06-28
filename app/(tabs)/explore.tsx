import {
  StyleSheet,
  View,
  useWindowDimensions,
  GestureResponderEvent,
} from "react-native";
import { Message } from "../../components/message";
import { PortalView } from "../../components/portalview";
import { Host } from "react-native-portalize";
import { useState } from "react";
import { MessageType } from "../../types";

export default function TabTwoScreen() {
  const height = useWindowDimensions().height;
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState<MessageType | null>(null);

  const onLongPress = (e: GestureResponderEvent, message: MessageType) => {
    const { pageY, locationY } = e.nativeEvent;
    const yCoordinate = Number(Math.abs(pageY - locationY).toFixed(0));
    const isNearTheTopOfTheScreen = yCoordinate < 100;
    const isNearTheBottomOfTheScreen =
      height - yCoordinate < message?.layoutHeight + 100;

    const y = isNearTheTopOfTheScreen
      ? yCoordinate + message?.layoutHeight
      : isNearTheBottomOfTheScreen
      // ? yCoordinate - message?.layoutHeight
      ? yCoordinate - 192
      : yCoordinate;

    setCoordinates({
      x: 0,
      y,
    });

    setMessage(message);
  };

  return (
    <Host>
      <View style={styles.container}>
        <Message text="Hey!" fromMe onLongPress={onLongPress} />
        <Message
          text="Hey! How are you ?"
          fromMe={false}
          onLongPress={onLongPress}
        />
        <Message
          text="Your event handlers will be passed instances of SyntheticEvent, a cross-browser wrapper around the browser’s native event. It has the same interface as the browser’s native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers."
          fromMe
          onLongPress={onLongPress}
        />
        <PortalView
          coordinates={coordinates}
          message={message}
          setMessage={setMessage}
        />
      </View>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 48,
    rowGap: 16,
  },
});
