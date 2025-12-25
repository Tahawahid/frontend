import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { Container, Heading, Stack, Text, Box, Image, HStack } from "@chakra-ui/react";
import type { Route } from "./+types/onboarding";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Complete Your Profile - SkillSync" },
    { name: "description", content: "Set up your SkillSync profile to get personalized career guidance and skill recommendations." },
  ];
}

export default function OnboardingPage() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="5xl" py={{ base: "8", md: "12" }}>
        <HStack gap="3" mb="8" justify="center">
          <Image
            src="/images/logo.png"
            alt="SkillSync"
            height="40px"
          />
          <Heading size="lg" color="blue.600" fontWeight="bold">
            SkillSync
          </Heading>
        </HStack>
        <Stack gap="4" mb="8" textAlign="center">
          <Heading size={{ base: "xl", md: "2xl" }} fontWeight="bold">
            Let&apos;s Set Up Your Profile
          </Heading>
          <Text color="fg.muted" fontSize="lg" maxW="2xl" mx="auto">
            We&apos;ll use this information to provide personalized career guidance and skill recommendations. This will only take a few minutes.
          </Text>
        </Stack>
        <OnboardingForm />
      </Container>
    </Box>
  );
}
