# MovieCard

> Poster card that links to a movie detail page.

- **Path:** `src/core/ui/components/MovieCard/MovieCard.tsx`
- **Storybook:** `UI/MovieCard`
- **Client component:** no

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `number` | — | Movie id, kept for callers. |
| `title` | `string` | — | Visible title and image alt. |
| `href` | `string` | — | Link target. |
| `releaseDate` | `string \| null` | — | Already formatted date. |
| `rating` | `number` | — | Overlay badge when provided. |
| `posterUrl` | `string` | — | Absolute poster URL. Missing art uses a placeholder. |

## Usage

```tsx
<MovieCard id={1} title="Dune" href="/movies/1" rating={8} />
```

## Notes

- The whole card is one link. Poster `alt` is the title.

---
_Keep in sync with the component — update this file whenever props or behavior change._
