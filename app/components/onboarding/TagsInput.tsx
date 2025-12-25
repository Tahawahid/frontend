import { Button, CloseButton, HStack, Input, Stack, Tag } from "@chakra-ui/react";
import * as React from "react";

interface TagsInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagsInput({ value, onChange, placeholder }: TagsInputProps) {
  const [input, setInput] = React.useState("");

  const add = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setInput("");
  };

  const remove = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <Stack gap="2">
      <HStack>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button onClick={add} variant="outline">
          Add
        </Button>
      </HStack>
      <HStack gap="2" wrap="wrap">
        {value.map((tag) => (
          <Tag.Root key={tag} borderRadius="full" variant="subtle">
            <Tag.Label>{tag}</Tag.Label>
            <CloseButton size="sm" onClick={() => remove(tag)} />
          </Tag.Root>
        ))}
      </HStack>
    </Stack>
  );
}
