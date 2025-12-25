import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  LuBrain,
  LuTrendingUp,
  LuFileText,
  LuTarget,
  LuArrowRight,
  LuSparkles,
} from "react-icons/lu";
import { Link as RouterLink } from "react-router";

const features = [
  {
    icon: LuBrain,
    title: "AI-Powered Insights",
    description:
      "Our AI analyzes real-world job trends from millions of postings to identify which skills are in demand and which will be valuable in the future.",
  },
  {
    icon: LuTrendingUp,
    title: "Skill Gap Analysis",
    description:
      "Discover exactly where you stand. SkillSync identifies gaps between your current skills and what employers are looking for, helping you focus on what matters.",
  },
  {
    icon: LuFileText,
    title: "Resume Optimization",
    description:
      "AI-powered resume optimization ensures you're not only learning the right skills but also presenting them effectively to land your dream job.",
  },
  {
    icon: LuTarget,
    title: "Personalized Learning Paths",
    description:
      "Get customized recommendations for courses, certifications, and projects that align with your career goals and current skill level.",
  },
];

const benefits = [
  {
    icon: LuSparkles,
    title: "Data-Driven Career Decisions",
    description:
      "No more guessing your next career move. Get insights backed by real job market data.",
  },
  {
    icon: LuTarget,
    title: "Stay Ahead of the Curve",
    description:
      "Know which skills will be in demand before they become mainstream.",
  },
  {
    icon: LuTrendingUp,
    title: "Higher Job Match Rate",
    description:
      "Optimized resumes and targeted skill development lead to better job matches.",
  },
];

export function Welcome() {
  const pageBg = useColorModeValue(
    "linear(to-b, blue.50, white)",
    "linear(to-b, gray.900, gray.950)",
  );

  return (
    <Box bgGradient={pageBg} minH="100vh">
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-r, blue.600, blue.400)"
        color="white"
        py={{ base: "16", md: "24" }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.1"
          bgImage="radial-gradient(circle at 20% 50%, white 0%, transparent 50%)"
        />
        <Container maxW="7xl" position="relative" zIndex="1">
          <VStack gap="8" textAlign="center" maxW="4xl" mx="auto">
            <HStack gap="4" justify="center" mb="4">
              <Image
                src="/images/logo.png"
                alt="SkillSync Logo"
                height="64px"
              />
              <Heading size="2xl" fontWeight="bold">
                SkillSync
              </Heading>
            </HStack>
            <Heading
              size={{ base: "2xl", md: "3xl" }}
              lineHeight="1.2"
              fontWeight="bold"
            >
              Navigate the Job Market with Confidence
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} maxW="3xl" opacity="0.95">
              AI-driven career guidance platform that analyzes real-world job
              trends, identifies skill gaps, and recommends personalized learning
              paths to ensure you're always career-ready.
            </Text>
            <HStack gap="4" mt="4" wrap="wrap" justify="center">
              <Button
                size="lg"
                colorScheme="white"
                variant="solid"
                bg="white"
                color="blue.600"
                asChild
                _hover={{ bg: "gray.50", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <RouterLink to="/auth/register">Get Started Free</RouterLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                asChild
                _hover={{ bg: "whiteAlpha.200", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <RouterLink to="/auth/login">Sign In</RouterLink>
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="7xl" py={{ base: "12", md: "20" }}>
        {/* Problem Statement */}
        <Card.Root mb="16" bg="blue.50" borderColor="blue.200">
          <Card.Body p={{ base: "6", md: "8" }}>
            <VStack gap="4" textAlign="center" maxW="4xl" mx="auto">
              <Badge colorScheme="blue" fontSize="sm" px="3" py="1">
                The Challenge
              </Badge>
              <Heading size="lg" color="blue.900">
                One of the biggest challenges in job hunting is knowing what
                employers are actually looking for.
              </Heading>
              <Text fontSize="lg" color="blue.800" maxW="3xl">
                SkillSync bridges this gap by collecting data from real job
                postings and industry insights. Our AI models continuously analyze
                hiring trends, ensuring you know which skills will be in demand in
                the future.
              </Text>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Key Features */}
        <VStack gap="12" mb="16">
          <VStack gap="4" textAlign="center" maxW="3xl" mx="auto">
            <Badge colorScheme="blue" fontSize="sm" px="3" py="1">
              Why SkillSync?
            </Badge>
            <Heading size={{ base: "xl", md: "2xl" }}>
              Everything You Need to Stay Career-Ready
            </Heading>
            <Text fontSize="lg" color="fg.muted">
              We don't just recommend skills - we help you present them
              effectively and land the jobs that match your strengths.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="8" w="100%">
            {features.map((feature) => (
              <Card.Root
                key={feature.title}
                height="full"
                _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
                transition="all 0.3s"
                borderWidth="1px"
                borderColor="gray.100"
              >
                <Card.Body p="6">
                  <Stack gap="4">
                    <HStack gap="3">
                      <Box
                        bg="blue.100"
                        p="3"
                        borderRadius="lg"
                        color="blue.600"
                      >
                        <Icon as={feature.icon} boxSize="6" />
                      </Box>
                      <Heading size="md">{feature.title}</Heading>
                    </HStack>
                    <Text color="fg.muted" lineHeight="tall">
                      {feature.description}
                    </Text>
                  </Stack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Benefits Section */}
        <Box
          bg="blue.600"
          borderRadius="2xl"
          p={{ base: "8", md: "12" }}
          color="white"
          mb="16"
        >
          <VStack gap="8">
            <VStack gap="4" textAlign="center" maxW="3xl" mx="auto">
              <Heading size={{ base: "xl", md: "2xl" }}>
                With SkillSync, you don't have to guess your next career move
              </Heading>
              <Text fontSize="lg" opacity="0.9">
                You'll have data-driven insights guiding you toward the right
                opportunities.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap="6" w="100%">
              {benefits.map((benefit) => (
                <VStack
                  key={benefit.title}
                  gap="3"
                  textAlign="center"
                  p="6"
                  bg="whiteAlpha.100"
                  borderRadius="xl"
                  _hover={{ bg: "whiteAlpha.200" }}
                  transition="all 0.2s"
                >
                  <Box
                    bg="whiteAlpha.200"
                    p="4"
                    borderRadius="full"
                    color="white"
                  >
                    <Icon as={benefit.icon} boxSize="8" />
                  </Box>
                  <Heading size="md">{benefit.title}</Heading>
                  <Text fontSize="sm" opacity="0.9">
                    {benefit.description}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>

        {/* CTA Section */}
        <Card.Root bgGradient="linear(to-r, blue.50, blue.100)" borderWidth="0">
          <Card.Body p={{ base: "8", md: "12" }}>
            <VStack gap="6" textAlign="center" maxW="2xl" mx="auto">
              <Heading size={{ base: "xl", md: "2xl" }}>
                Ready to Transform Your Career?
              </Heading>
              <Text fontSize="lg" color="fg.muted">
                Join SkillSync today and take control of your professional
                development with AI-powered insights.
              </Text>
              <HStack gap="4" mt="4" justify="center" wrap="wrap">
                <Button
                  size="lg"
                  colorScheme="blue"
                  asChild
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                >
                  <RouterLink to="/auth/register">
                    <HStack gap="2">
                      <Text>Start Your Journey</Text>
                      <Icon as={LuArrowRight} />
                    </HStack>
                  </RouterLink>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="blue"
                  asChild
                  _hover={{ transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  <RouterLink to="/auth/login">Sign In</RouterLink>
                </Button>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
