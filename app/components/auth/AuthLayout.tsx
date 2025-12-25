import {
  Badge,
  Card,
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  badge?: string;
  footer?: React.ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  badge = "Account",
  footer,
}: AuthLayoutProps) {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, blue.50, white)"
      display="flex"
      alignItems="center"
      py={{ base: "8", md: "12" }}
    >
      <Container maxW="lg" w="100%">
        <Stack gap="8">
          {/* Logo */}
          <Box textAlign="center" mb="2">
            <Image
              src="/images/logo.png"
              alt="SkillSync Logo"
              height={{ base: "48px", md: "56px" }}
              mx="auto"
              mb="4"
            />
            <Heading size="lg" color="blue.600" fontWeight="bold">
              SkillSync
            </Heading>
          </Box>

          <Stack gap="6">
            <Stack gap="2" textAlign="center">
              {badge && (
                <Badge
                  alignSelf="center"
                  colorScheme="blue"
                  variant="subtle"
                  borderRadius="full"
                  px="3"
                  py="1"
                  fontSize="xs"
                >
                  {badge}
                </Badge>
              )}
              <Heading size="xl" fontWeight="bold">{title}</Heading>
              <Text color="fg.muted" fontSize="md">{subtitle}</Text>
            </Stack>
            <Card.Root shadow="xl" borderWidth="1px" borderColor="gray.100">
              <Card.Body p={{ base: "6", md: "8" }}>{children}</Card.Body>
            </Card.Root>
            {footer}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
