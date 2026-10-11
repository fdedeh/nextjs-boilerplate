# RatingBadge

> Secondary badge that shows a vote average to one decimal place.

- **Path:** `src/core/ui/components/RatingBadge/RatingBadge.tsx`
- **Storybook:** `UI/RatingBadge`
- **Client component:** no

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | Score from 0 to 10. |
| `size` | `"sm" \| "md"` | `"sm"` | Badge scale. |

## Usage

```tsx
<RatingBadge value={7.4} />
```

## Notes

- A visually hidden "out of 10" suffix is included for assistive tech.

---
_Keep in sync with the component — update this file whenever props or behavior change._
