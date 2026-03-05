import { Sun, Moon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useThemeStore } from '@/store/useThemeStrore'

const ThemeToggle = () => {
  const { toggleTheme, theme } = useThemeStore()

  const isDark = theme === 'dark'

  return (
    <div className='flex items-center gap-2'>
      <Sun
        size={16}
        className={`transition cursor-pointer ${
          !isDark ? 'text-accent' : 'text-muted-foreground'
        }`}
      />

      <Switch checked={isDark} onCheckedChange={toggleTheme} />

      <Moon
        size={16}
        className={`transition ${
          isDark ? 'text-chart-2' : 'text-muted-foreground'
        }`}
      />
    </div>
  )
}

export default ThemeToggle
