# EmptyState

> Centered message for a list or page with nothing to show.

- **Path:** `src/core/ui/components/EmptyState/EmptyState.tsx`
- **Storybook:** `UI/EmptyState`
- **Client component:** no

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Primary message. |
| `description` | `string` | — | Optional supporting line. |
| `icon` | `LucideIcon` | `Film` | Icon above the title. |

## Usage

```tsx
import { EmptyState } from "@/core/ui/components/EmptyState";

<EmptyState title="No movies in theaters right now." />;
```

## Notes

- The title uses foreground color; the description uses muted text.

---
_Keep in sync with the component — update this file whenever props or behavior change._
