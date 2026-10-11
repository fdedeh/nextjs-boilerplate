# MoviePagination

> Page links for a movie list. Hidden when there is only one page.

- **Path:** `src/core/ui/components/MoviePagination/MoviePagination.tsx`
- **Storybook:** `UI/MoviePagination`
- **Client component:** no

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | `number` | — | Current 1-based page. |
| `totalPages` | `number` | — | Total pages. Values above 500 are capped. |
| `hrefForPage` | `(page: number) => string` | — | Builds each link. |

## Usage

```tsx
<MoviePagination page={1} totalPages={4} hrefForPage={(page) => `/now-playing?page=${page}`} />
```

## Notes

- Narrow screens show Previous, the current page, and Next. Wider screens add page numbers.
- Links are Next.js `Link`s inside the shadcn pagination list.

---
_Keep in sync with the component — update this file whenever props or behavior change._
