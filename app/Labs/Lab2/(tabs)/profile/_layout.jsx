import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ẩn header mặc định của stack
      }}
    />
  );
}
