import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";
import { Portal } from "react-native-portalize";
import { Message } from "./message";
import { BlurView } from "@react-native-community/blur";
import { EmojiRender } from "./emojiRender";
import { MessageType } from "../types";

type PortalViewProps = {
  coordinates: { x: number; y: number };
  message: { text: string; fromMe: boolean; layoutHeight: number } | null;
  setMessage: React.Dispatch<React.SetStateAction<MessageType | null>>;
};

export const PortalView = ({
  coordinates,
  message,
  setMessage,
}: PortalViewProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiType>();

  useEffect(() => {
    console.log(selectedEmoji);
  }, [selectedEmoji]);

  function handleEmojiSelect(emoji: EmojiType) {
    setSelectedEmoji(emoji);
    setMessage(null);
  }

  if (!message) return null;

  return (
    <Portal>
      <BlurView style={styles.container} blurAmount={50}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMessage(null)}
          style={styles.container}
        >
          {/* Reactions */}
          <View
            style={[
              styles.reaction,
              {
                top: coordinates?.y - 56,
                right: message?.fromMe ? 16 : "auto",
                left: message?.fromMe ? "auto" : 16,
              },
            ]}
          >
            <EmojiRender emoji="👍" />
            <EmojiRender emoji="❤️" />
            <EmojiRender emoji="😂" />
            <EmojiRender emoji="😮" />
            <EmojiRender emoji="😢" />
            <EmojiRender emoji="😡" />
            <TouchableOpacity
              onPress={() => setIsOpen(true)}
              style={styles.plus}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>

          {/* Message */}
          <View
            style={{
              position: "absolute",
              top: coordinates?.y,
              right: message?.fromMe ? 16 : "auto",
              left: message?.fromMe ? "auto" : 16,
            }}
          >
            <Message
              text={message?.text}
              fromMe={message?.fromMe}
              onLongPress={() => null}
            />

            {/* Menu */}
            <View style={styles.menu}>
              <View style={styles.menuItem}>
                <Text>Copiar</Text>
              </View>
              <View style={styles.menuItem}>
                <Text>Responder</Text>
              </View>
              <View style={styles.menuItem}>
                <Text>Encaminhar</Text>
              </View>
              <View style={[styles.menuItem, { borderBottomWidth: 0 }]}>
                <Text>Deletar</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Others emojis */}
        <EmojiPicker
          onEmojiSelected={handleEmojiSelect}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          enableSearchBar
        />
      </BlurView>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reaction: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 8,
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 32,
    paddingHorizontal: 32,
    height: 48,
  },
  plus: {
    backgroundColor: "#ebebeb",
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    width: 200,
    backgroundColor: "#fff",
    bottom: -8,
    borderRadius: 10,
    // right: message?.fromMe ? 16 : "auto",
    // left: message?.fromMe ? "auto" : 16,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    minHeight: 48,
  },
});
