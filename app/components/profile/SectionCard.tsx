import {
  Badge,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

export type SectionEntry = { label: string; value?: unknown };

interface SectionCardProps {
  title: string;
  entries: SectionEntry[];
  onEdit?: () => void;
}

export function SectionCard({ title, entries, onEdit }: SectionCardProps) {
  return (
    <Card.Root borderWidth="1px" shadow="sm">
      <CardBody>
        <Stack gap="3">
          <HStack justify="space-between">
            <Heading size="md">{title}</Heading>
            {onEdit ? (
              <Button size="sm" variant="ghost" onClick={onEdit}>
                Edit
              </Button>
            ) : null}
          </HStack>
          <Stack gap="2">
            {entries.map((entry) => (
              <Stack
                key={entry.label}
                direction="row"
                justify="space-between"
                borderBottomWidth="1px"
                pb="2"
                borderColor="gray.100"
              >
                <Text color="fg.muted">{entry.label}</Text>
                <Text fontWeight="medium">
                  {entry.value ? (
                    Array.isArray(entry.value) ? (
                      (entry.value as string[]).join(", ")
                    ) : (
                      String(entry.value)
                    )
                  ) : (
                    <Badge colorScheme="gray" variant="subtle">
                      Not set
                    </Badge>
                  )}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardBody>
    </Card.Root>
  );
}
