# ErrorState

> Failure message with an optional retry action.

- **Path:** `src/core/ui/components/ErrorState/ErrorState.tsx`
- **Storybook:** `UI/ErrorState`
- **Client component:** no

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Error heading. |
| `description` | `string` | — | Optional detail. |
| `onRetry` | `() => void` | — | When set, renders a Retry button. |

## Usage

```tsx
<ErrorState title="Could not load movies" onRetry={() => refetch()} />
```

## Notes

- The region uses `role="alert"`.

---
_Keep in sync with the component — update this file whenever props or behavior change._
