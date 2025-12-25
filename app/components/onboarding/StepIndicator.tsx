import { Box, HStack, Stack, Text } from "@chakra-ui/react";

interface StepIndicatorProps {
  step: number;
  total: number;
  label: string;
}

export function StepIndicator({ step, total, label }: StepIndicatorProps) {
  const percent = Math.round((step / total) * 100);
  return (
    <Stack gap="2">
      <HStack justify="space-between">
        <Text fontWeight="semibold">
          Step {step} of {total}
        </Text>
        <Text color="fg.muted">{label}</Text>
      </HStack>
      <Box
        bg="gray.200"
        borderRadius="full"
        h="2"
        overflow="hidden"
        position="relative"
      >
        <Box
          position="absolute"
          inset="0"
          w={`${percent}%`}
          bgGradient="linear(to-r, blue.600, blue.400)"
          transition="width 0.2s ease"
        />
      </Box>
    </Stack>
  );
}
