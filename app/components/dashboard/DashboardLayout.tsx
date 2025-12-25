import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Icon,
  Image,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { LuLayoutDashboard, LuLogOut, LuMenu, LuSettings, LuUser } from "react-icons/lu";
import { NavLink, useNavigate, Link } from "react-router";
import * as React from "react";
import { fetchMe } from "@/lib/api-client";

const NAV_WIDTH = "72";

const navItems = [
  { label: "Overview", icon: LuLayoutDashboard, to: "/dashboard" },
  { label: "Profile", icon: LuUser, to: "/profile" },
  { label: "Settings", icon: LuSettings, to: "/dashboard/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userName, setUserName] = React.useState<string>("");
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [avatarSrc, setAvatarSrc] = React.useState<string>("");
  const navigate = useNavigate();

  const getInitial = (name?: string | null, email?: string) => {
    const source = name && name.trim().length ? name.trim() : email || "";
    return source ? source.charAt(0).toUpperCase() : "U";
  };

  React.useEffect(() => {
    const done =
      typeof window !== "undefined" &&
      localStorage.getItem("onboarding_complete") === "true";
    const hasToken =
      typeof window !== "undefined" &&
      !!localStorage.getItem("auth_token");
    if (!hasToken) {
      navigate("/auth/login", { replace: true });
      return;
    }
    if (!done) {
      navigate("/onboarding", { replace: true });
    }
    if (hasToken) {
      fetchMe()
        .then((res) => {
          setUserName(res.user.full_name || "");
          setUserEmail(res.user.email || "");
          setAvatarSrc(res.user.profile_image || "");
        })
        .catch(() => {
          setUserName("");
          setUserEmail("");
          setAvatarSrc("");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("onboarding_complete");
    }
    navigate("/", { replace: true });
  };

  return (
    <Flex minH="100vh" bg="gray.50" position="relative">
      <Box
        as="nav"
        w={NAV_WIDTH}
        pos={{ base: "fixed", md: "sticky" }}
        top="0"
        left="0"
        h="100vh"
        bg="white"
        borderRightWidth="1px"
        borderRightColor="gray.200"
        shadow={{ base: "lg", md: "sm" }}
        transform={{
          base: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          md: "none",
        }}
        transition="transform 0.2s ease"
        zIndex="modal"
      >
        <Flex h="16" align="center" px="6" borderBottomWidth="1px" gap="3">
          <Link to="/dashboard">
            <HStack gap="2" _hover={{ opacity: 0.8 }} transition="opacity 0.2s">
              <Image
                src="/images/logo.png"
                alt="SkillSync"
                height="32px"
              />
              <Heading size="sm" color="blue.600" fontWeight="bold">
                SkillSync
              </Heading>
            </HStack>
          </Link>
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
            <Heading size="md" color="blue.600" fontWeight="bold">
              {userName ? `Welcome back, ${userName.split(" ")[0]}` : "Welcome"}
            </Heading>
          </HStack>

          <HStack gap="3">
            <Avatar.Root size="sm">
              {avatarSrc ? <Avatar.Image src={avatarSrc} alt="Profile" /> : null}
              <Avatar.Fallback>{getInitial(userName, userEmail)}</Avatar.Fallback>
            </Avatar.Root>
            <Button variant="outline" size="sm" onClick={handleLogout}>
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
