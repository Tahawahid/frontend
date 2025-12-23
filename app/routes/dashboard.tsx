import {
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

const cards = [
  { title: "Quick start", body: "Add your first data source or invite teammates." },
  { title: "Activity", body: "Track recent sign-ins and updates here." },
  { title: "Status", body: "All systems operational." },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Stack gap="6">
        <Heading size="lg">Overview</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
          {cards.map((card) => (
            <Card.Root key={card.title} shadow="md">
              <CardBody>
                <Heading size="md" mb="2">
                  {card.title}
                </Heading>
                <Text color="fg.muted">{card.body}</Text>
              </CardBody>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Stack>
    </DashboardLayout>
  );
}
