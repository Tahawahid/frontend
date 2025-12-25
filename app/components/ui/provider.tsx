"use client"

import { ChakraProvider } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { skillSyncTheme } from "@/lib/theme"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={skillSyncTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
