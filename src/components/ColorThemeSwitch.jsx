import { HStack, Show, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorThemeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack px="20px">
      <Switch
        colorScheme="purple"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        aria-label="Toggle Dark Mode"
      />
      <Show above="md">
        <Text>Dark Mode</Text>
      </Show>
    </HStack>
  );
};

export default ColorThemeSwitch;
