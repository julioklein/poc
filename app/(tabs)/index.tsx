import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";
import * as ContextMenu from "zeego/context-menu";
// import EmojiBoard from "react-native-emoji-board";
// import { Reaction, ReactionProvider } from "react-native-reactions";
// import { NimblePicker, Picker } from "emoji-mart-native";

export default function HomeScreen() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function handleEmojiSelect(emoji: EmojiType) {
    console.log(emoji);
  }

  function handlePress() {
    console.log("Pressed");
  }

  return (
    <View style={styles.container}>
      <ContextMenu.Root>
        <ContextMenu.Trigger action="press">
          <TouchableOpacity style={styles.button}>
            <Text>Open Menu</Text>
          </TouchableOpacity>
        </ContextMenu.Trigger>

        <ContextMenu.Content loop alignOffset avoidCollisions collisionPadding>
          <ContextMenu.Label>Menu Options</ContextMenu.Label>

          <ContextMenu.Item key="option1" onSelect={handlePress}>
            <ContextMenu.ItemTitle>Option 1</ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon androidIconName="ic_menu_save" />
          </ContextMenu.Item>

          <ContextMenu.Item key="options2" onSelect={handlePress} destructive>
            <ContextMenu.ItemTitle>Option 2</ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon androidIconName="ic_delete" />
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <Button title="Open Emoji Picker" onPress={() => setIsOpen(true)} />

      <EmojiPicker
        onEmojiSelected={handleEmojiSelect}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        enableSearchBar
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 32,
    gap: 32,
  },
  button: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0effa",
    paddingHorizontal: 24,
    borderRadius: 32,
  },
});
