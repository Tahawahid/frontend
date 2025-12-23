import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  LuBell,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuSettings,
} from "react-icons/lu";
import { NavLink } from "react-router";
import * as React from "react";

const NAV_WIDTH = "72";

const navItems = [
  { label: "Overview", icon: LuLayoutDashboard, to: "/dashboard" },
  { label: "Settings", icon: LuSettings, to: "/dashboard/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Flex minH="100vh" bg="gray.50">
      <Box
        as="nav"
        w={NAV_WIDTH}
        pos={{ base: "fixed", md: "sticky" }}
        top="0"
        left="0"
        h="100vh"
        bg="white"
        borderRightWidth="1px"
        shadow={{ base: "lg", md: "none" }}
        transform={{
          base: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          md: "none",
        }}
        transition="transform 0.2s ease"
        zIndex="modal"
      >
        <Flex h="16" align="center" px="6" borderBottomWidth="1px">
          <Text fontWeight="bold" fontSize="lg">
            Dashboard
          </Text>
        </Flex>
        <Stack p="4" gap="2">
          {navItems.map((item) => (
            <Button
              key={item.to}
              asChild
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => setMobileOpen(false)}
            >
              <NavLink to={item.to}>
                <HStack gap="3">
                  <Icon as={item.icon} />
                  <Text>{item.label}</Text>
                </HStack>
              </NavLink>
            </Button>
          ))}
        </Stack>
      </Box>

      <Box flex="1">
        <Flex
          as="header"
          h="16"
          px="6"
          align="center"
          justify="space-between"
          borderBottomWidth="1px"
          bg="white"
          position="sticky"
          top="0"
          zIndex="banner"
        >
          <HStack gap="3">
            <IconButton
              display={{ base: "inline-flex", md: "none" }}
              variant="ghost"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <LuMenu />
            </IconButton>
            <Text fontWeight="semibold">Welcome</Text>
          </HStack>

          <HStack gap="3">
            <IconButton aria-label="Notifications" variant="ghost">
              <LuBell />
            </IconButton>
            <Avatar.Root size="sm">
              <Avatar.Fallback>U</Avatar.Fallback>
            </Avatar.Root>
            <Button variant="outline" size="sm">
              <HStack gap="2">
                <LuLogOut />
                <Text>Logout</Text>
              </HStack>
            </Button>
          </HStack>
        </Flex>

        <Box p={{ base: "4", md: "6" }}>{children}</Box>
      </Box>
    </Flex>
  );
}
