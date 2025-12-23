import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  Container,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Stat,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  LuBookOpen,
  LuExternalLink,
  LuLayoutGrid,
  LuSparkles,
  LuToggleLeft,
} from "react-icons/lu";
import { Link as RouterLink } from "react-router";

const resources = [
  {
    href: "https://chakra-ui.com/docs/getting-started",
    label: "Chakra UI Docs",
    icon: LuBookOpen,
  },
  {
    href: "https://reactrouter.com/docs",
    label: "React Router Docs",
    icon: LuExternalLink,
  },
];

const features = [
  {
    icon: LuSparkles,
    title: "Chakra UI styling",
    description:
      "Provider, color modes, toasts, and tooltips are wired up and ready to use.",
  },
  {
    icon: LuLayoutGrid,
    title: "Route-first scaffolding",
    description:
      "React Router v7 file-based routing keeps your screens organized and fast.",
  },
  {
    icon: LuToggleLeft,
    title: "Light & dark ready",
    description:
      "Toggle color mode at any time; components adapt using semantic tokens.",
  },
];

export function Welcome() {
  const pageBg = useColorModeValue(
    "linear(to-b, gray.50, white)",
    "linear(to-b, gray.900, gray.950)",
  );

  const handleToast = () => {
    toaster.create({
      type: "success",
      title: "Chakra UI is live",
      description: "Try the color mode toggle or open a toast anywhere.",
    });
  };

  return (
    <Box bgGradient={pageBg} minH="100vh" py={{ base: "12", md: "16" }}>
      <Container maxW="6xl">
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: "6", md: "4" }}
          mb={{ base: "10", md: "12" }}
        >
          <Stack gap="3">
            <Badge
              alignSelf="flex-start"
              colorScheme="blue"
              variant="subtle"
              borderRadius="full"
              px="3"
              py="1"
            >
              Chakra UI integrated
            </Badge>
            <Stack gap="4">
              <Heading size={{ base: "xl", md: "2xl" }} lineHeight="1.1">
                Your React Router app is now styled with Chakra UI
              </Heading>
              <Text color="fg.muted" fontSize="lg" maxW="3xl">
                Build pages with composable, theme-aware components. Color mode,
                toasts, and layout primitives are ready so you can focus on your
                product, not CSS resets.
              </Text>
            </Stack>
            <HStack gap="3" wrap="wrap">
              <Button colorScheme="blue" asChild>
                <Link
                  href="https://chakra-ui.com/docs/getting-started"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the docs
                </Link>
              </Button>
              <Button variant="solid" colorScheme="green" asChild>
                <RouterLink to="/auth/login">Go to login</RouterLink>
              </Button>
              <Button variant="outline" onClick={handleToast}>
                Trigger a toast
              </Button>
            </HStack>
          </Stack>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {features.map((feature) => (
            <Card.Root key={feature.title} height="full">
              <Card.Header>
                <HStack gap="3">
                  <Icon
                    as={feature.icon}
                    boxSize="6"
                    color="blue.400"
                    bg={useColorModeValue("blue.50", "blue.900")}
                    borderRadius="full"
                    p="1.5"
                  />
                  <Heading size="md">{feature.title}</Heading>
                </HStack>
              </Card.Header>
              <Card.Body pt="0">
                <Text color="fg.muted">{feature.description}</Text>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>

        <Card.Root mt="10">
          <Card.Header pb="2">
            <Heading size="md">Project quick links</Heading>
            <Text color="fg.muted">
              Useful references while you start building.
            </Text>
          </Card.Header>
          <Card.Body pt="0">
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
              <GridItem>
                <Stat.Root>
                  <Stat.Label>Entry route</Stat.Label>
                  <Stat.ValueText fontSize="lg">
                    <Code>app/routes/home.tsx</Code>
                  </Stat.ValueText>
                </Stat.Root>
                <Text color="fg.muted" mt="2">
                  Replace this welcome screen with your first page.
                </Text>
              </GridItem>
              <GridItem>
                <Stat.Root>
                  <Stat.Label>Provider stack</Stat.Label>
                  <Stat.ValueText fontSize="lg">
                    <Code>app/components/ui/provider.tsx</Code>
                  </Stat.ValueText>
                </Stat.Root>
                <Text color="fg.muted" mt="2">
                  ChakraProvider + next-themes wrapped at the root.
                </Text>
              </GridItem>
              <GridItem>
                <Stat.Root>
                  <Stat.Label>Routes config</Stat.Label>
                  <Stat.ValueText fontSize="lg">
                    <Code>app/routes.ts</Code>
                  </Stat.ValueText>
                </Stat.Root>
                <Text color="fg.muted" mt="2">
                  Add new pages and layouts with file-based routing.
                </Text>
              </GridItem>
            </SimpleGrid>
            <Box borderTopWidth="1px" my="6" />
            <HStack gap="4" wrap="wrap">
              {resources.map((resource) => (
                <Button key={resource.href} variant="ghost" asChild>
                  <Link
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <HStack gap="2">
                      <Icon as={resource.icon} />
                      <VisuallyHidden>Open {resource.label}</VisuallyHidden>
                      <Text>{resource.label}</Text>
                    </HStack>
                  </Link>
                </Button>
              ))}
            </HStack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
