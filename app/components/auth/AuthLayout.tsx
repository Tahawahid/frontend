import {
  Badge,
  Card,
  Container,
  Heading,
  Stack,
  Text,
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
    <Container maxW="lg" py={{ base: "12", md: "16" }}>
      <Stack gap="6">
        <Stack gap="2" textAlign="center">
          <Badge
            alignSelf="center"
            colorScheme="blue"
            variant="subtle"
            borderRadius="full"
            px="3"
            py="1"
          >
            {badge}
          </Badge>
          <Heading size="xl">{title}</Heading>
          <Text color="fg.muted">{subtitle}</Text>
        </Stack>
        <Card.Root shadow="lg" borderWidth="1px">
          <Card.Body>{children}</Card.Body>
        </Card.Root>
        {footer}
      </Stack>
    </Container>
  );
}
