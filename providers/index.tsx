import { ThemeProvider } from "./theme-provider"

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ThemeProvider>{children}</ThemeProvider>
}
