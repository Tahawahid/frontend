import { createSystem, defaultConfig } from "@chakra-ui/react";

// Using default system but colors will be overridden via CSS variables
// Chakra UI v3 blue colors will be styled to match SkillSync branding
export const skillSyncTheme = createSystem(defaultConfig);

