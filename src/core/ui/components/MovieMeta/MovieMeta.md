# MovieMeta

> Tagline, overview, date, runtime, rating, and genre badges.

- **Path:** `src/core/ui/components/MovieMeta/MovieMeta.tsx`
- **Storybook:** `UI/MovieMeta`
- **Client component:** no

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tagline` | `string \| null` | — | Italic line. Omitted when empty. |
| `overview` | `string \| null` | — | Synopsis. |
| `releaseDate` | `string \| null` | — | `YYYY-MM-DD`. Formatted in the component. |
| `runtimeMinutes` | `number \| null` | — | Shown as `1h 48m`. |
| `genres` | `{ id, name }[]` | — | Outline badges. |
| `rating` | `number` | — | Optional rating badge. |

## Usage

```tsx
<MovieMeta overview="..." genres={[{ id: 1, name: "Drama" }]} />
```

## Notes

- Dates are parsed as calendar dates so time zones do not shift the day.

---
_Keep in sync with the component — update this file whenever props or behavior change._
