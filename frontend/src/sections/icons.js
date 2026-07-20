import * as LucideIcons from 'lucide-react'
import { Sparkles } from 'lucide-react'

// Template data (lib/templates/*.js) names icons with kebab-case Lucide names
// ("droplets", "grid-3x3", "building-2") — matches real Tenji's actual embedded
// SVGs. Resolve to the real Lucide component instead of leaking the raw string
// as text or hand-mapping ~40 names to emoji approximations.
function toPascalCase(kebab) {
  return kebab
    .split('-')
    .map((part) => (part[0] || '').toUpperCase() + part.slice(1))
    .join('')
}

export function resolveIcon(name) {
  if (!name) return null
  return LucideIcons[toPascalCase(name)] || Sparkles
}
