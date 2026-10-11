# MovieGrid

> Responsive poster grid. It does not fetch data.

- **Path:** `src/core/ui/components/MovieGrid/MovieGrid.tsx`
- **Storybook:** `UI/MovieGrid`
- **Client component:** no

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Cards or skeletons. |

## Usage

```tsx
<MovieGrid>{movies.map((movie) => <MovieCard key={movie.id} ... />)}</MovieGrid>
```

## Notes

- Columns: 2, then 3, 4, and 5 as the viewport widens.

---
_Keep in sync with the component — update this file whenever props or behavior change._
