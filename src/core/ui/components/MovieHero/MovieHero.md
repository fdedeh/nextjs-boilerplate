# MovieHero

> Wide image for a movie detail page. Prefers the backdrop, then the poster.

- **Path:** `src/core/ui/components/MovieHero/MovieHero.tsx`
- **Storybook:** `UI/MovieHero`
- **Client component:** no

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Image alt text. |
| `backdropUrl` | `string` | — | Preferred image. |
| `posterUrl` | `string` | — | Used when there is no backdrop. |

## Usage

```tsx
<MovieHero title="Dune" backdropUrl={url} />
```

## Notes

- Missing art renders a muted block, not a broken image.

---
_Keep in sync with the component — update this file whenever props or behavior change._
