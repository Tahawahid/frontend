import * as React from "react";
import { Box, Heading, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";
import { FaBriefcase, FaChartPie, FaRocket, FaUsers } from "react-icons/fa";
import { OverviewCard } from "./OverviewCard";
import { JobTrendChart } from "./JobTrendChart";
import { SkillRadarChart } from "./SkillRadarChart";
import { SkillGapSummary } from "./SkillGapSummary";
import { RecentActivities } from "./RecentActivities";
import { UpcomingMilestones } from "./UpcomingMilestones";

export function DashboardOverview() {
  return (
    <Stack gap="6">
      <VStack align="flex-start" gap="2">
        <Text fontSize="sm" color="blue.600" fontWeight="medium">
          Dashboard Overview
        </Text>
        <Heading size="xl" fontWeight="bold" color="gray.900">
          Your Career Progress at a Glance
        </Heading>
        <Text color="fg.muted" fontSize="md">
          Track your skill development, job applications, and personalized recommendations
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="4">
        <OverviewCard title="Applications" value="42" change="+8.2%" trend="up" icon={FaBriefcase} variant="primary" />
        <OverviewCard title="Interviews" value="9" change="+4.1%" trend="up" icon={FaUsers} variant="secondary" />
        <OverviewCard title="Cert progress" value="68%" change="+2.4%" trend="up" icon={FaChartPie} variant="primary" />
        <OverviewCard title="Skill growth" value="+12%" change="+3.8%" trend="up" icon={FaRocket} variant="secondary" />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
        <JobTrendChart />
        <SkillRadarChart />
      </SimpleGrid>

      <SkillGapSummary />

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
        <RecentActivities />
        <UpcomingMilestones />
      </SimpleGrid>
    </Stack>
  );
}
