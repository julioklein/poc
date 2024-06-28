import { StyleSheet, Text } from "react-native";

type EmojiRenderProps = {
  emoji: string;
};

export const EmojiRender = ({ emoji }: EmojiRenderProps) => {
  if (!emoji) return null;

  return <Text style={styles.emoji}>{emoji}</Text>;
};

const styles = StyleSheet.create({
  emoji: {
    fontSize: 24,
  },
});
