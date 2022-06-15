import { useThemeVars } from '@consta/uikit/__internal__/cjs-src/hooks/useThemeVars/useThemeVars'

const useColors = () => useThemeVars().color.primary
const useControl = () => useThemeVars().control

export { useControl, useColors }