import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    "outfit-regular": require("../assets/fonts/BeVietnamPro-Light.ttf"),
    "outfit-bold": require("../assets/fonts/BeVietnamPro-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/BeVietnamPro-Medium.ttf"),
  });

  return (
    <Stack
      screenOptions={{
        headerTitle: "Bài tập",
      }}
    ></Stack>
  );
}
